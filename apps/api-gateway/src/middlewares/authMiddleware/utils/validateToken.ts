import axios from 'axios';
import {
  BadGateway502Error,
  ServiceTimeout504Error,
  Unauthorized401Error,
} from '@connect-ecosystem-api/shared';
import { api, JwtAccessPayloadDto } from '@connect-ecosystem-api/api';

const AUTH_ABORT_TIMEOUT = 5000

export const validateToken = async (accessToken: string, authServiceUrl: string): Promise<JwtAccessPayloadDto> => {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), AUTH_ABORT_TIMEOUT);

  try {
    const { valid, payload } = await api.authService.internal.validateToken({ accessToken })

    clearTimeout(timeoutId);

    if (!valid || !payload) throw new Unauthorized401Error('Invalid Authentication Token');

    return payload
  } catch (e) {
    clearTimeout(timeoutId)
    if ((e as any).name === 'CanceledError') {
      throw new ServiceTimeout504Error(authServiceUrl, e as Error)
    }
    if (axios.isAxiosError(e)) {
      if (e.status === 401) throw new Unauthorized401Error('Token invalid', e)
      throw new BadGateway502Error('Bad gateway', e);
    }

    throw e;
  }
}
