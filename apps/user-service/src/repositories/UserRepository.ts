import { User } from '../model';
import { Db, MongoClient } from 'mongodb';
import { env } from '../config/env';
import { MongoDbRepository } from '@connect-ecosystem-api/shared';

export class UserRepository extends MongoDbRepository<User> {
  constructor(client: MongoClient, db: Db) {
    super(client, db, env.collections.users);
  }
}
