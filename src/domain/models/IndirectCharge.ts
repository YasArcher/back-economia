export interface IndirectCharge {
    id: number;
    creditTypeId: number;
    name: string;
    chargeType: 'percentage' | 'fixed';
    value: number;
    createdAt: Date;
  }
  