import { refreshSeparator } from './config';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { env } from '../../config/env';
import { parserUtils } from '@connect-ecosystem-api/shared';

export const genRefreshToken = async () => {
  const tokenId = crypto.randomUUID();
  const rawRefreshToken = crypto.randomBytes(64).toString('hex');
  const tokenHash = await bcrypt.hash(rawRefreshToken, env.saltRounds);
  const refreshToken = `${tokenId}${refreshSeparator}${rawRefreshToken}`
  const refreshExpiresAtMs = parserUtils.parseExpiresIn(env.tokens.refreshExpiresIn);
  const refreshExpiresAt = new Date(Date.now() + refreshExpiresAtMs)

  return { refreshToken, tokenHash, refreshExpiresAt, tokenId };
}
