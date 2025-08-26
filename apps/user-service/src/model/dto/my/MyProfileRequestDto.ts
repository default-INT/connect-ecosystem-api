import * as Yup from 'yup'

export const myProfileRequestSchema = Yup.string().required('User ID is required');

export type MyProfileRequestDto = Yup.Asserts<typeof myProfileRequestSchema>;
