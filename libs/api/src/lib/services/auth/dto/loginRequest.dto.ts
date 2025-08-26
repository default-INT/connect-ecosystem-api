import * as Yup from 'yup';
import { AuthType } from './common';

const onlyPasswordRequired = [AuthType.EmailPassword, AuthType.UsernamePassword]

export const loginRequestSchema = Yup.object().shape({
  authType: Yup
    .mixed<NonNullable<AuthType>>()
    .oneOf(Object.values(AuthType), 'Invalid authType')
    .defined()
    .required('AuthType is required'),
  identifier: Yup.string()
    .when('authType', {
      is: (authType: AuthType) => authType === AuthType.EmailPassword,
      then: schema => schema.email('Email is invalid'),
    })
    .when('authType', {
      is: (authType: AuthType) => authType === AuthType.UsernamePassword,
      then: schema => schema
        .min(4, 'Username must be at least 4 characters')
        .max(20, 'Username must be at most 20 characters')
        .matches(
          /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
          'Username must contain only English letters, numbers, ' +
          'and special characters without spaces',
        ),
    })
    .required('identifier is required'),
  password: Yup.string().nullable()
    .when('authType', {
      is: (authType: AuthType) => onlyPasswordRequired.includes(authType),
      then: schema => schema
        .required('password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/^(?=.*\d)/, 'Password must contain at least one number')
        .matches(
          /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/,
          'Password must contain at least one special character',
        ),
    })
    .when('authType', {
      is: (authType: AuthType) => !onlyPasswordRequired.includes(authType),
      then: schema => schema.nullable().oneOf(
        [null, undefined],
        'Password must be null or undefined for this auth type',
      ),
    }),
  appId: Yup.string().required('appId is required'),
})

export type LoginRequestDto = Yup.Asserts<typeof loginRequestSchema>
