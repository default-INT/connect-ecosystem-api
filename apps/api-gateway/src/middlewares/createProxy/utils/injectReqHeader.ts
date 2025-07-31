import { ClientRequest } from 'node:http';
import { Request } from 'express';
import { generateReqId } from '../../../utils';
import { appLogger } from '@connect-ecosystem-api/shared';

export const injectReqHeader = (serviceName: string, target: string) => (proxyReq: ClientRequest, req: Request) => {
  const requestId = generateReqId()
  if (proxyReq.headersSent) return

  if (req.user) {
    proxyReq.setHeader('X-User-ID', req.user.userId)
    proxyReq.setHeader('X-User-App-ID', req.user.appId)
    proxyReq.setHeader('X-User-JTI', req.user.jti)
  }

  proxyReq.setHeader('X-Service-Name', serviceName);
  proxyReq.setHeader('X-Request-ID', 'requestId');
  proxyReq.setHeader('X-Forwarded-By', 'api-gateway');

  appLogger.info(`[${requestId}] Proxying ${req.method} ${req.url} -> ${target}`)
}
