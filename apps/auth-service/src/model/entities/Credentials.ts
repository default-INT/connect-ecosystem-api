import { Entity } from '@connect-ecosystem-api/shared';
import { AuthType } from './AuthType';

export interface Credentials extends Entity {
  userId: string;
  authType: AuthType
  identifier: string
  hash?: string | null;
  salt?: string | null;
  lastLoginAt: string;
  // meta ?
}
