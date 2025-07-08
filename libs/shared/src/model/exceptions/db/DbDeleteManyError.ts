import { DbError } from './DbError';

export class DbDeleteManyError extends DbError {
  constructor(message = 'DeleteMany error', originalError?: Error) {
    super(message, 'DeleteMany', originalError);
  }
}
