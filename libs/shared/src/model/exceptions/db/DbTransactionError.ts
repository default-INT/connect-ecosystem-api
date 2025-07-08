import { DbError } from './DbError';

export class DbTransactionError extends DbError {
  constructor(message = 'Transaction error', originalError?: Error) {
    super(message, 'Transaction', originalError);
  }
}
