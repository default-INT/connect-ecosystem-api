import { BaseError } from '../../model';

export const parseExpiresIn = (value: string) => {
  const match = /^(\d+)([smhd])$/.exec(value);
  // TODO: replace to parser error
  if (!match) throw new BaseError(`Invalid expiresIn format: ${value}`);

  const amount = parseInt(match[1], 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 1000 * 60,
    h: 1000 * 60 * 60,
    d: 1000 * 60 * 60 * 24,
  };

  return amount * multipliers[unit];
}
