/* eslint-disable  @typescript-eslint/no-explicit-any */

export interface YupDescription {
  type: string;
  optional?: boolean;
  nullable?: boolean;
  fields?: Record<string, YupDescription>;
  tests?: YupTest[];
  oneOf?: any[];
}

export interface YupTest {
  name: string;
  params?: {
    min?: number;
    max?: number;
    regex?: RegExp;
    message?: string;
    values?: any[];
  };
}

export interface OpenApiSchema {
  type: string;
  properties?: Record<string, OpenApiSchema>;
  required?: string[];
  nullable?: boolean;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  format?: string;
  enum?: any[];
  description?: string;
}

export type SchemaConverter = (desc: YupDescription) => OpenApiSchema;
export type TestHandler = (schema: OpenApiSchema, test: YupTest) => void;
