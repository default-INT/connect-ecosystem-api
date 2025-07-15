import { Router } from 'express';
import { asyncSaveHandler } from '@connect-ecosystem-api/shared';
import { AuthService } from '../services';
import {
  LoginRequestDto,
  loginRequestSchema,
  refreshTokenSchema,
  TokenPairResponseDto,
  RefreshTokenDto,
} from '../model';

export const getAuthRoutes = (authService: AuthService) => {
  const router = Router()

  router.post('/login', asyncSaveHandler<object, LoginRequestDto, TokenPairResponseDto>(async (req, res) => {
    const loginData = await loginRequestSchema.validate(req.body);
    const response = await authService.login(loginData);

    res.json(response);
  }))

  router.post('/register', asyncSaveHandler<object, LoginRequestDto, TokenPairResponseDto>(async (req, res) => {
    const loginData = await loginRequestSchema.validate(req.body);
    const response = await authService.register(loginData);

    res.json(response);
  }))

  router.post('/refresh', asyncSaveHandler<object, RefreshTokenDto, TokenPairResponseDto>(async (req, res) => {
    const { refreshToken } = await refreshTokenSchema.validate(req.body);
    const response = await authService.refresh(refreshToken);

    res.json(response);
  }))

  router.post('/logout', asyncSaveHandler<object, RefreshTokenDto, boolean>(async (req, res) => {
    const { refreshToken } = await refreshTokenSchema.validate(req.body);

    await authService.logout(refreshToken);

    res.json(true);
  }))

  return router;
}
