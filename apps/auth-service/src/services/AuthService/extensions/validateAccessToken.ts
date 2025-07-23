import { JwtAccessPayload } from '@connect-ecosystem-api/shared';
import jwt from 'jsonwebtoken';
import { AuthService } from '../AuthService';
import { env } from '../../../config/env';
import { InvalidTokenError } from '../../../model';

declare module '../AuthService' {
  interface AuthService {
    validateAccessToken: (accessToken: string) => Promise<JwtAccessPayload>;
  }
}

AuthService.prototype.validateAccessToken = async function(accessToken) {
  try {
    const decoded = jwt.verify(accessToken, env.tokens.jwtAccessSecret) as JwtAccessPayload;
    const isRevoked = await this.revokedAccessTokenRepository.isTokenRevoked(decoded.jti);

    if (isRevoked) throw new InvalidTokenError('Token has been revoked');

    return decoded;
  } catch (error) {
    if (error instanceof InvalidTokenError) throw error;
    throw new InvalidTokenError('Invalid or expired token');
  }
}
