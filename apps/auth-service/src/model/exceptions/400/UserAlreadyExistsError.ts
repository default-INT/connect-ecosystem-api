import { BadRequest400Error } from '@connect-ecosystem-api/shared';

export class UserAlreadyExistsError extends BadRequest400Error {
  constructor(identifier: string, message?: string) {
    super(message || `User with identifier '${identifier}' already exists`);
  }
} 