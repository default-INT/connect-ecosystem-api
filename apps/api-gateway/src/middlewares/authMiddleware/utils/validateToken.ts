import axios from 'axios';
import {
  BadGateway502Error,
  JwtAccessPayload,
  ServiceTimeout504Error,
  Unauthorized401Error,
} from '@connect-ecosystem-api/shared';

const AUTH_ABORT_TIMEOUT = 5000

// TODO: move types to packages/dto or think about it
interface ValidateTokenResponse {
  valid: boolean;
  payload?: JwtAccessPayload
}

export const validateToken = async (accessToken: string, authServiceUrl: string): Promise<JwtAccessPayload> => {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), AUTH_ABORT_TIMEOUT);

  try {
    // TODO: maybe api like this for communication between services move to packages/api and create
    //   wrapper like makeRequest
    const response = await axios.post<ValidateTokenResponse>(`${authServiceUrl}/internal/validate-token`, { accessToken }, {
      headers: {
        'X-Internal-Request': 'true',
      },
      signal: abortController.signal,
    })

    clearTimeout(timeoutId);

    const { valid, payload } = response.data;

    if (!valid || !payload) throw new Unauthorized401Error('Invalid Authentication Token');

    return payload
  } catch (e) {
    clearTimeout(timeoutId)
    if ((e as any).name === 'CanceledError') {
      throw new ServiceTimeout504Error(authServiceUrl, e as Error)
    }
    if (axios.isAxiosError(e)) {
      if (e.status === 401) throw new Unauthorized401Error('Token invalid')
      throw new BadGateway502Error('Bad gateway', e);
    }

    throw e;
  }
}
