import { SchemaConverter } from './types';
import { convertObjectSchema } from './convertObjectSchema';
import { convertStringSchema } from './convertStringSchema';
import { convertNumberSchema } from './convertNumberSchema';
import { convertBooleanSchema } from './convertBooleanSchema';
import { convertMixedSchema } from './convertMixedSchema';

export const schemaConverters: Record<string, SchemaConverter> = {
  object: convertObjectSchema,
  string: convertStringSchema,
  number: convertNumberSchema,
  boolean: convertBooleanSchema,
  mixed: convertMixedSchema,
};
