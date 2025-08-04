/* eslint-disable @typescript-eslint/no-explicit-any */
import swaggerUi from 'swagger-ui-express'
import { Application } from 'express';
import { OpenApiSpec } from './generateOpenApiSpec';

export interface SwaggerMiddlewareConfig {
  spec: OpenApiSpec;
  uiPath?: string;
  jsonPath?: string;
  infoPath?: string;
  customOptions?: Record<string, any>;
}

export const createSwaggerMiddleware = (app: Application, config: SwaggerMiddlewareConfig): OpenApiSpec | undefined => {
  const {
    spec,
    uiPath = '/api-docs',
    jsonPath = '/api-docs.json',
    infoPath = '/docs',
    customOptions = {},
  } = config;

  const defaultSwaggerOptions = {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: `${spec.info?.title || 'API'} Documentation`,
  };

  const swaggerOptions = { ...defaultSwaggerOptions, ...customOptions };

  app.get(jsonPath, (_, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(spec);
  });

  app.use(uiPath, swaggerUi.serve);
  app.get(uiPath, swaggerUi.setup(spec, swaggerOptions));
  app.get(uiPath.replace(/\/$/, ''), swaggerUi.setup(spec, swaggerOptions));

  app.get(infoPath, (_, res) => {
    res.json({
      message: `${spec.info?.title || 'API'} Documentation`,
      endpoints: {
        'Swagger UI': uiPath,
        'OpenAPI JSON': jsonPath,
      },
    });
  });

  return spec;
};
