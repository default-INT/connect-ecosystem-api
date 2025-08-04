import { JwtAccessPayloadDto } from '@connect-ecosystem-api/api';
import { AuthService } from '../AuthService';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { InvalidTokenError } from '../../../model';

declare module '../AuthService' {
  interface AuthService {
    isTokenRevoked: (accessToken: string) => Promise<boolean>;
  }
}

AuthService.prototype.isTokenRevoked = async function(accessToken) {
  try {
    const decoded = jwt.verify(accessToken, env.tokens.jwtAccessSecret) as JwtAccessPayloadDto;

    return await this.revokedAccessTokenRepository.isTokenRevoked(decoded.jti);
  } catch (error) {
    if (error instanceof Error) throw new InvalidTokenError(error.message, error);
    throw new InvalidTokenError('Invalid token or expired');
  }
}
