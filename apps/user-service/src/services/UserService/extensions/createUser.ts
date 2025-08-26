import { CreateUserRequestDto } from '@connect-ecosystem-api/api';
import { BadRequest400Error } from '@connect-ecosystem-api/shared';
import { UserStatus } from '@api/services/user/dto';
import { User } from '@user-service/model';
import { UserService } from '../UserService';
import { toProfileByAuthType } from '../utils';

declare module '../UserService' {

  interface UserService {
    createUser: (userDto: CreateUserRequestDto) => Promise<User['_id']>;
  }
}

UserService.prototype.createUser = async function (createUserDto) {
  const { authType, identifier } = createUserDto
  const profile = toProfileByAuthType[authType](identifier)
  const profileExist = await this.profileRepository.findByEntity(profile)

  if (profileExist) throw new BadRequest400Error('Profile already exist')

  const result = await this.identityRepository.create({ status: UserStatus.Pending }, profile)

  // TODO: link with app by appId
  return result
}
