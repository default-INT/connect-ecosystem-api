import { OpenApiPaths } from '@connect-ecosystem-api/yup-to-swagger';

export const internalPaths: OpenApiPaths = {
  '/internal/user': {
    post: {
      summary: 'Create user (internal)',
      description: 'Creates a new user based on login payload (internal only).',
      tags: ['Internal'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequestDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User ID of created user',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUserResponseDto',
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
  '/internal/user/{userId}': {
    delete: {
      summary: 'Delete user (internal)',
      description: 'Deletes a user by id (internal only).',
      tags: ['Internal'],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          description: 'User ID to delete',
          schema: {
            $ref: '#/components/schemas/DeleteUserRequestDto',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Result of delete',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/DeleteUserResponseDto',
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
