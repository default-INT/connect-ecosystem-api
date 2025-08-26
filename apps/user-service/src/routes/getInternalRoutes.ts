import { Router } from 'express';
import { asyncSaveHandler } from '@connect-ecosystem-api/shared'
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  createUserRequestSchema,
  DeleteUserRequestDto,
  DeleteUserResponseDto,
  deleteUserRequestSchema,
} from '@connect-ecosystem-api/api';
import { UserService } from '@user-service/services';

interface DeleteUserParams {
  userId: DeleteUserRequestDto;
}

export const getInternalRoutes = (userService: UserService) => {
  const router = Router();

  router.post('/user', asyncSaveHandler<object, CreateUserRequestDto, CreateUserResponseDto>(async (req, res) => {
    const userDto = await createUserRequestSchema.validate(req.body);
    const userId = await userService.createUser(userDto);

    res.json(userId)
  }))

  router.delete('/user/:userId', asyncSaveHandler<DeleteUserParams, never, DeleteUserResponseDto>(async (req, res) => {
    const { userId } = req.params;
    const castedId =  await deleteUserRequestSchema.validate(userId)
    const result = await userService.deleteUser(castedId);

    res.json(result)
  }))

  return router;
}
