import { Unauthorized401Error } from '@connect-ecosystem-api/shared';

export class InvalidIdentifierError extends Unauthorized401Error {
  authType: string

  constructor(authType: string, message = 'Invalid identifier', originalError?: Error) {
    super(message, originalError);
    this.authType = authType;
  }
}
