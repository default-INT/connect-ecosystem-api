import * as Yup from 'yup';

export const deleteUserRequestSchema = Yup.string().required('userId is required')

export type DeleteUserRequestDto = Yup.Asserts<typeof deleteUserRequestSchema>
