import { refreshSeparator } from './config';

export const parseRefreshToken = (
  refreshToken: string,
) => refreshToken.split(refreshSeparator) as [string, string]
