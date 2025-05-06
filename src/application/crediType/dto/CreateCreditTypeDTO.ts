export interface CreateCreditTypeDTO {
  name: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTermDays: number;
  maxTermDays: number;
  minTermMonths: number;
  maxTermMonths: number;
}
