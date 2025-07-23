import * as Yup from 'yup';

export interface RevokeTokenResponseDto {
  isRevoked: boolean;
}

export const revokeTokenResponseSchema = Yup.object().shape({
  isRevoked: Yup.boolean().required('isRevoked is required'),
});
