import { JwtAccessPayload } from '@connect-ecosystem-api/api';

declare global {
  namespace Express {
    interface Request {
      user?: JwtAccessPayload
    }
  }
}
