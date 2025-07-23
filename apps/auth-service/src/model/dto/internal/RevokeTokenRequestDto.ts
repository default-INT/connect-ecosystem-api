import * as Yup from 'yup';

export interface RevokeTokenRequestDto {
  accessToken: string;
}

export const revokeTokenRequestSchema = Yup.object().shape({
  accessToken: Yup.string().required('accessToken is required'),
});
