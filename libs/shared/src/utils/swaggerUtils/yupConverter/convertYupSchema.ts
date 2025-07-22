import { Schema } from 'yup';
import { YupDescription, OpenApiSchema } from './types';
import { convertDescription } from './convertDescription';

export const convertYupSchema = (yupSchema: Schema): OpenApiSchema => {
  const description = yupSchema.describe() as YupDescription;

  return convertDescription(description);
};
