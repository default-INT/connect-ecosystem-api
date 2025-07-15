import { BaseHttpError } from '../BaseHttpError';

const BAD_REQUEST_STATUS = 400;

export class BadRequest400Error extends BaseHttpError {
  constructor(message = 'Bad request error', originalError?: Error) {
    super(message, BAD_REQUEST_STATUS, originalError);
  }
}
