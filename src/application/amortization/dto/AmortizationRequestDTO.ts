export interface AmortizationRequestDTO {
  amount: number;
  termMonths: number;
  creditType: number;
  systemType: 'french' | 'german';
}