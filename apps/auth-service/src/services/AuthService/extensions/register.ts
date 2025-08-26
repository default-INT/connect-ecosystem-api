import { appLogger, Unauthorized401Error } from '@connect-ecosystem-api/shared';
import { AuthType, LoginRequestDto } from '@connect-ecosystem-api/api';
import { api } from '@connect-ecosystem-api/api';
import bcrypt from 'bcrypt';
import { TokenPairResponseDto, UserAlreadyExistsError } from '../../../model';
import { AuthService } from '../AuthService';
import { env } from '../../../config/env';

const passwordRequiredAuthTypes = [AuthType.UsernamePassword, AuthType.EmailPassword];

declare module '../AuthService' {
  interface AuthService {
    register: (data: LoginRequestDto) => Promise<TokenPairResponseDto>
  }
}

AuthService.prototype.register = async function(data) {
  const { identifier, authType, appId, password } = data
  const existingCredentials = await this.credentialsRepository.findByIdentifier(authType, identifier);
  if (existingCredentials) throw new UserAlreadyExistsError(identifier);

  if (passwordRequiredAuthTypes.includes(authType) && !password) {
    throw new Unauthorized401Error(`Password is required for this auth type - ${authType}`);
  }

  const passwordHash = password ? await bcrypt.hash(password, env.saltRounds) : null;

  const userId = await api.userService.internal.user.create({
    authType,
    identifier,
    appId,
  });

  if (!userId) throw new Unauthorized401Error('Failed to create user');

  const credentialsCreated = await this.credentialsRepository.create({
    userId,
    authType,
    identifier,
    hash: passwordHash,
  });

  if (!credentialsCreated) {
    const result = await api.userService.internal.user.delete(userId);
    if (!result) appLogger.error('Failed to delete user', { userId });
    throw new Unauthorized401Error('Failed to create credentials');
  }

  return this.issueTokenPair(userId, appId);
}
