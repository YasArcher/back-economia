export interface AmountRange {
  maximo: number; // Límite máximo del tramo
  valor: number; // Valor aplicado (fijo o %)
}
export interface UpdateIndirectChargeDTO {
  id: number;
  name?: string;
  chargeType?: 'percentage' | 'fixed';
  amountRanges?: AmountRange[]; // ← Reemplaza value
}
