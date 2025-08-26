import { asyncSaveHandler } from '@connect-ecosystem-api/shared';
import { NextFunction, Request, Response } from 'express';
import { getAccessToken } from './utils/getAccessToken';
import { validateToken } from './utils/validateToken';

interface AuthConfig {
  authServerUrl: string;
  includePaths?: string[]
  excludePaths?: string[]
}

// TODO: think about caching
export const authMiddleware = (config: AuthConfig) => {
  const { authServerUrl, excludePaths, includePaths } = config

  return asyncSaveHandler(async (req: Request, _: Response, next: NextFunction) => {
    if (includePaths?.length && !includePaths?.some(path => req.path.startsWith(path))) return next()
    if (excludePaths?.some(path => req.path.startsWith(path))) return next()

    const accessToken = getAccessToken(req)
    const payload = await validateToken(accessToken, authServerUrl)

    // TODO: if stick mode is true - check revoked

    req.user = payload

    next()
  })
}
