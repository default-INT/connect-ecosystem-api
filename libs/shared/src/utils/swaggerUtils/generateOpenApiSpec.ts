/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from 'yup';
import { convertYupSchema, OpenApiSchema } from './yupConverter';

export interface OpenApiInfo {
  title: string;
  version: string;
  description?: string;
}

export interface OpenApiSecurityScheme {
  type: string;
  scheme?: string;
  bearerFormat?: string;
  description?: string;
}

export interface OpenApiSpec {
  openapi: string;
  info: OpenApiInfo;
  components: {
    schemas: Record<string, OpenApiSchema>;
    securitySchemes?: Record<string, OpenApiSecurityScheme>;
  };
  security?: Array<Record<string, string[]>>;
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths?: Record<string, any>;
}

export interface GenerateOpenApiSpecOptions {
  includeBearerAuth?: boolean;
  bearerAuthDescription?: string;
}

export const generateOpenApiSpec = (
  schemas: Record<string, Schema>,
  info: OpenApiInfo,
  options?: GenerateOpenApiSpecOptions,
): OpenApiSpec => {
  const components: OpenApiSpec['components'] = {
    schemas: {} as Record<string, OpenApiSchema>,
  };

  Object.entries(schemas).forEach(([name, schema]) => {
    components.schemas[name] = convertYupSchema(schema);
  });

  if (options?.includeBearerAuth) {
    components.securitySchemes = {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: options.bearerAuthDescription || 'Enter your access token',
      },
    };
  }

  const spec: OpenApiSpec = {
    openapi: '3.0.0',
    info,
    components,
  };

  if (options?.includeBearerAuth) {
    spec.security = [
      {
        bearerAuth: [],
      },
    ];
  }

  return spec;
};
