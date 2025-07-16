/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export const asyncSaveHandler = <ReqParams = any, ReqBody = any, ResBody = any>(
  fn: (req: Request<ReqParams, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) => Promise<any>,
) => (req: Request<ReqParams, ResBody, ReqBody>, res: Response<ResBody>, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
