import { GatewayTimeout504Error } from './GatewayTimeout504Error';

export class ServiceTimeout504Error extends GatewayTimeout504Error {
  constructor(serviceName?: string, originalError?: Error) {
    const message = serviceName
      ? `${serviceName} service did not respond`
      : 'Target service did not respond';

    super(message, originalError);
  }
}
