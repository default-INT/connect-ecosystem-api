import { AuthType } from '@connect-ecosystem-api/api';
import { CreateEntity } from '@connect-ecosystem-api/shared';
import { Profile } from '@user-service/model';

export const toProfileByAuthType: Record<AuthType, (identifier: string) => CreateEntity<Profile>> = ({
  [AuthType.EmailPassword]: (identifier: string) => ({ email: identifier }),
  [AuthType.UsernamePassword]: (identifier: string) => ({ username: identifier }),
  [AuthType.OauthGoogle]: (identifier: string) => ({ googleId: identifier }),
})
