import * as process from 'node:process';

export const env = {
  services: {
    auth: process.env.AUTH_SERVICE_URL || 'http://localhost:4001',
    user: process.env.USER_SERVICE_URL || 'http://localhost:4002',
  },
}
