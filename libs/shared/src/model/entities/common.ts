import { mixed } from 'yup';
import { ObjectId } from 'mongodb';

export const objectIdSchema = mixed<ObjectId>().transform(value => {
  if (!ObjectId.isValid(value)) return undefined;
  if (typeof value === 'string') return new ObjectId(value);

  return value
});
