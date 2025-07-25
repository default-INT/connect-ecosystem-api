import { Express, NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { BadRequest400Error } from '../model';
import { BaseHttpError } from '../model/exceptions/http/BaseHttpError';
import { appLogger } from '../utils';

const SERVER_ERROR_STATUS = 500

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (err: Error, _: Request, res: Response, __: NextFunction) => {
  appLogger.error(err)
  if (err instanceof ValidationError) {
    const message = err.errors.join(', ')
    const badRequest = new BadRequest400Error(message)

    res.status(400).send({ ...badRequest, message: badRequest.message });

    return;
  }

  if (err instanceof BaseHttpError) {
    res.status(err.status).send({ ...err, message: err.message })

    return;
  }

  res.status(SERVER_ERROR_STATUS).send(err)
}

export const errorHandlerWrapper = (app: Express) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandlerMiddleware(err, req, res, next);
  })
}
