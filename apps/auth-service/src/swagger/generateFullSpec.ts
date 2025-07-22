import { OpenApiSpec, swaggerUtils } from '@connect-ecosystem-api/shared';
import { loginRequestSchema, refreshTokenSchema, tokenPairResponseSchema } from '../model';
import { authPaths } from '../routes/docs/auth';

export const generateFullSpec = (): OpenApiSpec => {
  const schemas = {
    LoginRequestDto: loginRequestSchema,
    RefreshTokenDto: refreshTokenSchema,
    TokenPairResponseDto: tokenPairResponseSchema,
  };

  const baseSpec = swaggerUtils.generateOpenApiSpec(schemas, {
    title: 'Auth Service API',
    version: '1.0.0',
    description: 'Microservice for authentication - API for login, registration and token management',
  });

  return {
    ...baseSpec,
    servers: [
      {
        url: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
        description: 'Auth Service',
      },
    ],
    paths: authPaths,
  };
};
