import { Configuration } from '../../domain/models/Configuration';
import { Transaction } from 'mssql';
import { pool } from '../../config/sqlServerClient';
import { IinvestmentRepository } from '../../domain/repositories/IinvestmentRepository';

export class SqlServerInvestmentRepository implements IinvestmentRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  private getRequest() {
    return this.transaction ? this.transaction.request() : pool.request();
  }

  async getAll(): Promise<Configuration[]> {
    const request = this.getRequest();
    const result = await request.query('SELECT * FROM configurations');
    return result.recordset;
  }

  async getById(id: number): Promise<Configuration | null> {
    const request = this.getRequest();
    request.input('id', id);
    const result = await request.query('SELECT * FROM configurations WHERE id = @id');
    return result.recordset[0] || null;
  }

  async create(config: Configuration): Promise<Configuration> {
    const request = this.getRequest();

    const result = await request.query(`
      INSERT INTO configurations (type, min_amount, max_amount, min_term_months, max_term_months, interest_rate, created_at)
      OUTPUT INSERTED.*
      VALUES (
        '${config.type}',
        ${config.minAmount},
        ${config.maxAmount ?? 'NULL'},
        ${config.minTermMonths},
        ${config.maxTermMonths ?? 'NULL'},
        ${config.interestRate},
        GETDATE()
      )
    `);

    return result.recordset[0];
  }

  async update(config: Configuration): Promise<void> {
    const request = this.getRequest();

    await request.query(`
      UPDATE configurations SET
        type = '${config.type}',
        min_amount = ${config.minAmount},
        max_amount = ${config.maxAmount ?? 'NULL'},
        min_term_months = ${config.minTermMonths},
        max_term_months = ${config.maxTermMonths ?? 'NULL'},
        interest_rate = ${config.interestRate}
      WHERE id = ${config.id}
    `);
  }

  async delete(id: number): Promise<void> {
    const request = this.getRequest();
    await request.query(`DELETE FROM configurations WHERE id = ${id}`);
  }
}
