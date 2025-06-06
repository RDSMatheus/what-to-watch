import express, { NextFunction, Request, Response } from 'express';
import { ErrorBase } from '../errors/base.error';
import { InternalServerError } from '../errors/internal-server.error';

export const errorHandler = (app: express.Express) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if (error instanceof ErrorBase) {
      error.send(res);
    } else {
      new InternalServerError().send(res);
    }
  });
};
