import { bool, date, InferType, mixed, object } from 'yup';
import { ObjectId } from 'mongodb';

export const objectIdSchema = mixed<ObjectId>().transform(value => {
  if (!ObjectId.isValid(value)) return undefined;
  if (typeof value === 'string') return new ObjectId(value);

  return value
});

export const BaseSchema = object().shape({
  _id: objectIdSchema.required(),
  createdAt: date().required(),
  updatedAt: date().required(),
  deletedAt: date().required(),
  isDeleted: bool().optional(),
});

export const BaseSchemaOptional = object().shape({
  _id: objectIdSchema.optional(),
  createdAt: date().optional(),
  updatedAt: date().optional(),
  deletedAt: date().optional(),
  isDeleted: bool().optional(),
});

export type IBaseOptional = InferType<typeof BaseSchemaOptional>
export type IBase = InferType<typeof BaseSchema>
export type Id = InferType<typeof objectIdSchema>

export interface JwtAccessPayload {
  userId: string;
  appId: string;
  jti: string;
}

export interface JwtRefreshPayload {
  tokenId: string;
  userId: string;
  appId: string;
}
