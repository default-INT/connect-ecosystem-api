import express, { json } from 'express';
import {
  appLogger,
  errorHandlerWrapper,
  injectUserInfo,
  loggerMiddleware,
  publicHealthHandler,
} from '@connect-ecosystem-api/shared';
import { env } from '@user-service/config/env';
import { initDb } from '@user-service/config/db';
import { UserService } from '@user-service/services';
import { getInternalRoutes, getMyRoutes } from '@user-service/routes';
import { setupSwagger } from '@user-service/swagger';
import { IdentityRepository, ProfileRepository, UserRepository } from '@user-service/repositories';

const host = env.host;
const port = env.port;
const app = express();

const run = async () => {
  const { client, db } = await initDb()
  const userRepository = new UserRepository(client, db)
  const profileRepository = new ProfileRepository(client, db)
  const identityRepository = new IdentityRepository(client, db, userRepository, profileRepository)
  const userService = new UserService(userRepository, profileRepository, identityRepository)

  app.use(json());
  app.use(loggerMiddleware(appLogger));

  app.get('/public/health', publicHealthHandler)

  setupSwagger(app)

  app.use('/my', injectUserInfo, getMyRoutes(userService))
  app.use('/internal', getInternalRoutes(userService))

  errorHandlerWrapper(app)

  app.listen(port, host, () => {
    appLogger.info(`[ ready ] http://${host}:${port}`)
    appLogger.info(`[ swagger ] http://${host}:${port}/api-docs`)
  });
}

run().catch(appLogger.error);
