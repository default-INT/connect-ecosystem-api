import { Unauthorized401Error } from '@connect-ecosystem-api/shared';
import { AuthType, LoginRequestDto } from '@connect-ecosystem-api/api';
import { InvalidIdentifierError, TokenPairResponseDto } from '@auth-service/model';
import { AuthService } from '../AuthService';
import { verifyByOauthGoogle, verifyByPassword } from '../utils';

interface LoginOptions {
  revokeExistingSessions?: boolean;
}

declare module '../AuthService' {
  interface AuthService {
    login: (data: LoginRequestDto, options?: LoginOptions) => Promise<TokenPairResponseDto>
  }
}

const verifyLoginMap = {
  [AuthType.UsernamePassword]: verifyByPassword,
  [AuthType.EmailPassword]: verifyByPassword,
  [AuthType.OauthGoogle]: verifyByOauthGoogle,
}

AuthService.prototype.login = async function(data, options) {
  const { identifier, authType, appId } = data;
  const credentials = await this.credentialsRepository.findByIdentifier(authType, identifier);

  if (!credentials) throw new InvalidIdentifierError(authType);

  const isValid = await verifyLoginMap[authType](credentials, data);
  if (!isValid) throw new Unauthorized401Error();

  if (options?.revokeExistingSessions) await this.revokeAllUserSessions(credentials.userId, appId);

  return this.issueTokenPair(credentials.userId, appId);
}
