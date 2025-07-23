import { Db, MongoClient } from 'mongodb';
import { MongoDbRepository, parserUtils } from '@connect-ecosystem-api/shared';
import { RevokedAccessToken, RevokeReason } from '../model';
import { env } from '../config/env';

export class RevokedAccessTokenRepository extends MongoDbRepository<RevokedAccessToken> {
  constructor(client: MongoClient, db: Db) {
    super(client, db, env.collections.revokedAccessToken);
  }

  async isTokenRevoked(jti: string): Promise<boolean> {
    const revokedToken = await this.source.findOne({ jti });

    return !!revokedToken;
  }

  async revokeByJti(jti: string, userId: string, appId: string, reason: RevokeReason, expiresAt: string): Promise<boolean> {
    const revokedAt = new Date().toISOString();

    const result = await this.source.updateOne(
      { jti },
      {
        $set: {
          jti,
          userId,
          appId,
          revokedAt,
          expiresAt,
          reason,
          createdAt: revokedAt,
          updatedAt: revokedAt,
        },
      },
      { upsert: true },
    );

    return result.acknowledged;
  }

  async revokeMultipleByJtis(jtis: string[], userId: string, appId: string, reason: RevokeReason): Promise<number> {
    return await this.withTransaction(async session => {
      const revokedAt = new Date().toISOString();
      const defaultAccessExpiredAt = parserUtils.parseExpiresIn(env.tokens.accessExpiresIn)
      const safeExpiresAt = new Date(Date.now() + defaultAccessExpiredAt).toISOString();

      const operations = jtis.map(jti => ({
        updateOne: {
          filter: { jti },
          update: {
            $set: {
              jti,
              userId,
              appId,
              revokedAt,
              expiresAt: safeExpiresAt,
              reason,
              createdAt: revokedAt,
              updatedAt: revokedAt,
            },
          },
          upsert: true,
        },
      }));

      const result = await this.source.bulkWrite(operations, { session });

      return result.modifiedCount + result.upsertedCount;
    });
  }

  async deleteExpired(): Promise<number> {
    const now = new Date().toISOString();

    const result = await this.source.deleteMany({
      expiresAt: { $lt: now },
    });

    return result.deletedCount ?? 0;
  }

  async deleteRevoked(): Promise<number> {
    const now = new Date().toISOString();

    const result = await this.source.deleteMany({
      revokedAt: { $lt: now },
    });

    return result.deletedCount ?? 0;
  }
}
