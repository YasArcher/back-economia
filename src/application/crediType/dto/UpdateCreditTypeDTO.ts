export interface UpdateCreditTypeDTO {
    id: number;
    name?: string;
    interestRate?: number;
    minAmount?: number;
    maxAmount?: number;
    minTermDays?: number;
    maxTermDays?: number;
    minTermMonths?: number;
    maxTermMonths?: number;
  }
  