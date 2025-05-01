export interface Configuration {
    id: number;
    type: 'credit' | 'investment';
    minAmount: number;
    maxAmount: number;
    minTermMonths: number;
    maxTermMonths: number;
    interestRate: number;
    createdAt: Date;
  }
  