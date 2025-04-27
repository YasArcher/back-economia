import { Request, Response } from 'express';
import { AmortizationService } from '../../application/amortization/services/AmortizationService';
import { AmortizationRequestDTO } from '../../application/amortization/dto/AmortizationRequestDTO';
import { InvestmentService } from '../../application/investment/services/InvestmentService';
import { InvestmentRequestDTO } from '../../application/investment/dto/InvestmentRequestDTO';

export const simulateAmortizationController = async (req: Request, res: Response): Promise<void> => {
  try {
    const dto: AmortizationRequestDTO = req.body;

    const service = new AmortizationService();
    const schedule = service.execute(dto);

    res.status(200).json(schedule);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
export const simulateInvestmentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const dto: InvestmentRequestDTO = req.body;

    const service = new InvestmentService();
    const schedule = service.execute(dto);

    res.status(200).json(schedule);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};