import { Request, Response } from 'express';
import { CreateCreditTypeService } from '../../application/crediType/services/CreateCreditTypeService';
import { UpdateCreditTypeService } from '../../application/crediType/services//UpdateCreditTypeService';
import { ListCreditTypesService } from '../../application/crediType/services/ListCreditTypesService';
import { CreateIndirectChargeService } from '../../application/indirectCharge/services/CreateIndirectChargeService';
import { UpdateIndirectChargeService } from '../../application/indirectCharge/services/UpdateIndirectChargeService';
import { ListIndirectChargesService } from '../../application/indirectCharge/services/ListIndirectChargesService';

// =======================
// Credit Types
// =======================

export const createCreditTypeController = async (req: Request, res: Response): Promise<void> => {
  const service = new CreateCreditTypeService();
  try {
    await service.execute(req.body);
    res.status(201).json({ message: 'Credit type created successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCreditTypeController = async (req: Request, res: Response): Promise<void> => {
  const service = new UpdateCreditTypeService();
  try {
    await service.execute({ id: Number(req.params.id), ...req.body });
    res.status(200).json({ message: 'Credit type updated successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listCreditTypesController = async (req: Request, res: Response): Promise<void> => {
    const service = new ListCreditTypesService();
    try {
      const creditTypes = await service.execute();
      res.status(200).json(creditTypes);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

// =======================
// Indirect Charges
// =======================

export const createIndirectChargeController = async (req: Request, res: Response): Promise<void> => {
  const service = new CreateIndirectChargeService();
  try {
    await service.execute(req.body);
    res.status(201).json({ message: 'Indirect charge created successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIndirectChargeController = async (req: Request, res: Response): Promise<void> => {
  const service = new UpdateIndirectChargeService();
  try {
    await service.execute({ id: Number(req.params.id), ...req.body });
    res.status(200).json({ message: 'Indirect charge updated successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listIndirectChargesController = async (req: Request, res: Response): Promise<void> => {
    const service = new ListIndirectChargesService();
    try {
      const indirectCharges = await service.execute();
      res.status(200).json(indirectCharges);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
