import { convertYupSchema } from './yupConverter';
import { generateOpenApiSpec } from './generateOpenApiSpec';
import { createSwaggerMiddleware } from './createSwaggerMiddleware';
import { saveSpecToFile } from './saveSpecToFile';

export const swaggerUtils = {
  convertYupSchema,
  generateOpenApiSpec,
  createSwaggerMiddleware,
  saveSpecToFile,
};

export { convertYupSchema } from './yupConverter';
export { generateOpenApiSpec } from './generateOpenApiSpec';
export { createSwaggerMiddleware } from './createSwaggerMiddleware';
export { saveSpecToFile } from './saveSpecToFile';

export type {
  OpenApiInfo,
  OpenApiSpec,
  OpenApiSecurityScheme,
  GenerateOpenApiSpecOptions,
} from './generateOpenApiSpec';

export type { SwaggerMiddlewareConfig } from './createSwaggerMiddleware';
export type { YupDescription, YupTest, OpenApiSchema } from './yupConverter';
export * from './types';
