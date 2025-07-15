import { BaseHttpError } from '../BaseHttpError';

const UNAUTHORIZED_STATUS = 401;

export class Unauthorized401Error extends BaseHttpError {
  constructor(message = 'Invalid credentials', originalError?: Error) {
    super(message, UNAUTHORIZED_STATUS, originalError);
  }
}
