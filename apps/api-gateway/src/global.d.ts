import { JwtAccessPayload } from '@connect-ecosystem-api/shared';

declare global {
  namespace Express {
    interface Request {
      user?: JwtAccessPayload
    }
  }
}
