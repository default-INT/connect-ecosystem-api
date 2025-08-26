import * as Yup from 'yup';

export const myUpdateProfileRequestSchema = Yup.object().shape({
  firstName: Yup.string().nullable(),
  lastName: Yup.string().nullable(),
  email: Yup.string().nullable(),
  username: Yup.string().nullable(),
  birthday: Yup.string().nullable(),
  avatarUrl: Yup.string().nullable(),
  about: Yup.string().nullable(),
})

export type MyUpdateProfileRequestDto = Yup.Asserts<typeof myUpdateProfileRequestSchema>
