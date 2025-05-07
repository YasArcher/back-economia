import { Express } from 'express';
import { userRouter } from './user.routes';
import { simulationRouter } from './simulations.routes';
import { managmentRouter } from './management.routes';
import { appConfigurationRouter } from './appConfiguration.routes';
import { investmentRouter } from './investment.routes';
import { uploadRouter } from './upload.routes';
import { homeBannerUploadRouter } from './homeBannerUpload.routes';
import { aboutUsUploadRouter } from './upload-about-us.routes';

export function registerRoutes(app: Express) {
  app.use('/users', userRouter);
  app.use('/simulate', simulationRouter);
  app.use('/management', managmentRouter);
  app.use('/configuration', appConfigurationRouter);
  app.use('/sim', investmentRouter);
  app.use('/upload', uploadRouter);
  app.use('/upload-home-banner', homeBannerUploadRouter); 
  app.use('/upload-about-us', aboutUsUploadRouter);

}
