import { OpenApiSpec, generateOpenApiSpec } from '@connect-ecosystem-api/yup-to-swagger';
import {
  createUserRequestSchema,
  createUserResponseSchema,
  deleteUserRequestSchema,
  deleteUserResponseSchema,
} from '@connect-ecosystem-api/api'
import { internalPaths } from '../routes/docs/internal';
import { myPaths } from '../routes/docs/my';
import { env } from '@user-service/config/env';
import { myProfileResponseSchema, myUpdateProfileRequestSchema } from '@user-service/model';

export const generateFullSpec = (): OpenApiSpec => {
  const schemas = {
    CreateUserRequestDto: createUserRequestSchema,
    CreateUserResponseDto: createUserResponseSchema,
    DeleteUserRequestDto: deleteUserRequestSchema,
    DeleteUserResponseDto: deleteUserResponseSchema,
    MyProfileResponseDto: myProfileResponseSchema,
    MyUpdateProfileRequestDto: myUpdateProfileRequestSchema,
  };

  const baseSpec = generateOpenApiSpec(
    schemas,
    {
      title: 'User Service API',
      version: '1.0.0',
      description: 'Microservice for user management - internal and my APIs for user management',
    },
    {
      includeBearerAuth: false,
    },
  );

  return {
    ...baseSpec,
    servers: [
      {
        url: `http://${env.host}:${env.port}`,
        description: 'User Service',
      },
    ],
    paths: {
      ...myPaths,
      ...internalPaths,
    },
  };
};
