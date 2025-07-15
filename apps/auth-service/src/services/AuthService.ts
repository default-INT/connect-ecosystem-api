import * as crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { parserUtils, Unauthorized401Error } from '@connect-ecosystem-api/shared';
import { CredentialsRepository, RefreshTokenRepository } from '../repositories';
import {
  AuthType,
  InvalidIdentifierError,
  InvalidTokenError,
  TokenExpiredError,
  UserAlreadyExistsError,
  LoginRequestDto,
  TokenPairResponseDto,
} from '../model';
import { verifyByOauthGoogle, verifyByPassword } from './utils';
import { env } from '../config/env';

const verifyLoginMap = {
  [AuthType.UsernamePassword]: verifyByPassword,
  [AuthType.EmailPassword]: verifyByPassword,
  [AuthType.OauthGoogle]: verifyByOauthGoogle,
}

const passwordRequiredAuthTypes = [AuthType.UsernamePassword, AuthType.EmailPassword];

interface TokenPairOptions {
  ipAddress?: string | null;
  sessionId?: string | null;
  userAgent?: string | null;
}

export class AuthService {
  private credentialsRepository: CredentialsRepository;
  private refreshTokenRepository: RefreshTokenRepository;

  constructor(credentialsRepository: CredentialsRepository, refreshTokenRepository: RefreshTokenRepository) {
    this.credentialsRepository = credentialsRepository;
    this.refreshTokenRepository = refreshTokenRepository;
  }

  private async issueTokenPair(userId: string, appId: string, options?: TokenPairOptions): Promise<TokenPairResponseDto> {
    const accessExpiresAtMs = parserUtils.parseExpiresIn(env.tokens.accessExpiresIn);
    const accessExpiresAt = new Date(Date.now() + accessExpiresAtMs);

    const accessToken = jwt.sign(
      { userId, appId },
      env.tokens.jwtAccessSecret,
      { expiresIn: Math.floor(accessExpiresAtMs / 1000) },
    )

    const tokenId = crypto.randomUUID()
    const rawRefreshToken = crypto.randomBytes(64).toString('hex');
    const tokenHash = await bcrypt.hash(rawRefreshToken, env.saltRounds);
    const refreshExpiresAtMs = parserUtils.parseExpiresIn(env.tokens.refreshExpiresIn);
    const refreshExpiresAt = new Date(Date.now() + refreshExpiresAtMs)
    // TODO: move to separate util
    const refreshToken = `${tokenId}.${rawRefreshToken}`;

    const success = await this.refreshTokenRepository.create({
      tokenId,
      userId,
      appId,
      tokenHash: tokenHash,
      expiresAt: refreshExpiresAt.toISOString(),
      sessionId: options?.sessionId,
      ipAddress: options?.ipAddress,
      userAgent: options?.userAgent,
    })

    if (!success) throw new Unauthorized401Error();

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt: accessExpiresAt.toISOString(),
      refreshTokenExpiresAt: refreshExpiresAt.toISOString(),
    }
  }

  async login(data: LoginRequestDto) {
    const { identifier, authType, appId } = data
    const credentials = await this.credentialsRepository.findByIdentifier(authType, identifier);

    if (!credentials) throw new InvalidIdentifierError(authType)

    const isValid = await verifyLoginMap[authType](credentials, data)

    if (!isValid) throw new Unauthorized401Error()

    return this.issueTokenPair(credentials.userId, appId)

  }

  async register(data: LoginRequestDto): Promise<TokenPairResponseDto> {
    const { identifier, authType, appId, password } = data
    const existingCredentials = await this.credentialsRepository.findByIdentifier(authType, identifier);
    if (existingCredentials) throw new UserAlreadyExistsError(identifier);

    if (passwordRequiredAuthTypes.includes(authType) && !password) throw new Unauthorized401Error(`Password is required for this auth type - ${authType}`);

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

  async refresh(refreshToken: string): Promise<TokenPairResponseDto> {
    // TODO: move to separate util
    const [tokenId, rawToken] = refreshToken.split('.');

    if (!tokenId || !rawToken) throw new InvalidTokenError('Invalid refresh token format');

    const stored = await this.refreshTokenRepository.findByTokenId(tokenId);

    if (!stored) throw new InvalidTokenError();
    if (stored.revokedAt) throw new InvalidTokenError('Token has been revoked');

    const now = new Date();
    const expiresAt = new Date(stored.expiresAt);

    if (now > expiresAt) {
      await this.refreshTokenRepository.revokeByTokenId(stored.tokenId)

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

    await this.refreshTokenRepository.revokeByTokenId(tokenId);

    return this.issueTokenPair(stored.userId, stored.appId, {
      ipAddress: stored.ipAddress,
      sessionId: stored.sessionId,
      userAgent: stored.userAgent,
    });
  }

  async logout(refreshToken: string): Promise<void> {
    // TODO: move to separate util
    const [tokenId, rawToken] = refreshToken.split('.');

    if (!tokenId || !rawToken) throw new InvalidTokenError('Invalid refresh token format');

    const stored = await this.refreshTokenRepository.findByTokenId(tokenId);

    if (!stored) return;

    const isMatch = await bcrypt.compare(rawToken, stored.tokenHash);

    if (!isMatch) throw new InvalidTokenError('Token hash mismatch');

    await this.refreshTokenRepository.revokeByTokenId(tokenId);

    // await userServiceClient.logLogoutEvent({
    //   userId: stored.userId,
    //   sessionId: stored.sessionId,
    //   timestamp: new Date().toISOString(),
    //   ipAddress: stored.ipAddress,
    //   userAgent: stored.userAgent
    // });
    return;
  }
}
