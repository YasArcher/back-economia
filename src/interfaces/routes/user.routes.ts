import { Router } from 'express';
import { getUsersController } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsersController);

export { router as userRouter };
