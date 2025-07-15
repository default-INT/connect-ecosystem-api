import { BaseHttpError } from '../BaseHttpError';

const NOT_FOUND_STATUS = 404

export class NotFound404Error extends BaseHttpError {
  constructor(message = 'Not found', originalError?: Error) {
    super(message, NOT_FOUND_STATUS, originalError);
  }
}
