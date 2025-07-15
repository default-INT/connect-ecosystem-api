import { ensureCollections } from './ensureCollections'
import { getInitMongo } from './getInitMongo'
import { prepareForInsert } from './prepareForInsert'
import { prepareToUpdate } from './prepareToUpdate'

export const mongodbUtils = {
  ensureCollections,
  getInitMongo,
  prepareForInsert,
  prepareToUpdate,
}
