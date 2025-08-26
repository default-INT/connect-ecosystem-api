import { Entity } from '@connect-ecosystem-api/shared';
import { UserStatus } from '@connect-ecosystem-api/api';

export interface User extends Entity {
  status: UserStatus;
  bannedAt?: string | null;
  bannedReason?: string | null;
  bannedByUserId?: string | null;
}
