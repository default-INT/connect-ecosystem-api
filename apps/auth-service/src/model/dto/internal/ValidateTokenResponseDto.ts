import { JwtAccessPayload } from '@connect-ecosystem-api/shared';
import * as Yup from 'yup';

export interface ValidateTokenResponseDto {
  valid: boolean;
  payload?: JwtAccessPayload;
}

export const validateTokenResponseSchema = Yup.object().shape({
  valid: Yup.boolean().required('valid is required'),
  payload: Yup.object().shape({
    userId: Yup.string().required('userId is required'),
    appId: Yup.string().required('appId is required'),
    jti: Yup.string().required('jti is required'),
  }).optional(),
});
