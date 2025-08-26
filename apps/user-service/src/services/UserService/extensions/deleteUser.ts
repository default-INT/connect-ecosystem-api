import { DeleteUserResponseDto, DeleteUserRequestDto } from '@connect-ecosystem-api/api';
import { UserService } from '../UserService';

declare module '../UserService' {

  interface UserService {
    deleteUser(userId: DeleteUserRequestDto): Promise<DeleteUserResponseDto>;
  }
}

UserService.prototype.deleteUser = async function (userId) {
  return this.identityRepository.delete(userId)
}
