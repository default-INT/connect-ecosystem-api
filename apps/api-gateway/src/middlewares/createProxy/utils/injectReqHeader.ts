import { ClientRequest } from 'node:http';
import { Request } from 'express';
import { generateReqId } from '../../../utils';
import { appLogger, headerKeys } from '@connect-ecosystem-api/shared';

export const injectReqHeader = (serviceName: string, target: string) => (proxyReq: ClientRequest, req: Request) => {
  const requestId = generateReqId()
  if (proxyReq.headersSent) return

  if (req.user) {
    proxyReq.setHeader(headerKeys.userInfo.userId, req.user.userId)
    proxyReq.setHeader(headerKeys.userInfo.appId, req.user.appId)
    proxyReq.setHeader(headerKeys.userInfo.userJti, req.user.jti)
  }

  proxyReq.setHeader(headerKeys.system.serviceName, serviceName);
  proxyReq.setHeader(headerKeys.system.requestId, requestId);
  proxyReq.setHeader(headerKeys.system.forwardBy, 'api-gateway');

  appLogger.info(`[${requestId}] Proxying ${req.method} ${req.url} -> ${target}`)
}
