import { Unauthorized401Error } from '@connect-ecosystem-api/shared';

export class InvalidTokenError extends Unauthorized401Error {
  constructor(message = 'Invalid token', originalError?: Error) {
    super(message, originalError);
  }
}
