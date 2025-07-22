import * as Yup from 'yup';

export interface TokenPairResponseDto {
  accessToken: string;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export const tokenPairResponseSchema = Yup.object().shape({
  accessToken: Yup.string().required('accessToken is required'),
  accessTokenExpiresAt: Yup.string().required('accessTokenExpiresAt is required'),
  refreshToken: Yup.string().required('refreshToken is required'),
  refreshTokenExpiresAt: Yup.string().required('refreshTokenExpiresAt is required'),
});
