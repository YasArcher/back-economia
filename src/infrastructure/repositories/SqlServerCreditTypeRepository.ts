import { pool } from '../../config/sqlServerClient';
import { CreditType } from '../../domain/models/CreditType';

export class SqlServerCreditTypeRepository {
  async create(creditType: Omit<CreditType, 'id' | 'createdAt'>): Promise<void> {
    const request = pool.request();
    await request.query(`
      INSERT INTO credit_types (name, interest_rate)
      VALUES ('${creditType.name}', ${creditType.interestRate})
    `);
  }

  async update(creditType: CreditType): Promise<void> {
    const request = pool.request();
    await request.query(`
      UPDATE credit_types
      SET name = '${creditType.name}', interest_rate = ${creditType.interestRate}
      WHERE id = ${creditType.id}
    `);
  }

  async findById(id: number): Promise<CreditType | null> {
    const request = pool.request();
    const result = await request.query(`
      SELECT * FROM credit_types WHERE id = ${id}
    `);

    if (result.recordset.length === 0) return null;

    const raw = result.recordset[0];
    return {
      id: raw.id,
      name: raw.name,
      interestRate: raw.interest_rate,
      createdAt: raw.created_at
    };
  }

  async findAll(): Promise<CreditType[]> {
    const request = pool.request();
    const result = await request.query(`SELECT * FROM credit_types`);
  
    return result.recordset.map(raw => ({
      id: raw.id,
      name: raw.name,
      interestRate: raw.interest_rate,
      createdAt: raw.created_at,
    }));
  }
  
}
