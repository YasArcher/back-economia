import { SqlServerConfigurationRepository } from '../../infrastructure/repositories/SqlServerConfigurationRepository';

export class ValidationService {
  private static configRepo = new SqlServerConfigurationRepository();

  static async validateConfiguration(
    type: 'credit' | 'investment',
    amount: number,
    termMonths: number,
    interestRate: number
  ): Promise<void> {
    const config = await this.configRepo.findByType(type);

    if (!config) {
      throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} configuration not found`);
    }

    if (amount < config.minAmount || amount > config.maxAmount) {
      throw new Error(`Amount must be between ${config.minAmount} and ${config.maxAmount}`);
    }

    if (termMonths < config.minTermMonths || termMonths > config.maxTermMonths) {
      throw new Error(`Term must be between ${config.minTermMonths} and ${config.maxTermMonths} months`);
    }

    if (interestRate < config.interestRateMin || interestRate > config.interestRateMax) {
      throw new Error(`Interest rate must be between ${config.interestRateMin}% and ${config.interestRateMax}%`);
    }
  }
}
