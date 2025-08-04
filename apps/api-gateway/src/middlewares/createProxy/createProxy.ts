import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { appLogger } from '@connect-ecosystem-api/shared';
import { chainProxyReqHandlers } from '../../utils';
import { injectResHeader } from './utils/injectResHeader';
import { injectReqHeader } from './utils/injectReqHeader';
import { pathFilter } from './utils/pathFilter';

const DEFAULT_PROXY_TIMEOUT = 30000

interface ProxyConfig {
  blockedPaths?: string[]
}

export const createProxy = (serviceName: string, target: string, config?: ProxyConfig) => createProxyMiddleware({
  target,
  changeOrigin: true,
  timeout: DEFAULT_PROXY_TIMEOUT,
  proxyTimeout: DEFAULT_PROXY_TIMEOUT,

  // NOTE: replace to blockedPathsMiddleware with 404 error?
  pathFilter: pathFilter(config?.blockedPaths),

  on: {
    proxyReq: chainProxyReqHandlers(
      injectReqHeader(serviceName, target),
      fixRequestBody,
    ),
    proxyRes: injectResHeader(serviceName),
    error: err => {
      appLogger.error(`${serviceName} proxy error: `, err.message)
    },
  },
})
