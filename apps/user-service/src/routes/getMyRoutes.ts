import { Router } from 'express';
import { asyncSaveHandler } from '@connect-ecosystem-api/shared'
import { UserService } from '@user-service/services';
import {
  myProfileRequestSchema,
  MyProfileResponseDto,
  MyUpdateProfileRequestDto,
  myUpdateProfileRequestSchema,
} from '@user-service/model';

export const getMyRoutes = (userService: UserService) => {
  const router = Router();

  // IDEA: think about define two routes, the first return strict object with defined fields (user status is active)
  // the second return partial fields (user status is not active)
  router.get('/profile', asyncSaveHandler<never, never, MyProfileResponseDto>(async (req, res) => {
    const userId = await myProfileRequestSchema.validate(req.user?.userId);
    const profile = await userService.getMyProfile(userId)

    res.json(profile)
  }))

  router.patch('/profile', asyncSaveHandler<never, MyUpdateProfileRequestDto, MyProfileResponseDto>(async (req, res) => {
    const profileDto = await myUpdateProfileRequestSchema.validate(req.body);
    const userId = await myProfileRequestSchema.validate(req.user?.userId);
    const profile = await userService.updateProfile(userId, profileDto)

    res.json(profile)
  }))

  router.post('/complete', asyncSaveHandler<never, never, boolean>(async (req, res) => {
    const userId = await myProfileRequestSchema.validate(req.user?.userId);
    const isSuccess = await userService.complete(userId)

    res.json(isSuccess)
  }))

  return router;
}
