/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema } from 'yup';
import { convertYupSchema, OpenApiSchema } from './yupConverter';

export interface OpenApiInfo {
  title: string;
  version: string;
  description?: string;
}

export interface OpenApiSpec {
  openapi: string;
  info: OpenApiInfo;
  components: {
    schemas: Record<string, OpenApiSchema>;
  };
  servers?: Array<{
    url: string;
    description?: string;
  }>;
  paths?: Record<string, any>;
}

export const generateOpenApiSpec = (
  schemas: Record<string, Schema>,
  info: OpenApiInfo,
): OpenApiSpec => {
  const components = { schemas: {} as Record<string, OpenApiSchema> };

  Object.entries(schemas).forEach(([name, schema]) => {
    components.schemas[name] = convertYupSchema(schema);
  });

  return {
    openapi: '3.0.0',
    info,
    components,
  };
};
