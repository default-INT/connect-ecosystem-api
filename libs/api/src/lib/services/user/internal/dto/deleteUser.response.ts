import * as Yup from 'yup';

export const deleteUserResponseSchema = Yup.boolean().required();

export type DeleteUserResponseDto = Yup.Asserts<typeof deleteUserResponseSchema>
