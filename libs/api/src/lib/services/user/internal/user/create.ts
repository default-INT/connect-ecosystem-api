import { CreateUserRequestDto, CreateUserResponseDto } from '@api/services/user/internal/dto';
import { request } from '@api/utils/request';

export const create = async (data: CreateUserRequestDto) => {
  const response = await request.user.post<CreateUserResponseDto>({
    url: '/internal/user',
    data,
  });

  return response.data;
};
