import { TestHandler } from './types';

export const numberTestHandlers: Record<string, TestHandler> = {
  min: (schema, test) => {
    if (test.params?.min !== undefined) {
      schema.minimum = test.params.min;
    }
  },
  max: (schema, test) => {
    if (test.params?.max !== undefined) {
      schema.maximum = test.params.max;
    }
  },
  integer: schema => {
    schema.type = 'integer';
  },
};
