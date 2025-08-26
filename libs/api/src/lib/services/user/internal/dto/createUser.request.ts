import * as Yup from 'yup';
import { loginRequestSchema } from '@api/services/auth/dto';

const fromLoginFields = loginRequestSchema.pick(['authType', 'appId', 'identifier'])

export const createUserRequestSchema = Yup.object().concat(fromLoginFields)

export type CreateUserRequestDto = Yup.Asserts<typeof createUserRequestSchema>
