import { Unauthorized401Error } from '@connect-ecosystem-api/shared';

export class InvalidPasswordError extends Unauthorized401Error {
  constructor(message = 'Invalid password error') {
    super(message);
  }
}
