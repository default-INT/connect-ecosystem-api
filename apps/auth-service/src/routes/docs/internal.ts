import { OpenApiPaths } from '@connect-ecosystem-api/shared';

export const internalPaths: OpenApiPaths = {
  '/internal/validate-token': {
    post: {
      summary: 'Validate access token',
      description: 'Validates access token and returns payload if valid',
      tags: ['Internal'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ValidateTokenRequestDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Token validation result',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidateTokenResponseDto',
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
          description: 'Invalid or expired token',
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
  '/internal/is-revoked-token': {
    post: {
      summary: 'Check if token is revoked',
      description: 'Checks if access token has been revoked',
      tags: ['Internal'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RevokeTokenRequestDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Token revocation status',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RevokeTokenResponseDto',
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
      },
    },
  },
};
