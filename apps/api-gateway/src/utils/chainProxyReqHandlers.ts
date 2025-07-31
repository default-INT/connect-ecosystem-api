import { ClientRequest } from 'node:http';
import { Request, Response } from 'express';

export type ProxyRequestHandler = (
  proxyReq: ClientRequest,
  req: Request,
  res: Response,
) => void;

export const chainProxyReqHandlers = (...handlers: Array<ProxyRequestHandler | null>): ProxyRequestHandler =>
  (proxyReq, req, res) => {
    handlers.forEach(
      handler => handler?.(proxyReq, req, res),
    );
  }
