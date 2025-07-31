import { Request } from 'express';
import { Unauthorized401Error } from '@connect-ecosystem-api/shared';

const TOKEN_HEADER_KEY_WORD = 'Bearer '

export const getAccessToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(TOKEN_HEADER_KEY_WORD)) {
    throw new Unauthorized401Error('Authorization header is required');
  }

  return authHeader.replace(TOKEN_HEADER_KEY_WORD, '');
}
