import { InvestmentRequestDTO } from '../dto/InvestmentRequestDTO';
import { InvestmentScheduleEntry } from '../../../domain/models/InvestmentScheduleEntry';
import { ValidationService } from '../../../shared/services/ValidationService';

export class InvestmentService {
  async execute(dto: InvestmentRequestDTO): Promise<InvestmentScheduleEntry[]> {
    const { initialAmount, interestRate, termMonths } = dto;

    await ValidationService.validateConfiguration('investment', initialAmount, termMonths, interestRate);

    const monthlyInterestRate = interestRate / 12 / 100;
    const schedule: InvestmentScheduleEntry[] = [];

    let currentCapital = initialAmount;

    for (let month = 1; month <= termMonths; month++) {
      const interestEarned = currentCapital * monthlyInterestRate;
      const totalCapital = currentCapital + interestEarned;

      schedule.push({
        month,
        initialCapital: Number(currentCapital.toFixed(2)),
        interestEarned: Number(interestEarned.toFixed(2)),
        totalCapital: Number(totalCapital.toFixed(2)),
      });

      currentCapital = totalCapital;
    }

    return schedule;
  }
}
