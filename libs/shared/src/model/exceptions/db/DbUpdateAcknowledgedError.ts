import { DbError } from './DbError';

export class DbUpdateAcknowledgedError extends DbError {
  constructor(message = 'Update not acknowledged by database', originalError?: Error) {
    super(message, 'Update', originalError);
  }
}
