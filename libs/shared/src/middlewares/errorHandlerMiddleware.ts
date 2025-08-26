import { AxiosError, isAxiosError } from 'axios';
import { Express, NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import { BadRequest400Error, BaseError } from '../model';
import { BaseHttpError } from '../model/exceptions/http/BaseHttpError';
import { appLogger } from '../utils';
import * as process from 'node:process';

const SERVER_ERROR_STATUS = 500
const isProduction = process.env.NODE_ENV === 'production';

const toDisplayError = (err: Error) => {
  const isBaseError = err instanceof BaseError

  return {
    success: false,
    name: err.name,
    message: err.message,
    stack: isProduction ? undefined : err.stack,
    originalError: (!isProduction && isBaseError) ? err.originalError : undefined,
    stackMessage: (!isProduction && isBaseError) ? err.stackMessage : undefined,
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (err: Error, _: Request, res: Response, __: NextFunction) => {
  appLogger.error(err)
  if (err instanceof ValidationError) {
    const message = err.errors.join(', ')
    const badRequest = new BadRequest400Error(message)

    res.status(400).send(toDisplayError(badRequest));

    return;
  }

  if (err instanceof BaseHttpError) {
    res.status(err.status).send(toDisplayError(err));

    return;
  }

  if (isAxiosError(err)) {
    const axiosError = err as AxiosError<BaseHttpError>;
    const status = axiosError.response?.status || SERVER_ERROR_STATUS;
    const message = axiosError.response?.data?.message || axiosError.message;
    const stack = axiosError.response?.data?.stack;
    const name = axiosError.response?.data?.name;
    const originalError = axiosError.response?.data?.originalError;
    const stackMessage = axiosError.response?.data?.stackMessage;

    const axios = {
      isAxiosError: true,
      message,
      stack,
      name,
      originalError,
      stackMessage,
      code: axiosError.code,
      status,
      statusText: axiosError.response?.statusText,
      method: axiosError.config?.method,
      url: axiosError.config?.url,
    }

    res.status(status).json({ success: false, ...axios })

    return;
  }

  res.status(SERVER_ERROR_STATUS).json(toDisplayError(err))
}

export const errorHandlerWrapper = (app: Express) => {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandlerMiddleware(err, req, res, next);
  })
}
