import { UserRepository } from './UserRepository';
import { ProfileRepository } from './ProfileRepository';
import { CreateEntity, DbTransactionError, Entity, MongoDbSource } from '@connect-ecosystem-api/shared';
import { Db, MongoClient } from 'mongodb';
import { Profile, User } from '../model';

export class IdentityRepository extends MongoDbSource {
  private userRepository: UserRepository;
  private profileRepository: ProfileRepository;

  constructor(
    client: MongoClient,
    db: Db,
    userRepository: UserRepository,
    profileRepository: ProfileRepository,
  ) {
    super(client, db);
    this.userRepository = userRepository;
    this.profileRepository = profileRepository;
  }

  async create(user: CreateEntity<User>, profile: CreateEntity<Profile>) {
    const result = await this.withTransaction(async client => {
      const userResult = await this.userRepository.createEntity(user)
      const profileResult = await this.profileRepository.createEntity({ ...profile, _id: userResult.insertedId })

      if (!userResult.acknowledged && !profileResult.acknowledged) {
        await client.abortTransaction()

        return null;
      }

      return userResult.insertedId
    })

    if (!result) throw new DbTransactionError('Could not create user')

    return result
  }

  async delete(id: Entity['_id']): Promise<boolean> {
    const result = await this.withTransaction(async client => {
      const userResult = await this.userRepository.delete(id, true)
      const profileResult = await this.profileRepository.delete(id, true)

      if (userResult && profileResult) return true

      await client.abortTransaction()

      return false
    })

    if (!result) throw new DbTransactionError('Could not create user')

    return result
  }
}
