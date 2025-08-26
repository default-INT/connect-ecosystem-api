import { UserService } from '../UserService';
import {
  NotFountProfileError,
  MyProfileResponseDto,
  myProfileResponseSchema,
  MyProfileRequestDto,
} from '@user-service/model';

declare module '../UserService' {
  interface UserService {
    getMyProfile(userId: MyProfileRequestDto): Promise<MyProfileResponseDto>;
  }
}

UserService.prototype.getMyProfile = async function (userId) {
  const profileRaw = await this.profileRepository.findById(userId)

  if (!profileRaw) throw new NotFountProfileError(userId)

  return myProfileResponseSchema.cast(profileRaw)
}
