import { BaseError } from '../BaseError';

export class BaseHttpError extends BaseError {
  status: number

  constructor(message: string, status: number, originalError?: Error) {
    super(message, originalError);
    this.status = status;
  }
}
