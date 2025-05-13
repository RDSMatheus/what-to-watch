import express from 'express';
import userRouter from './user.routes';
import reactionRouter from './reaction.routes';
import movieRouter from './movie.routes';
import authRouter from './auth.routes';
import uptimeRouter from './uptime.routes';

export const routes = (app: express.Express) => {
  app.use(express.json());
  app.use(userRouter);
  app.use(reactionRouter);
  app.use(movieRouter);
  app.use(authRouter);
  app.use(uptimeRouter)
};
