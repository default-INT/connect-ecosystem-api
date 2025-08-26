import { NotFound404Error } from '@connect-ecosystem-api/shared'

export class NotFountProfileError extends NotFound404Error {
  constructor(id?: string, originalError?: Error) {
    const message = id ? `Profile with id ${id} not found` : 'Profile not found';
    super(message, originalError);
  }
}
