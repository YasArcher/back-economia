import { AmortizationRequestDTO } from '../dto/AmortizationRequestDTO';
import { AmortizationScheduleEntry } from '../../../domain/models/AmortizationScheduleEntry';
import { SqlServerCreditTypeRepository } from '../../../infrastructure/repositories/SqlServerCreditTypeRepository';
import { SqlServerIndirectChargeRepository } from '../../../infrastructure/repositories/SqlServerIndirectChargeRepository';
import { ValidationService } from '../../../shared/services/ValidationService';

export class AmortizationService {
  private creditTypeRepo = new SqlServerCreditTypeRepository();
  private indirectChargeRepo = new SqlServerIndirectChargeRepository();

  async execute(dto: AmortizationRequestDTO): Promise<AmortizationScheduleEntry[]> {
    const { creditTypeId, amount, termMonths, systemType } = dto;

    const creditType = await this.creditTypeRepo.findById(creditTypeId);
    if (!creditType) {
      throw new Error('Credit type not found');
    }

    const indirectCharges = await this.indirectChargeRepo.findByCreditTypeId(creditTypeId);

    // VALIDACIONES
    await ValidationService.validateConfiguration('credit', amount, termMonths, creditType.interestRate);

    const monthlyInterestRate = creditType.interestRate / 12 / 100;
    const schedule: AmortizationScheduleEntry[] = [];

    let remainingBalance = amount;
    let totalIndirectChargesMonthly = this.calculateMonthlyIndirectCharges(indirectCharges, amount);

    if (systemType === 'french') {
      const installment = amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths)) / (Math.pow(1 + monthlyInterestRate, termMonths) - 1);

      for (let month = 1; month <= termMonths; month++) {
        const interest = remainingBalance * monthlyInterestRate;
        const principal = installment - interest;
        remainingBalance -= principal;

        schedule.push({
          month,
          installment: Number((installment + totalIndirectChargesMonthly).toFixed(2)),
          principal: Number(principal.toFixed(2)),
          interest: Number(interest.toFixed(2)),
          balance: Number(Math.max(remainingBalance, 0).toFixed(2)),
        });
      }
    } else if (systemType === 'german') {
      const principalPayment = amount / termMonths;

      for (let month = 1; month <= termMonths; month++) {
        const interest = remainingBalance * monthlyInterestRate;
        const installment = principalPayment + interest;

        remainingBalance -= principalPayment;

        schedule.push({
          month,
          installment: Number((installment + totalIndirectChargesMonthly).toFixed(2)),
          principal: Number(principalPayment.toFixed(2)),
          interest: Number(interest.toFixed(2)),
          balance: Number(Math.max(remainingBalance, 0).toFixed(2)),
        });
      }
    } else {
      throw new Error('Invalid system type');
    }

    return schedule;
  }

  private calculateMonthlyIndirectCharges(indirectCharges: any[], amount: number): number {
    let total = 0;

    for (const charge of indirectCharges) {
      if (charge.chargeType === 'percentage') {
        total += (amount * charge.value) / 100;
      } else if (charge.chargeType === 'fixed') {
        total += charge.value;
      }
    }

    return total;
  }
}
