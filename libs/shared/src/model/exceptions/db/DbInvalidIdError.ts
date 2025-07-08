import { DbError } from './DbError';
import { Entity } from '../../entities';

export class DbInvalidIdError extends DbError {
  constructor(id?: Entity['_id'], error?: Error, message?: string) {
    const receivedMessage = message ? message : `Db invalid id error [${id}]`;
    super(receivedMessage, 'validation', error);
  }
}
