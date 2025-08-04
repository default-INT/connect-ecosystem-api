import { Router } from 'express';
import { asyncSaveHandler } from '@connect-ecosystem-api/shared';
import {
  validateTokenRequestSchema,
  ValidateTokenRequestDto,
  ValidateTokenResponseDto,
} from '@connect-ecosystem-api/api';
import { AuthService } from '../services';
import {
  RevokeTokenRequestDto,
  RevokeTokenResponseDto,
  revokeTokenRequestSchema,
} from '../model';

export const getInternalRoutes = (authService: AuthService) => {
  const router = Router();

  router.post('/validate-token', asyncSaveHandler<object, ValidateTokenRequestDto, ValidateTokenResponseDto>(async (req, res) => {
    const { accessToken } = await validateTokenRequestSchema.validate(req.body);
    const payload = await authService.validateAccessToken(accessToken);
    res.json({ valid: true, payload });
  }));

  router.post('/is-revoked-token', asyncSaveHandler<object, RevokeTokenRequestDto, RevokeTokenResponseDto>(async (req, res) => {
    const { accessToken } = await revokeTokenRequestSchema.validate(req.body);
    const isRevoked = await authService.isTokenRevoked(accessToken);
    res.json({ isRevoked });
  }));

  return router;
};
