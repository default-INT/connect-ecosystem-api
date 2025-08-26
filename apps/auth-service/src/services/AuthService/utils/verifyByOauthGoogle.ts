import { NotImplementRouteError } from '@connect-ecosystem-api/shared';
import { LoginRequestDto } from '@connect-ecosystem-api/api';
import { Credentials } from '../../../model';

export const verifyByOauthGoogle = (credentials: Credentials, loginData: LoginRequestDto) => {
  throw new NotImplementRouteError(`/auth/login - ${loginData.authType}`)
}
