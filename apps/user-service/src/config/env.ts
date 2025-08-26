export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT ? Number(process.env.PORT) : 4002,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  dbName: process.env.DB_NAME || 'user-service',
  saltRounds: Number(process.env.SALT_ROUNDS || 12),
  collections: {
    users: process.env.USERS_COLL_NAME || 'users',
    userProfile: process.env.USER_PROFILE_COLL_NAME || 'user_profile',
  },
}
