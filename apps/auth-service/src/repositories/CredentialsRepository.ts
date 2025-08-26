import { Db, MongoClient } from 'mongodb';
import { CreateEntity, MongoDbRepository } from '@connect-ecosystem-api/shared';
import { AuthType } from '@connect-ecosystem-api/api';
import { Credentials } from '../model';
import { env } from '../config/env';

export class CredentialsRepository extends MongoDbRepository<Credentials> {
  constructor(client: MongoClient, db: Db) {
    super(client, db, env.collections.credentials);
  }

  findByIdentifier(authType: AuthType, identifier: string): Promise<Credentials | null> {
    return this.source.findOne({ authType, identifier })
  }

  async updateLastLoginAt(authType: AuthType, identifier: string): Promise<boolean> {
    const lastLoginAt = new Date().toISOString()
    const result = await this.source.updateOne({ authType, identifier }, { lastLoginAt })

    return result.acknowledged
  }

  override async create(entity: CreateEntity<Credentials>): Promise<boolean> {
    const date = new Date().toISOString();

    return super.create({ ...entity, createdAt: date, updatedAt: date, lastLoginAt: date });
  }
}
