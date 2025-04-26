import { Express } from 'express';
import { userRouter } from './user.routes';

export function registerRoutes(app: Express) {
  app.use('/users', userRouter);
}
