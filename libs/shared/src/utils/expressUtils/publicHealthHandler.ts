import { Request, Response } from 'express';

export const publicHealthHandler = (_: Request, res: Response) => {
  const now = new Date();

  res.status(200).send(now.toISOString())
}
