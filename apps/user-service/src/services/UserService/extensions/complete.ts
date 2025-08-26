import { UserStatus } from '@connect-ecosystem-api/api';
import { NotFound404Error, BadRequest400Error } from '@connect-ecosystem-api/shared';
import { MyProfileRequestDto, NotFountProfileError } from '@user-service/model';
import { UserService } from '../UserService';
import { validateCompleteProfile } from '../utils';

declare module '../UserService' {
  interface UserService {
    complete: (userId: MyProfileRequestDto) => Promise<boolean>;
  }
}

UserService.prototype.complete = async function (userId) {
  const profile = await this.profileRepository.findById(userId)

  if (!profile) throw new NotFountProfileError(userId)

  const isValid = await validateCompleteProfile.isValid(profile)

  if (!isValid) throw new BadRequest400Error('Not all fields are filled')

  const isSuccess = await this.userRepository.update({
    _id: userId,
    status: UserStatus.Active,
  })

  if (!isSuccess) throw new NotFound404Error(`User with ${userId} not found`)

  return isSuccess
}
