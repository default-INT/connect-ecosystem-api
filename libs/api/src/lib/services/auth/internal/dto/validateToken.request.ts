import * as Yup from 'yup';

export const validateTokenRequestSchema = Yup.object().shape({
  accessToken: Yup.string().required('accessToken is required'),
});

export type ValidateTokenRequestDto = Yup.InferType<typeof validateTokenRequestSchema>
