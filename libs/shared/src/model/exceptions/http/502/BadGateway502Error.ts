import { BaseHttpError } from '../BaseHttpError';

const BAD_GATEWAY_STATUS = 502

export class BadGateway502Error extends BaseHttpError {
  constructor(message = 'Bad gateway', originalError?: Error) {
    super(message, BAD_GATEWAY_STATUS, originalError);
  }
}
