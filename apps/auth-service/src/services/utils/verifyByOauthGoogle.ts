import { Credentials, LoginRequestDto } from '../../model';
import { NotImplementRouteError } from '@connect-ecosystem-api/shared';

export const verifyByOauthGoogle = (credentials: Credentials, loginData: LoginRequestDto) => {
  throw new NotImplementRouteError(`/auth/login - ${loginData.authType}`)
}
