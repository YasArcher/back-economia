export interface CreditType {
  id: number;
  name: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  minTermMonths: number;
  maxTermMonths: number;
  createdAt: Date;
}
