import * as Yup from 'yup'

export const createUserResponseSchema = Yup.string().required()

export type CreateUserResponseDto = Yup.Asserts<typeof createUserResponseSchema>
