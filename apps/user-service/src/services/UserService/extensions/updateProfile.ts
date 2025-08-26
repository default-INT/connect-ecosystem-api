import { BadRequest400Error, NotFound404Error } from '@connect-ecosystem-api/shared';
import { MyProfileRequestDto, MyProfileResponseDto, MyUpdateProfileRequestDto } from '@user-service/model';
import { UserService } from '../UserService';

declare module '../UserService' {
  interface UserService {
    updateProfile: (userId: MyProfileRequestDto, profile: MyUpdateProfileRequestDto) => Promise<MyProfileResponseDto>;
  }
}

UserService.prototype.updateProfile = async function(userId, profile) {
  // TODO: this need fix in #20 issue
  const profileExist = await this.profileRepository.findByEntity(profile)
  const isProfileExist = Boolean(profileExist?._id)
  const profileId = profileExist?._id?.toString()

  if (isProfileExist && profileId !== userId) {
    throw new BadRequest400Error('Profile already exist');
  }

  const isSuccess = await this.profileRepository.update({ _id: userId, ...profile })
  if (!isSuccess) throw new NotFound404Error('Profile not found');

  return this.getMyProfile(userId)
}
