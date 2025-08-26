import { Entity } from '@connect-ecosystem-api/shared';

// TODO: think about all nullable fields, because user can create account without profile
// in some cases it can be useful
export interface Profile extends Entity {
  email?: string | null;
  googleId?: string | null;
  firstName?: string | null; // move to profile
  lastName?: string | null;
  username?: string | null;
  birthday?: string | null;
  avatarUrl?: string | null;
  about?: string | null;
}
