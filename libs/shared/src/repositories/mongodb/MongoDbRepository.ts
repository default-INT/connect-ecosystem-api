import {
  Collection as MongoCollection,
  Db,
  Filter, InsertOneResult,
  MongoClient,
} from 'mongodb';
import { DbUpdateAcknowledgedError, Repository } from '../../model';
import { CreateEntity, Entity, UpdateEntity } from '../../model';
import { mongodbUtils } from '../../utils';
import { DbDeleteManyError } from '../../model';
import { MongoDbSource } from './MongoDbSource';

export abstract class MongoDbRepository<T extends Entity> extends MongoDbSource implements Repository<T> {
  protected source: MongoCollection<T>
  protected name: string

  constructor(client: MongoClient, db: Db, name: string) {
    super(client, db)
    this.name = name;
    this.source = db.collection(name);
  }

  async createEntity(data: CreateEntity<T>): Promise<InsertOneResult<T>> {
    const entity = mongodbUtils.prepareForInsert<T>(data);

    return this.source.insertOne(entity);
  }

  async create(entity: CreateEntity<T>): Promise<boolean> {
    const result = await this.createEntity(entity as T)

    return result.acknowledged
  }

  async delete(id: T['_id'], isForce?: boolean): Promise<boolean> {
    const objId = MongoDbRepository.getObjectId(id)
    const deletedAt = new Date().toISOString();

    if (isForce) {
      const result = await this.source.deleteOne({ _id: objId } as Filter<T>);

      return result.deletedCount > 0
    }

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
    const result = await this.source.updateOne({ _id } as Filter<T>, { $set: data as never })

    if (!result.acknowledged) throw new DbUpdateAcknowledgedError()

    return result.modifiedCount > 0
  }
}
