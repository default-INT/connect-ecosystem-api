import { BaseHttpError } from '../BaseHttpError';

const GATEWAY_TIMEOUT_STATUS = 504;

export class GatewayTimeout504Error extends BaseHttpError {
  constructor(message = 'Gateway timeout', originalError?: Error) {
    super(message, GATEWAY_TIMEOUT_STATUS, originalError);
  }
}
