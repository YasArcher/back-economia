import { pool } from '../../config/sqlServerClient';
import { Configuration } from '../../domain/models/Configuration';

export class SqlServerConfigurationRepository {
  async findByType(type: 'credit' | 'investment'): Promise<Configuration | null> {
    const request = pool.request();
    const result = await request.query(`
      SELECT TOP 1 *
      FROM configurations
      WHERE type = '${type}'
      ORDER BY created_at DESC
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    const raw = result.recordset[0];
    return {
      id: raw.id,
      type: raw.type,
      minAmount: raw.min_amount,
      maxAmount: raw.max_amount,
      minTermMonths: raw.min_term_months,
      maxTermMonths: raw.max_term_months,
      interestRateMin: raw.interest_rate_min,
      interestRateMax: raw.interest_rate_max,
      createdAt: raw.created_at,
    };
  }
}
