import { OpenApiSpec, swaggerUtils } from '@connect-ecosystem-api/shared';
import {
  loginRequestSchema,
  refreshTokenSchema,
  tokenPairResponseSchema,
  validateTokenRequestSchema,
  validateTokenResponseSchema,
  revokeTokenRequestSchema,
  revokeTokenResponseSchema,
} from '../model';
import { authPaths } from '../routes/docs/auth';
import { internalPaths } from '../routes/docs/internal';

export const generateFullSpec = (): OpenApiSpec => {
  const schemas = {
    LoginRequestDto: loginRequestSchema,
    RefreshTokenDto: refreshTokenSchema,
    TokenPairResponseDto: tokenPairResponseSchema,
    ValidateTokenRequestDto: validateTokenRequestSchema,
    ValidateTokenResponseDto: validateTokenResponseSchema,
    RevokeTokenRequestDto: revokeTokenRequestSchema,
    RevokeTokenResponseDto: revokeTokenResponseSchema,
  };

  const baseSpec = swaggerUtils.generateOpenApiSpec(
    schemas,
    {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'Microservice for authentication - API for login, registration and token management',
    },
    {
      includeBearerAuth: true,
      bearerAuthDescription: 'Enter your access token',
    },
  );

  return {
    ...baseSpec,
    servers: [
      {
        url: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
        description: 'Auth Service',
      },
    ],
    paths: {
      ...authPaths,
      ...internalPaths,
    },
  };
};
