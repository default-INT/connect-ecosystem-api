import { MongoDbRepository } from '@connect-ecosystem-api/shared';
import { Profile } from '../model';
import { Db, MongoClient } from 'mongodb';
import { env } from '../config/env';

export class ProfileRepository extends MongoDbRepository<Profile> {
  constructor(client: MongoClient, db: Db) {
    super(client, db, env.collections.userProfile);
  }

  findByEntity(profile: Partial<Profile>) {
    return this.source.findOne(profile)
  }
}
