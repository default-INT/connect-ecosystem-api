import { StringValue } from 'ms';

export const env = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT ? Number(process.env.PORT) : 4001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: process.env.DB_NAME || 'auth-service',
  saltRounds: Number(process.env.SALT_ROUNDS || 12),
  collections: {
    credentials: process.env.CREDENTIALS_COLL_NAME || 'credentials',
    refreshToken: process.env.REFRESH_TOKEN_COLL_NAME || 'refresh_token',
  },
  tokens: {
    jwtAccessSecret: (process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET') as string,
    jwtRefreshSecret: (process.env.JWT_REFRESH_SECRET || 'JWT_REFRESH_SECRET') as string,
    accessExpiresIn: (process.env.ACCESS_EXPIRES_IN || '15m') as StringValue,
    refreshExpiresIn: (process.env.ACCESS_EXPIRES_IN || '15d') as StringValue,
    cleanupIntervalInMin: Number(process.env.CLEARUP_REFRESH_TOKENS_IN_MIN || 10),
  },
}
