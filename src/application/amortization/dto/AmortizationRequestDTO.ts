export interface AmortizationRequestDTO {
  creditTypeId: number;
  amount: number;
  termMonths: number;
  systemType: 'french' | 'german';
}
