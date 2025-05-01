export interface CreateConfigurationDTO {
  min_amount: number;
  max_amount?: number;
  min_term_months: number;
  max_term_months?: number;
  interest_rate: number;
}
