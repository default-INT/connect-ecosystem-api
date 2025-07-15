import * as Yup from 'yup';

export interface RefreshTokenDto {
  refreshToken: string;
}

export const refreshTokenSchema = Yup.object().shape({
  refreshToken: Yup.string().required('refreshToken is required'),
});
