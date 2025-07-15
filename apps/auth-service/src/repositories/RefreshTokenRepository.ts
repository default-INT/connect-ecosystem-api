import { Db, MongoClient } from 'mongodb';
import { MongoDbRepository } from '@connect-ecosystem-api/shared';
import { RefreshToken } from '../model';
import { env } from '../config/env';

export class RefreshTokenRepository extends MongoDbRepository<RefreshToken> {
  constructor(client: MongoClient, db: Db) {
    super(client, db, env.collections.refreshToken);
  }

  findByTokenHash(hash: string): Promise<RefreshToken | null> {
    return this.source.findOne({ hash })
  }

  findByTokenId(tokenId: string): Promise<RefreshToken | null> {
    return this.source.findOne({ tokenId })
  }

  findValidByUserAndApp(userId: string, appId: string): Promise<RefreshToken[] | null> {
    const now = new Date().toISOString();

    return this.source.find({
      userId,
      appId,
      expiresAt: { $gt: now },
      revokedAt: { $exists: false },
    }).toArray()
  }

  async revokeByTokenHash(hash: string): Promise<boolean> {
    const revokedAt = new Date().toISOString();

    const result = await this.source.updateOne(
      { tokenHash: hash },
      { $set: { revokedAt: revokedAt } },
    );

    return result.acknowledged
  }

  async revokeByTokenId(tokenId: string): Promise<boolean> {
    const revokedAt = new Date().toISOString();

    const result = await this.source.updateOne(
      { tokenId },
      { $set: { revokedAt } },
    );

    return result.acknowledged
  }

  async revokeAllByUser(userId: string, appId?: string): Promise<boolean> {
    const revokedAt = new Date().toISOString();
    const result = await this.source.updateMany({ userId, appId }, { $set: { revokedAt } })

    return result.acknowledged
  }

  async deleteExpired(): Promise<number> {
    const now = new Date().toISOString();

    const result = await this.source.deleteMany({
      expiryAt: { $lt: now },
    });

    return result.deletedCount ?? 0
  }
}
