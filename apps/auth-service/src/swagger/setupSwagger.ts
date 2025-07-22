import { Application } from 'express';
import { swaggerUtils } from '@connect-ecosystem-api/shared';
import { swaggerSpec } from '../config/swagger';

export const setupSwagger = (app: Application) => swaggerUtils.createSwaggerMiddleware(app, {
  spec: swaggerSpec,
  uiPath: '/api-docs',
  jsonPath: '/api-docs.json',
  infoPath: '/docs',
  customOptions: {
    customSiteTitle: 'Auth Service API Documentation',
  },
});
