import { Unauthorized401Error } from '@connect-ecosystem-api/shared';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { AuthType, LoginRequestDto, TokenPairResponseDto, UserAlreadyExistsError } from '../../../model';
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

  // TODO: temporary
  const userId = crypto.randomUUID();
  const passwordHash = password ? await bcrypt.hash(password, env.saltRounds) : null;
  // TODO: create user in user-service
  // const userCreated = await userServiceClient.createUser({
  //   userId,
  //   authType,
  //   identifier,
  //   appId,
  //   createdAt: new Date().toISOString()
  // });
  // if (!userCreated) {
  //   throw new Unauthorized401Error('Failed to create user');
  // }
  const userCreated = true; // MOCK: create user in user-service

  if (!userCreated) throw new Unauthorized401Error('Failed to create user');

  const credentialsCreated = await this.credentialsRepository.create({
    userId,
    authType,
    identifier,
    hash: passwordHash,
  });

  if (!credentialsCreated) {
    // TODO: rollback user in user-service
    // await userServiceClient.deleteUser(userId);
    throw new Unauthorized401Error('Failed to create credentials');
  }

  return this.issueTokenPair(userId, appId);
}
