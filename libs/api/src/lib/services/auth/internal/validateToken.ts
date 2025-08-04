import { GenericAbortSignal } from 'axios';
import { ValidateTokenRequestDto, ValidateTokenResponseDto } from './dto';
import { request } from '../../../utils/request';

export const validateToken = async (data: ValidateTokenRequestDto, signal?: GenericAbortSignal) => {
  const response = await request.auth.post<ValidateTokenResponseDto>({
    url: '/internal/validate-token',
    data,
    signal,
  })

  return response.data
}
