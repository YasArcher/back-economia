import { AmortizationRequestDTO } from "../dto/AmortizationRequestDTO";
import { SqlServerCreditTypeRepository } from "../../../infrastructure/repositories/SqlServerCreditTypeRepository";
import { SqlServerIndirectChargeRepository } from "../../../infrastructure/repositories/SqlServerIndirectChargeRepository";

export class AmortizationService {
  private creditTypeRepo = new SqlServerCreditTypeRepository();
  private indirectChargeRepo = new SqlServerIndirectChargeRepository();

  async execute(dto: AmortizationRequestDTO): Promise<any[]> {
    const { creditType, amount, termMonths, systemType } = dto;

    const creditTypeEntity = await this.creditTypeRepo.findById(creditType);
    if (!creditTypeEntity) throw new Error("Tipo de crédito no encontrado");

    const term = termMonths;
    if (!term || isNaN(term) || term <= 0)
      throw new Error("Debe proporcionar un plazo válido en meses.");

    if (
      amount < creditTypeEntity.minAmount ||
      amount > creditTypeEntity.maxAmount
    ) {
      throw new Error(
        `El monto debe estar entre ${creditTypeEntity.minAmount} y ${creditTypeEntity.maxAmount}`
      );
    }

    if (
      term < creditTypeEntity.minTermMonths ||
      term > creditTypeEntity.maxTermMonths
    ) {
      throw new Error(
        `El plazo debe estar entre ${creditTypeEntity.minTermMonths} y ${creditTypeEntity.maxTermMonths} meses`
      );
    }

    const indirectCharges = await this.indirectChargeRepo.findByCreditTypeId(
      creditType
    );
    const monthlyInterestRate = creditTypeEntity.interestRate / 12 / 100;
    const schedule: any[] = [];

    const additionalMonthlyCharge = this.calculateMonthlyIndirectCharges(
      indirectCharges,
      amount,
      term
    );
    let remainingBalance = parseFloat(amount.toFixed(2));

    schedule.push({
      N: "-",
      "Cuota Simple": "-",
      "Cuota Compuesta": "-",
      Interes: "-",
      Capital: "-",
      Saldo: `$${remainingBalance.toFixed(2)}`,
    });

    if (systemType === "german") {
      const capitalPayment = parseFloat((amount / term).toFixed(2));

      for (let month = 1; month <= term; month++) {
        const interest = parseFloat(
          (remainingBalance * monthlyInterestRate).toFixed(2)
        );
        let capital = capitalPayment;
        let installment = parseFloat((capital + interest).toFixed(2));
        let newBalance = parseFloat((remainingBalance - capital).toFixed(2));

        if (month === term) {
          capital = remainingBalance;
          installment = parseFloat((capital + interest).toFixed(2));
          newBalance = 0;
        }

        schedule.push({
          N: month,
          "Cuota Simple": `$${installment.toFixed(2)}`,
          "Cuota Compuesta": `$${(
            installment + additionalMonthlyCharge
          ).toFixed(2)}`,
          Interes: `$${interest.toFixed(2)}`,
          Capital: `$${capital.toFixed(2)}`,
          Saldo: `$${newBalance.toFixed(2)}`,
        });

        remainingBalance = newBalance;
      }
    } else if (systemType === "french") {
      const cuota =
        (amount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term))) /
        (Math.pow(1 + monthlyInterestRate, term) - 1);
      const cuotaFixed = parseFloat(cuota.toFixed(2));

      for (let month = 1; month <= term; month++) {
        const interest = parseFloat(
          (remainingBalance * monthlyInterestRate).toFixed(2)
        );
        let capital = parseFloat((cuotaFixed - interest).toFixed(2));
        let newBalance = parseFloat((remainingBalance - capital).toFixed(2));

        if (month === term) {
          capital = remainingBalance;
          const finalInterest = parseFloat((cuotaFixed - capital).toFixed(2));
          schedule.push({
            N: month,
            "Cuota Simple": `$${cuotaFixed.toFixed(2)}`,
            "Cuota Compuesta": `$${(
              cuotaFixed + additionalMonthlyCharge
            ).toFixed(2)}`,
            Interes: `$${finalInterest.toFixed(2)}`,
            Capital: `$${capital.toFixed(2)}`,
            Saldo: `$0.00`,
          });
        } else {
          schedule.push({
            N: month,
            "Cuota Simple": `$${cuotaFixed.toFixed(2)}`,
            "Cuota Compuesta": `$${(
              cuotaFixed + additionalMonthlyCharge
            ).toFixed(2)}`,
            Interes: `$${interest.toFixed(2)}`,
            Capital: `$${capital.toFixed(2)}`,
            Saldo: `$${newBalance.toFixed(2)}`,
          });
          remainingBalance = newBalance;
        }
      }
    } else {
      throw new Error("Invalid system type");
    }

    return schedule;
  }

  private calculateMonthlyIndirectCharges(
    indirectCharges: any[],
    amount: number,
    totalInstallments: number
  ): number {
    let total = 0;

    for (const charge of indirectCharges) {
      if (
        charge.chargeType === "percentage" &&
        Array.isArray(charge.amountRanges)
      ) {
        // Ordenar rangos y tomar el primero que calce o el último si ninguno calza
        const sorted = charge.amountRanges.sort(
          (a: any, b: any) => a.max - b.max
        );
        const matchedRange =
          sorted.find((range: any) => amount <= range.max) ||
          sorted[sorted.length - 1];
        total += (amount * matchedRange.value) / 100 / totalInstallments;
      } else if (
        charge.chargeType === "fixed" &&
        Array.isArray(charge.amountRanges)
      ) {
        const sorted = charge.amountRanges.sort(
          (a: any, b: any) => a.max - b.max
        );
        const matchedRange =
          sorted.find((range: any) => amount <= range.max) ||
          sorted[sorted.length - 1];
        total += matchedRange.value / totalInstallments;
      }
    }

    return parseFloat(total.toFixed(2));
  }
}