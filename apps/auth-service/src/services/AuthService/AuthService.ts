import {
  CredentialsRepository,
  RefreshTokenRepository,
  RevokedAccessTokenRepository,
} from '../../repositories';
import { TokenPairResponseDto } from '../../model';
import { Unauthorized401Error } from '@connect-ecosystem-api/shared';
import { jwtUtils } from '../../utils';

interface TokenPairOptions {
  ipAddress?: string | null;
  sessionId?: string | null;
  userAgent?: string | null;
}

export class AuthService {
  protected credentialsRepository: CredentialsRepository;
  protected refreshTokenRepository: RefreshTokenRepository;
  protected revokedAccessTokenRepository: RevokedAccessTokenRepository;

  constructor(
    credentialsRepository: CredentialsRepository,
    refreshTokenRepository: RefreshTokenRepository,
    revokedAccessTokenRepository: RevokedAccessTokenRepository,
  ) {
    this.credentialsRepository = credentialsRepository;
    this.refreshTokenRepository = refreshTokenRepository;
    this.revokedAccessTokenRepository = revokedAccessTokenRepository;
  }

  protected async issueTokenPair(userId: string, appId: string, options?: TokenPairOptions): Promise<TokenPairResponseDto> {
    const { accessToken, accessExpiresAt, accessTokenJti } = jwtUtils.genAccessToken(userId, appId)
    const { refreshToken, tokenHash, refreshExpiresAt, tokenId } = await jwtUtils.genRefreshToken()

    const success = await this.refreshTokenRepository.create({
      tokenId,
      userId,
      appId,
      tokenHash: tokenHash,
      expiresAt: refreshExpiresAt.toISOString(),
      sessionId: options?.sessionId,
      ipAddress: options?.ipAddress,
      userAgent: options?.userAgent,
      accessTokenJti,
      accessTokenExpiresAt: accessExpiresAt.toISOString(),
      revokedAt: null,
    });

    if (!success) throw new Unauthorized401Error();

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt: accessExpiresAt.toISOString(),
      refreshTokenExpiresAt: refreshExpiresAt.toISOString(),
    };
  }
}
