import { TestHandler } from './types';

export const stringTestHandlers: Record<string, TestHandler> = {
  min: (schema, test) => {
    if (test.params?.min !== undefined) {
      schema.minLength = test.params.min;
    }
  },
  max: (schema, test) => {
    if (test.params?.max !== undefined) {
      schema.maxLength = test.params.max;
    }
  },
  matches: (schema, test) => {
    if (test.params?.regex) {
      schema.pattern = test.params.regex.source;
    }
    if (test.params?.message) {
      schema.description = test.params.message;
    }
  },
  email: schema => {
    schema.format = 'email';
  },
  required: () => {
    // Handled at object level
  },
};
