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
      INSERT INTO configurations ( min_amount, max_amount, min_term_months, max_term_months, interest_rate, created_at)
      OUTPUT INSERTED.*
      VALUES (
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
  
    request.input('id', config.id);
    request.input('min_amount', config.minAmount);
    request.input('max_amount', config.maxAmount ?? null);
    request.input('min_term_months', config.minTermMonths);
    request.input('max_term_months', config.maxTermMonths ?? null);
    request.input('interest_rate', config.interestRate);
  
    await request.query(`
      UPDATE configurations SET
        min_amount = @min_amount,
        max_amount = @max_amount,
        min_term_months = @min_term_months,
        max_term_months = @max_term_months,
        interest_rate = @interest_rate
      WHERE id = @id
    `);
  }
  

  async delete(id: number): Promise<void> {
    const request = this.getRequest();
    await request.query(`DELETE FROM configurations WHERE id = ${id}`);
  }
}
