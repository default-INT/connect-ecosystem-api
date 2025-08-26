import * as Yup from 'yup';
import { baseEntitySchema } from '@connect-ecosystem-api/shared'

export const myProfileResponseSchema = Yup.object()
  .concat(baseEntitySchema)
  .shape({
    email: Yup.string().nullable().default(null),
    username: Yup.string().nullable().default(null),
    googleId: Yup.string().nullable().default(null),
    firstName: Yup.string().nullable().default(null),
    lastName: Yup.string().nullable().default(null),
    birthday: Yup.string().nullable().default(null),
    avatarUrl: Yup.string().nullable().default(null),
    about: Yup.string().nullable().default(null),
  }).noUnknown(true)

export type MyProfileResponseDto = Yup.Asserts<typeof myProfileResponseSchema>
