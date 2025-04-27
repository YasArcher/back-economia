export interface UpdateIndirectChargeDTO {
    id: number;
    name?: string;
    chargeType?: 'percentage' | 'fixed';
    value?: number;
  }
  