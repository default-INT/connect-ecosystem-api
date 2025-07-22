import { YupDescription, OpenApiSchema } from './types';
import { stringTestHandlers } from './stringTestHandlers';

export const convertStringSchema = (desc: YupDescription): OpenApiSchema => {
  const schema: OpenApiSchema = { type: 'string' };

  if (desc.nullable) schema.nullable = true;

  desc.tests?.forEach(test => {
    const handler = stringTestHandlers[test.name];
    if (handler) {
      handler(schema, test);
    }
  });

  return schema;
};
