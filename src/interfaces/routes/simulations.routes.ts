import { Router } from "express";
import { simulateAmortizationController, simulateInvestmentController } from '../controllers/simulations.controller';

const router = Router();

router.post("/amortization", simulateAmortizationController);
router.post("/investment", simulateInvestmentController);

export { router as simulationRouter };