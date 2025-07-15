import { mongodbUtils } from '@connect-ecosystem-api/shared';
import { env } from './env';

const requiredNames = Object.values(env.collections)

export const initDb = mongodbUtils.getInitMongo(env.mongoUri, env.dbName, requiredNames)
