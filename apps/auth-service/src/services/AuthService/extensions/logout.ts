import { AuthService } from '../AuthService';
import jwt from 'jsonwebtoken';
import { RevokeReason, TokenMismatchError } from '../../../model';
import { JwtAccessPayloadDto } from '@connect-ecosystem-api/api';
import { env } from '../../../config/env';

declare module '../AuthService' {
  interface AuthService {
    logout: (accessToken: string) => Promise<boolean>
  }
}

AuthService.prototype.logout = async function(accessToken) {
  const decoded = jwt.verify(accessToken, env.tokens.jwtAccessSecret) as JwtAccessPayloadDto;
  const stored = await this.refreshTokenRepository.findByAccessTokenJti(decoded.jti);
  if (!stored) throw new TokenMismatchError('Not found refresh token');

  await this.revokedAccessTokenRepository.revokeByJti(
    stored.accessTokenJti,
    stored.userId,
    stored.appId,
    RevokeReason.Logout,
    stored.accessTokenExpiresAt,
  );

  // await userServiceClient.logLogoutEvent({
  //   userId: stored.userId,
  //   sessionId: stored.sessionId,
  //   timestamp: new Date().toISOString(),
  //   ipAddress: stored.ipAddress,
  //   userAgent: stored.userAgent
  // });

  await this.refreshTokenRepository.revokeByTokenId(stored.tokenId);

  return true
}
