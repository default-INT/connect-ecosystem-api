import { YupDescription, OpenApiSchema } from './types';
import { numberTestHandlers } from './numberTestHandlers';

export const convertNumberSchema = (desc: YupDescription): OpenApiSchema => {
  const schema: OpenApiSchema = { type: 'number' };

  desc.tests?.forEach(test => {
    const handler = numberTestHandlers[test.name];
    if (handler) {
      handler(schema, test);
    }
  });

  return schema;
};
