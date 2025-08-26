import { CreateUserRequestDto, CreateUserResponseDto } from '@api/services/user/internal/dto';
import { request } from '@api/utils/request';

export const createUser = async (data: CreateUserRequestDto) => {
  const response = await request.user.post<CreateUserResponseDto>({
    url: '/internal/create-user',
    data,
  });

  return response.data;
};
