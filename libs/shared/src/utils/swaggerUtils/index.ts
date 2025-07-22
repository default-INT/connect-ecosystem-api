import { convertYupSchema } from './yupConverter';
import { generateOpenApiSpec } from './generateOpenApiSpec';
import { createSwaggerMiddleware } from './createSwaggerMiddleware';
import { saveSpecToFile } from './saveSpecToFile';

// TODO: think about move to separate package
export const swaggerUtils = {
  convertYupSchema,
  generateOpenApiSpec,
  createSwaggerMiddleware,
  saveSpecToFile,
};

export type { OpenApiInfo, OpenApiSpec } from './generateOpenApiSpec';
export type { SwaggerMiddlewareConfig } from './createSwaggerMiddleware';
export type { YupDescription, YupTest, OpenApiSchema } from './yupConverter';
