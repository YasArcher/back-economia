import { Request, Response } from 'express';
import { SqlServerUnitOfWork } from '../../infrastructure/unitOfWork/SqlServerUnitOfWork';

import { GetInvestmentConfigurationsService } from '../../application/investment/services/GetInvestmentConfigurationsService';
import { GetInvestmentByIdService } from '../../application/investment/services/GetInvestmentByIdService';
import { CreateInvestmentConfigurationService } from '../../application/investment/services/CreateInvestmentConfigurationService';
import { UpdateInvestmentConfigurationService } from '../../application/investment/services/UpdateInvestmentConfigurationService';
import { DeleteInvestmentConfigurationService } from '../../application/investment/services/DeleteInvestmentConfigurationService';

// =======================
// Obtener todos
// =======================
export const getAllInvestmentConfigurationsController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();

  try {
    const service = new GetInvestmentConfigurationsService(unitOfWork);
    const data = await service.execute();
    await unitOfWork.complete();
    res.status(200).json(data);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Obtener por ID
// =======================
export const getInvestmentByIdController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();

  try {
    const service = new GetInvestmentByIdService(unitOfWork);
    const data = await service.execute(Number(req.params.id));
    await unitOfWork.complete();

    if (!data) {
      res.status(404).json({ message: 'Configuración no encontrada' });
    } else {
      res.status(200).json(data);
    }
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(500).json({ message: error.message });
  }
};

// =======================
// Crear
// =======================
export const createInvestmentConfigurationController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();

  try {
    const service = new CreateInvestmentConfigurationService(unitOfWork);
    const created = await service.execute(req.body);
    await unitOfWork.complete();
    res.status(201).json(created);
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Actualizar
// =======================
export const updateInvestmentConfigurationController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();

  try {
    const service = new UpdateInvestmentConfigurationService(unitOfWork);
    await service.execute(req.body);
    await unitOfWork.complete();
    res.status(200).json({ message: 'Configuración actualizada exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};

// =======================
// Eliminar
// =======================
export const deleteInvestmentConfigurationController = async (req: Request, res: Response): Promise<void> => {
  const unitOfWork = new SqlServerUnitOfWork();
  await unitOfWork.start();

  try {
    const service = new DeleteInvestmentConfigurationService(unitOfWork);
    await service.execute(Number(req.params.id));
    await unitOfWork.complete();
    res.status(200).json({ message: 'Configuración eliminada exitosamente' });
  } catch (error: any) {
    await unitOfWork.rollback();
    res.status(400).json({ message: error.message });
  }
};
