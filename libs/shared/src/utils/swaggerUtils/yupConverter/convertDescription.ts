import { YupDescription, OpenApiSchema } from './types';
import { schemaConverters } from './schemaConverters';

export const convertDescription = (desc: YupDescription): OpenApiSchema => {
  const converter = schemaConverters[desc.type];

  return converter ? converter(desc) : { type: desc.type };
};
