import { NotFound404Error } from './NotFound404Error';

export class NotImplementRouteError extends NotFound404Error {
  constructor(routeName = 'unknown', originalError?: Error) {
    super(`Route: ${routeName} - not implement yet`, originalError);
  }
}
