import { Router } from "express";
import {
    createCreditTypeController,
    updateCreditTypeController,
    createIndirectChargeController,
    updateIndirectChargeController,
    listCreditTypesController,
    listIndirectChargesController
  } from '../controllers/management.controller';
const router = Router();

router.post('/credit-types', createCreditTypeController);
router.put('/credit-types/:id', updateCreditTypeController);
router.get('/credit-types', listCreditTypesController);

router.post('/indirect-charges', createIndirectChargeController);
router.put('/indirect-charges/:id', updateIndirectChargeController);
router.get('/indirect-charges', listIndirectChargesController);

export { router as managmentRouter };