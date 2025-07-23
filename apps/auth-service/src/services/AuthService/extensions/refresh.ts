import { InvalidTokenError, RevokeReason, TokenExpiredError, TokenPairResponseDto } from '../../../model';
import { AuthService } from '../AuthService';
import { Unauthorized401Error } from '@connect-ecosystem-api/shared';
import bcrypt from 'bcrypt';
import { jwtUtils } from '../../../utils';

declare module '../AuthService' {
  interface AuthService {
    refresh: (refreshToken: string) => Promise<TokenPairResponseDto>
  }
}

AuthService.prototype.refresh = async function(refreshToken) {
  const [tokenId, rawToken] = jwtUtils.parseRefreshToken(refreshToken)

  if (!tokenId || !rawToken) throw new InvalidTokenError('Invalid refresh token format');

  const stored = await this.refreshTokenRepository.findByTokenId(tokenId);

  if (!stored) throw new InvalidTokenError();
  if (stored.revokedAt) throw new InvalidTokenError('Token has been revoked');

  const now = new Date();
  const expiresAt = new Date(stored.expiresAt);

  if (now > expiresAt) {
    await this.refreshTokenRepository.revokeByTokenId(stored.tokenId);
    throw new TokenExpiredError();
  }

  const isMatch = await bcrypt.compare(rawToken, stored.tokenHash);
  if (!isMatch) throw new InvalidTokenError('Token hash mismatch');

  // const userIsActive = await userServiceClient.checkUserStatus(stored.userId);
  // if (!userIsActive) {
  //   throw new Unauthorized401Error('User is inactive');
  // }
  const userIsActive = true;
  if (!userIsActive) throw new Unauthorized401Error('User is inactive');

  await this.revokedAccessTokenRepository.revokeByJti(
    stored.accessTokenJti,
    stored.userId,
    stored.appId,
    RevokeReason.RefreshRevoked,
    stored.accessTokenExpiresAt,
  );

  await this.refreshTokenRepository.revokeByTokenId(tokenId);

  return this.issueTokenPair(stored.userId, stored.appId, {
    ipAddress: stored.ipAddress,
    sessionId: stored.sessionId,
    userAgent: stored.userAgent,
  });
}
