interface AmountRange {
  maximo: number;
  valor: number;
}

export interface IndirectCharge {
  id: number;
  creditTypeId: number;
  name: string;
  chargeType: 'percentage' | 'fixed';
  amountRanges: AmountRange[];
  createdAt: Date;
}
