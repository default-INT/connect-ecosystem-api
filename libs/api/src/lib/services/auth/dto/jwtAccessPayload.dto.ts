import * as Yup from 'yup';

export const jwtAccessPayloadSchema = Yup.object().shape({
  userId: Yup.string().required(),
  appId: Yup.string().required(),
  jti: Yup.string().required(),
})

export type JwtAccessPayloadDto = Yup.InferType<typeof jwtAccessPayloadSchema>
