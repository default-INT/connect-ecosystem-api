import { NextFunction, Request, Response } from 'express';
import { headerKeys } from '../config';

// TODO: move to api? or separate package?
export const injectUserInfo = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[headerKeys.userInfo.userId]
  const appId = req.headers[headerKeys.userInfo.appId]
  const userJti = req.headers[headerKeys.userInfo.userJti]

  if (!userId || !appId || !userJti) {
    next()

    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (req as any).user = {
    userId: userId as string,
    appId: appId as string,
    jti: userJti as string,
  }

  next()
}
