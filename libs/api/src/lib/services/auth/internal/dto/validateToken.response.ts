import * as Yup from 'yup';
import { jwtAccessPayloadSchema } from '../../dto';

export const validateTokenResponseSchema = Yup.object().shape({
  valid: Yup.boolean(),
  payload: jwtAccessPayloadSchema.nullable(),
})

export type ValidateTokenResponseDto = Yup.InferType<typeof validateTokenResponseSchema>
