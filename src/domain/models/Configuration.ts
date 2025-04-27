export interface Configuration {
    id: number;
    type: 'credit' | 'investment';
    minAmount: number;
    maxAmount: number;
    minTermMonths: number;
    maxTermMonths: number;
    interestRateMin: number;
    interestRateMax: number;
    createdAt: Date;
  }
  