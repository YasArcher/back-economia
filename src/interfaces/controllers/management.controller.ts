import { Request, Response } from "express";
import { CreateCreditTypeService } from "../../application/crediType/services/CreateCreditTypeService";
import { UpdateCreditTypeService } from "../../application/crediType/services//UpdateCreditTypeService";
import { ListCreditTypesService } from "../../application/crediType/services/ListCreditTypesService";
import { DeleteCreditTypeService } from "../../application/crediType/services/DeleteCreditTypeService";
import { CreateIndirectChargeService } from "../../application/indirectCharge/services/CreateIndirectChargeService";
import { UpdateIndirectChargeService } from "../../application/indirectCharge/services/UpdateIndirectChargeService";
import { ListIndirectChargesService } from "../../application/indirectCharge/services/ListIndirectChargesService";
import { DeleteIndirectChargeService } from "../../application/indirectCharge/services/DeleteIndirectChargeService";

// =======================
// Credit Types
// =======================

export const createCreditTypeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new CreateCreditTypeService();
  try {
    await service.execute(req.body);
    res.status(201).json({ message: "Credit type created successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCreditTypeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new UpdateCreditTypeService();
  try {
    await service.execute({ id: Number(req.params.id), ...req.body });
    res.status(200).json({ message: "Credit type updated successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listCreditTypesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new ListCreditTypesService();
  try {
    const creditTypes = await service.execute();
    res.status(200).json(creditTypes);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCreditTypeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const service = new DeleteCreditTypeService();
    await service.execute(id);
    res.status(200).json({ message: 'Tipo de crédito eliminado correctamente' });
  } catch (error: any) {
    // Verifica si es error por clave foránea
    if (error.number === 547) {
      res.status(409).json({ code: 'FOREIGN_KEY_CONSTRAINT', message: 'No se puede eliminar este tipo de crédito porque está en uso' });
    } else {
      console.error('Error al eliminar tipo de crédito:', error);
      res.status(500).json({ code: 'UNKNOWN_ERROR', message: 'Error interno al eliminar' });
    }
  }
};

// =======================
// Indirect Charges
// =======================

export const createIndirectChargeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new CreateIndirectChargeService();
  try {
    await service.execute(req.body);
    res.status(201).json({ message: "Indirect charge created successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIndirectChargeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new UpdateIndirectChargeService();
  try {
    await service.execute({ id: Number(req.params.id), ...req.body });
    res.status(200).json({ message: "Indirect charge updated successfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listIndirectChargesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new ListIndirectChargesService();
  try {
    const indirectCharges = await service.execute();
    res.status(200).json(indirectCharges);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIndirectChargeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const service = new DeleteIndirectChargeService();

  try {
    await service.execute(Number(req.params.id));
    res.status(200).json({ message: "Cargo indirecto eliminado correctamente" });

  } catch (error: any) {
    if (error.number === 547) {
      // Error por restricción de clave foránea
      res.status(409).json({
        code: "FOREIGN_KEY_CONSTRAINT",
        message: "No se puede eliminar este cargo indirecto porque está siendo utilizado."
      });
    } else {
      // Otro error no controlado
      console.error("Error al eliminar cargo indirecto:", error);
      res.status(500).json({
        code: "UNKNOWN_ERROR",
        message: "Ocurrió un error al intentar eliminar el cargo indirecto."
      });
    }
  }
};