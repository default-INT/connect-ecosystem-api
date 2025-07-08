import {
  Collection as MongoCollection,
  Db,
  Filter,
  ObjectId,
  MongoClient, ClientSession,
} from 'mongodb';
import { Repository } from '../../model/data';
import { CreateEntity, Entity, objectIdSchema, UpdateEntity } from '../../model/entities';
import { mongodbUtils } from '../../utils';
import { DbDeleteManyError, DbInvalidIdError, DbTransactionError } from '../../model/exceptions';

export abstract class MongoDbRepository<T extends Entity> implements Repository<T> {
  protected source: MongoCollection<T>
  protected client: MongoClient
  protected name: string
  protected db: Db

  constructor(client: MongoClient, db: Db, name: string) {
    this.client = client;
    this.db = db
    this.name = name;
    this.source = db.collection(name);
  }

  protected async withTransaction(transactionFn: (session: ClientSession) => Promise<void>) {
    const session = this.client.startSession()
    try {
      session.startTransaction()

      const result = await transactionFn(session);

      await session.commitTransaction();

      return result;
    } catch (error: unknown) {
      await session.abortTransaction()

      if (error instanceof Error) {
        throw new DbTransactionError('DbTransactionError', error);
      }

      throw new DbTransactionError('DbTransactionError');
    } finally {
      await session.endSession();
    }
  }

  protected static getObjectId(id: Entity['_id']): ObjectId {
    const objId = objectIdSchema.cast(id);

    if (!objId) throw new DbInvalidIdError(id)

    return objId
  }

  async create(entity: CreateEntity<T>): Promise<boolean> {
    const data = mongodbUtils.prepareForInsert<T>(entity);
    const result = await this.source.insertOne(data);

    return result.acknowledged
  }

  async delete(id: T['_id']): Promise<boolean> {
    const objId = MongoDbRepository.getObjectId(id)
    const deletedAt = new Date().toISOString();

    const result = await this.source.updateOne({ _id: objId } as Filter<T>, {
      isDeleted: true,
      deletedAt,
    });

    return result.modifiedCount > 0
  }

  async deleteMany(ids: T['_id'][]): Promise<boolean> {
    const deletedList = ids.map(id => MongoDbRepository.getObjectId(id))
    const deletedAt = new Date().toISOString();

    await this.withTransaction(async session => {
      const result = await this.source.updateMany(
        { _id: { $in: deletedList } } as Filter<T>,
        { $set: { isDeleted: true, deletedAt } as Readonly<Partial<T>> },
        { session },
      );

      const isNotMatched = result.matchedCount !== ids.length || result.modifiedCount !== ids.length

      if (isNotMatched) throw new DbDeleteManyError()
    })

    return true
  }

  async findAll(): Promise<T[]> {
    return await this.source.find({}).toArray() as T[]
  }

  async findById(id: T['_id']): Promise<T | null> {
    const objId = MongoDbRepository.getObjectId(id)
    const entity = await this.source.findOne({ _id: objId } as Filter<T>)

    if (!entity) return null

    return entity as T
  }

  async update(item: UpdateEntity<T>): Promise<boolean> {
    const { _id, ...data } = mongodbUtils.prepareToUpdate(item);
    const result = await this.source.updateOne({ _id: _id } as Filter<T>, data)

    return result.acknowledged
  }
}
