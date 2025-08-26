import { env } from '@user-service/config/env';
import { mongodbUtils } from '@connect-ecosystem-api/shared';

const requiredNames = Object.values(env.collections);

export const initDb = mongodbUtils.getInitMongo(env.mongoUri, env.dbName, requiredNames);
