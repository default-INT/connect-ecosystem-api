import { Unauthorized401Error } from '@connect-ecosystem-api/shared';

export class TokenMismatchError extends Unauthorized401Error {
  constructor(message = 'Token mismatch error', originalError?: Error) {
    super(message, originalError);
  }
}
