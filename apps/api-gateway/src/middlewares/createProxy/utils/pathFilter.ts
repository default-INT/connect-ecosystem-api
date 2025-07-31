import { Request } from 'express';
import { appLogger } from '@connect-ecosystem-api/shared';

export const pathFilter = (paths?: string[] | null) => (pathname: string, req: Request) => {
  if (!paths || !paths.length) return true
  const isBlocked = paths.some(path => pathname.startsWith(path));

  if (isBlocked) appLogger.warn(`Blocked access to internal path: ${pathname} from ${req.ip}`);

  return isBlocked
}
