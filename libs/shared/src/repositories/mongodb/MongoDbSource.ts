import { ClientSession, Db, MongoClient, ObjectId } from 'mongodb';
import { DbInvalidIdError, DbTransactionError, Entity, objectIdSchema } from '../../model';

export abstract class MongoDbSource {
  protected client: MongoClient
  protected db: Db

  constructor(client: MongoClient, db: Db) {
    this.client = client;
    this.db = db
  }

  protected async withTransaction<R>(transactionFn: (session: ClientSession) => Promise<R>): Promise<R> {
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
}
