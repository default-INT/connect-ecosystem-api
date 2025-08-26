import { OpenApiPaths } from '@connect-ecosystem-api/yup-to-swagger';

export const myPaths: OpenApiPaths = {
  '/my/profile': {
    get: {
      summary: 'Get my profile',
      description: 'Returns current user profile by access token',
      tags: ['My'],
      responses: {
        '200': {
          description: 'Current user profile',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MyProfileResponseDto',
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
    patch: {
      summary: 'Update my profile',
      description: 'Updates current user profile by access token',
      tags: ['My'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MyUpdateProfileRequestDto',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Updated profile',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/MyProfileResponseDto',
              },
            },
          },
        },
        '400': {
          description: 'Invalid request data',
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
  '/my/complete': {
    post: {
      summary: 'Complete my profile',
      description: 'Marks current user profile as complete',
      tags: ['My'],
      responses: {
        '200': {
          description: 'Operation result',
          content: {
            'application/json': {
              schema: {
                type: 'boolean',
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
};
