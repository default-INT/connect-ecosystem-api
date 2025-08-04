import { YupDescription, OpenApiSchema } from './types';

export const convertMixedSchema = (desc: YupDescription): OpenApiSchema => {
  if (desc.oneOf && desc.oneOf.length > 0) {
    return {
      type: 'string',
      enum: desc.oneOf,
    };
  }

  return { type: 'string' };
};
