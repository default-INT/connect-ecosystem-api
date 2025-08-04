import { YupDescription, OpenApiSchema } from './types';
import { convertDescription } from './convertDescription';

export const convertObjectSchema = (desc: YupDescription): OpenApiSchema => {
  const required: string[] = [];

  const properties = Object.entries(desc.fields || {}).reduce<Record<string, OpenApiSchema>>((prev, [key, fieldDesc]) => {
    if (!fieldDesc.optional && !fieldDesc.nullable) required.push(key);

    return {
      ...prev,
      [key]: convertDescription(fieldDesc),
    }
  }, {})

  return {
    type: 'object',
    properties,
    required: required.length > 0 ? required : [],
  };
};
