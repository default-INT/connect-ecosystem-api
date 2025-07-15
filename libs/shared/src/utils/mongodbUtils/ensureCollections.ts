import { Db } from 'mongodb';

export const ensureCollections = async (db: Db, required: string[]) => {
  const existingCollections = await db.listCollections().toArray();
  const existingNames = existingCollections.map(coll => coll.name);

  for (const name of required) {
    if (!existingNames.includes(name)) {
      await db.createCollection(name)
    }
  }
}
