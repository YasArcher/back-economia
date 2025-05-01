import { Router } from 'express';
import {
  getAllInvestmentConfigurationsController,
  getInvestmentByIdController,
  createInvestmentConfigurationController,
  updateInvestmentConfigurationController,
  deleteInvestmentConfigurationController
} from '../controllers/investment.controller';

const router = Router();

router.get('/investment', getAllInvestmentConfigurationsController);         // Obtener todos
router.get('/investment/:id', getInvestmentByIdController);                  // Obtener por ID
router.post('/investment', createInvestmentConfigurationController);         // Crear
router.put('/investment', updateInvestmentConfigurationController);          // Actualizar
router.delete('/investment/:id', deleteInvestmentConfigurationController);   // Eliminar

export { router as investmentRouter };
