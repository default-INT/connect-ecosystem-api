import { appLogger } from '@connect-ecosystem-api/shared';

type CleanupFn = () => Promise<number>;

export const cleanupTokens = async (refresh: CleanupFn, revokedAccess: CleanupFn) => {
  const refreshCount = await refresh();
  const revokedAccessCount = await revokedAccess();

  appLogger.info(`Cleaned refresh: ${refreshCount}`)
  appLogger.info(`Cleaned revoked access: ${revokedAccessCount}`)
}
