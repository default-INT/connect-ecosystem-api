import { OpenApiPaths } from '@connect-ecosystem-api/yup-to-swagger';

export const authPaths: OpenApiPaths = {
  '/login': {
    post: {
      summary: 'User login',
      description: 'User authentication by email/username and password or via OAuth',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequestDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful authentication',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TokenPairResponseDto',
              },
            },
          },
        },
        '400': {
          description: 'Invalid request data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/register': {
    post: {
      summary: 'Registration of a new user',
      description: 'Creation of a new user account',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequestDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Successful registration',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TokenPairResponseDto',
              },
            },
          },
        },
        '400': {
          description: 'User already exists or invalid data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/refresh': {
    post: {
      summary: 'Token refresh',
      description: 'Getting a new access token using a refresh token',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RefreshTokenDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Token successfully updated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TokenPairResponseDto',
              },
            },
          },
        },
        '401': {
          description: 'Invalid or expired refresh token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
  '/logout': {
    post: {
      summary: 'Logout',
      description: 'Deactivation of access and refresh tokens. Requires Authorization header with Bearer token.',
      tags: ['Authentication'],
      responses: {
        '200': {
          description: 'Successful logout',
          content: {
            'application/json': {
              schema: {
                type: 'boolean',
              },
            },
          },
        },
        '401': {
          description: 'Invalid or missing access token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  },
};
