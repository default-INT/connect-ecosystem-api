import { Db, MongoClient } from 'mongodb';
import { DbTransactionError, MongoDbRepository } from '@connect-ecosystem-api/shared';
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

  findByAccessTokenJti(accessTokenJti: string): Promise<RefreshToken | null> {
    return this.source.findOne({ accessTokenJti })
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
    return await this.withTransaction(async session => {
      const revokedAt = new Date().toISOString();
      const filter = appId ? { userId, appId } : { userId };
      const result = await this.source.updateMany(filter, { $set: { revokedAt } }, { session });

      if (!result.acknowledged) throw new DbTransactionError('Failed to revoke tokens');

      return result.acknowledged
    });
  }

  async deleteExpired(): Promise<number> {
    const now = new Date().toISOString();

    const result = await this.source.deleteMany({
      expiryAt: { $lt: now },
    });

    return result.deletedCount ?? 0
  }

  async deleteRevoked(): Promise<number> {
    const now = new Date().toISOString();

    const result = await this.source.deleteMany({
      revokedAt: { $lt: now },
    });

    return result.deletedCount ?? 0
  }
}
