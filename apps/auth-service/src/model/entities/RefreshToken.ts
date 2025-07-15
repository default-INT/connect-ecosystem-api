import { Entity } from '@connect-ecosystem-api/shared';

export interface RefreshToken extends Entity {
  tokenId: string;
  userId: string;
  appId: string;
  tokenHash: string;
  expiresAt: string;
  revokedAt?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  sessionId?: string | null;
}
