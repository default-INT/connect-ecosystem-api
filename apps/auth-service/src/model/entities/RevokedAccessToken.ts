import { Entity } from '@connect-ecosystem-api/shared';
import { RevokeReason } from './RevokeReason';

export interface RevokedAccessToken extends Entity {
  jti: string;
  userId: string;
  appId: string;
  revokedAt: string;
  expiresAt: string;
  reason: RevokeReason;
}
