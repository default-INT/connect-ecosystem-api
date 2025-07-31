import { Router } from 'express';
import { createProxy, authMiddleware } from '../middlewares';
import { env } from '../config/env';

export const getApiServiceRoutes = () => {
  const router = Router();

  router.use('/auth',
    authMiddleware({
      authServerUrl: env.serviceUrls.auth,
      includePaths: ['/health'],
    }),
    createProxy(
      'auth-service',
      env.serviceUrls.auth,
      { blockedPaths: ['/internal'] },
    ),
  );
  router.use('/user',
    authMiddleware({
      authServerUrl: env.serviceUrls.auth,
      excludePaths: ['/public/health'],
    }),
    createProxy('user-service', env.serviceUrls.user),
  );

  return router
}
