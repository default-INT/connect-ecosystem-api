import { JwtAccessPayloadDto } from '@connect-ecosystem-api/api';
import { parserUtils } from '@connect-ecosystem-api/shared';
import { env } from '../../config/env';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';

export const genAccessToken = (userId: string, appId: string) => {
  const accessExpiresAtMs = parserUtils.parseExpiresIn(env.tokens.accessExpiresIn);
  const accessExpiresAt = new Date(Date.now() + accessExpiresAtMs);
  const accessTokenJti = crypto.randomUUID();

  const accessToken = jwt.sign(
    {
      userId,
      appId,
      jti: accessTokenJti,
    } as JwtAccessPayloadDto,
    env.tokens.jwtAccessSecret,
    { expiresIn: Math.floor(accessExpiresAtMs / 1000) },
  );

  return {
    accessToken,
    accessExpiresAt,
    accessTokenJti,
  }
}
