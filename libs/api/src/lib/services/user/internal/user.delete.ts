import { DeleteUserRequestDto, DeleteUserResponseDto } from '@api/services/user/internal/dto';
import { request } from '@api/utils/request';

export const userDelete = async (userId: DeleteUserRequestDto) => {
  const response = await request.user.delete<DeleteUserResponseDto>({
    url: `/internal/user/${userId}`,
  });

  return response.data;
};
