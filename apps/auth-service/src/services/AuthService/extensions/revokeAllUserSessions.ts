import { AuthService } from '../AuthService';
import { RevokeReason } from '../../../model';

declare module '../AuthService' {
  interface AuthService {
    revokeAllUserSessions: (userId: string, appId?: string) => Promise<number>
  }
}

AuthService.prototype.revokeAllUserSessions = async function(userId, appId) {
  const activeTokens = await this.refreshTokenRepository.findValidByUserAndApp(userId, appId || '');

  if (!activeTokens?.length) return 0;

  const jtis = activeTokens.map(token => token.accessTokenJti);

  await this.revokedAccessTokenRepository.revokeMultipleByJtis(
    jtis,
    userId,
    appId || '',
    RevokeReason.Relogin,
  );

  await this.refreshTokenRepository.revokeAllByUser(userId, appId);

  return activeTokens.length;
}
