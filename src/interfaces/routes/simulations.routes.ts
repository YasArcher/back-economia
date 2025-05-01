import { Router } from "express";
import { simulateAmortizationController} from '../controllers/simulations.controller';

const router = Router();

router.post("/amortization", simulateAmortizationController);

export { router as simulationRouter };