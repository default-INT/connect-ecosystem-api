import { BaseError } from '../BaseError';

export class DbError extends BaseError {
  operation: string

  constructor(message = 'Database error', operation = 'Unknown', originalError?: Error) {
    super(message, originalError);
    this.operation = operation
  }
}
