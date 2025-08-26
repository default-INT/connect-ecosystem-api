import { Router } from 'express';
import { asyncSaveHandler, Unauthorized401Error } from '@connect-ecosystem-api/shared';
import { loginRequestSchema, LoginRequestDto } from '@connect-ecosystem-api/api';
import { AuthService } from '../services';
import {
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

  router.get('/health', (req, res) => {
    res.json(true)
  })

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

  router.post('/logout', asyncSaveHandler<object, object, boolean>(async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Unauthorized401Error('Authorization header required');
    }

    const accessToken = authHeader.replace('Bearer ', '');
    await authService.logout(accessToken);

    res.json(true);
  }))

  return router;
}
