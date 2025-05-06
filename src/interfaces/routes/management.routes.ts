import { Router } from "express";
import {
    createCreditTypeController,
    updateCreditTypeController,
    createIndirectChargeController,
    updateIndirectChargeController,
    listCreditTypesController,
    listIndirectChargesController,
    deleteCreditTypeController,
    deleteIndirectChargeController,
  } from '../controllers/management.controller';
const router = Router();

router.post('/credit-types', createCreditTypeController);
router.put('/credit-types/:id', updateCreditTypeController);
router.get('/credit-types', listCreditTypesController);
router.delete('/credit-types/:id', deleteCreditTypeController);

router.post('/indirect-charges', createIndirectChargeController);
router.put('/indirect-charges/:id', updateIndirectChargeController);
router.get('/indirect-charges', listIndirectChargesController);
router.delete('/indirect-charges/:id', deleteIndirectChargeController);

export { router as managmentRouter };