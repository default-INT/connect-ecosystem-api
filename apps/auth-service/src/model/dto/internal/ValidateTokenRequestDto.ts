import * as Yup from 'yup';

export interface ValidateTokenRequestDto {
  accessToken: string;
}

export const validateTokenRequestSchema = Yup.object().shape({
  accessToken: Yup.string().required('accessToken is required'),
});
