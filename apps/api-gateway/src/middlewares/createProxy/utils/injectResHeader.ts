import { Request, Response } from 'express';
import { appLogger } from '@connect-ecosystem-api/shared';

export const injectResHeader = (serviceName: string) => (_: Request, __: Request, res: Response) => {
  res.setHeader('X-Proxied-By', 'api-gateway');
  res.setHeader('X-Response-Time', (new Date()).toISOString())

  appLogger.info(`Response ${res.statusCode} from ${serviceName}`);
}
