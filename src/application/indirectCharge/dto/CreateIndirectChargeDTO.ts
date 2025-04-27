export interface CreateIndirectChargeDTO {
    creditTypeId: number;
    name: string;
    chargeType: 'percentage' | 'fixed';
    value: number;
  }
  