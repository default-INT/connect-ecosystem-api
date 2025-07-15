import { Unauthorized401Error } from '@connect-ecosystem-api/shared';

export class TokenExpiredError extends Unauthorized401Error {
  constructor(message = 'Token expired', originalError?: Error) {
    super(message, originalError);
  }
} 