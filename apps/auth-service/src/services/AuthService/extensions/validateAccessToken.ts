import { JwtAccessPayloadDto } from '@connect-ecosystem-api/api';
import jwt from 'jsonwebtoken';
import { AuthService } from '../AuthService';
import { env } from '../../../config/env';
import { InvalidTokenError } from '../../../model';

declare module '../AuthService' {
  interface AuthService {
    validateAccessToken: (accessToken: string) => Promise<JwtAccessPayloadDto>;
  }
}

AuthService.prototype.validateAccessToken = async function(accessToken) {
  try {
    const decoded = jwt.verify(accessToken, env.tokens.jwtAccessSecret) as JwtAccessPayloadDto;
    const isRevoked = await this.revokedAccessTokenRepository.isTokenRevoked(decoded.jti);

    if (isRevoked) throw new InvalidTokenError('Token has been revoked');

    return decoded;
  } catch (error) {
    if (error instanceof InvalidTokenError) throw error;
    throw new InvalidTokenError('Invalid or expired token');
  }
}
