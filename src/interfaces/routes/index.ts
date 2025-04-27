import { Express } from 'express';
import { userRouter } from './user.routes';
import { simulationRouter } from './simulations.routes';
import { managmentRouter } from './management.routes';

export function registerRoutes(app: Express) {
  app.use('/users', userRouter);
  app.use('/simulate', simulationRouter);
  app.use('/management', managmentRouter);
}
