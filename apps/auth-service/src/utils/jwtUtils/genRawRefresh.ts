import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { env } from '../../config/env';

export const genRawRefresh = async  () => {
  const tokenId = crypto.randomUUID();
  const rawRefreshToken = crypto.randomBytes(64).toString('hex');
  const tokenHash = await bcrypt.hash(rawRefreshToken, env.saltRounds);

  return { tokenId, tokenHash, rawRefreshToken };
}
