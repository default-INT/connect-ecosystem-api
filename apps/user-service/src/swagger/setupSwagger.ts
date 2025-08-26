import { Application } from 'express';
import { createSwaggerMiddleware } from '@connect-ecosystem-api/yup-to-swagger';
import { swaggerSpec } from '@user-service/config/swagger';

export const setupSwagger = (app: Application) => createSwaggerMiddleware(app, {
  spec: swaggerSpec,
  uiPath: '/api-docs',
  jsonPath: '/api-docs.json',
  infoPath: '/docs',
  customOptions: {
    customSiteTitle: 'User Service API Documentation',
  },
});
