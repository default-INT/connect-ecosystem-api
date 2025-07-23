import express, { json } from 'express';
import cron from 'node-cron';
import { errorHandlerWrapper, loggerMiddleware, appLogger } from '@connect-ecosystem-api/shared';
import { env } from './config/env';
import { initDb } from './config/db';
import {
  CredentialsRepository,
  RefreshTokenRepository,
  RevokedAccessTokenRepository,
} from './repositories';
import { AuthService } from './services';
import { getAuthRoutes, getInternalRoutes } from './routes';
import { setupSwagger } from './swagger';
import { cleanupTokens } from './utils';

const host = env.host;
const port = env.port;
const app = express();

export const run = async () => {
  const { client, db } = await initDb()
  const credentialRepo = new CredentialsRepository(client, db)
  const refreshTokenRepo = new RefreshTokenRepository(client, db)
  const revokedAccessTokenRepo = new RevokedAccessTokenRepository(client, db)
  const authService = new AuthService(credentialRepo, refreshTokenRepo, revokedAccessTokenRepo)
  const cleanupRefresh = () => refreshTokenRepo.deleteExpired()
  const cleanupAccess = () => revokedAccessTokenRepo.deleteExpired()

  // maybe unnecessary
  await cleanupTokens(cleanupRefresh, cleanupAccess)

  app.use(json())
  app.use(loggerMiddleware(appLogger))

  setupSwagger(app)

  app.use(getAuthRoutes(authService))
  app.use('/internal', getInternalRoutes(authService))

  cron.schedule(`*/${env.tokens.cleanupIntervalInMin} * * * *`, async () => {
    await cleanupTokens(cleanupRefresh, cleanupAccess)
  })

  errorHandlerWrapper(app)

  app.listen(port, host, () => {
    appLogger.info(`[ ready ] http://${host}:${port}`)
    appLogger.info(`[ swagger ] http://${host}:${port}/api-docs`)
  });
}

run().catch(appLogger.error);
