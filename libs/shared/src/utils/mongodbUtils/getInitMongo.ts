import { MongoClient } from 'mongodb';
import { ensureCollections } from './ensureCollections';

export const getInitMongo = (dbUri: string, dbName: string, requiredCollNames?: string[]) => async () => {
  const client = new MongoClient(dbUri)
  await client.connect()

  const db = client.db(dbName)

  if (requiredCollNames) await ensureCollections(db, requiredCollNames)

  return { db, client }
}
