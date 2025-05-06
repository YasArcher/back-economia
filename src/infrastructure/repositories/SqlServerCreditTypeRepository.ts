import { pool } from "../../config/sqlServerClient";
import { CreditType } from "../../domain/models/CreditType";

export class SqlServerCreditTypeRepository {
  async create(
    creditType: Omit<CreditType, "id" | "createdAt">
  ): Promise<void> {
    const request = pool.request();

    await request
      .input("name", creditType.name)
      .input("interest_rate", creditType.interestRate)
      .input("min_amount", creditType.minAmount)
      .input("max_amount", creditType.maxAmount)
      .input("min_term_months", creditType.minTermMonths)
      .input("max_term_months", creditType.maxTermMonths).query(`
        INSERT INTO credit_types (
          name, interest_rate,
          min_amount, max_amount,
          min_term_months, max_term_months
        )
        VALUES (
          @name, @interest_rate,
          @min_amount, @max_amount,
          @min_term_months, @max_term_months
        )
      `);
  }

  async update(creditType: CreditType): Promise<void> {
    const request = pool.request();

    await request
      .input("id", creditType.id)
      .input("name", creditType.name)
      .input("interest_rate", creditType.interestRate)
      .input("min_amount", creditType.minAmount)
      .input("max_amount", creditType.maxAmount)
      .input("min_term_months", creditType.minTermMonths)
      .input("max_term_months", creditType.maxTermMonths).query(`
        UPDATE credit_types
        SET 
          name = @name,
          interest_rate = @interest_rate,
          min_amount = @min_amount,
          max_amount = @max_amount,
          min_term_months = @min_term_months,
          max_term_months = @max_term_months
        WHERE id = @id
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
      minAmount: raw.min_amount,
      maxAmount: raw.max_amount,
      minTermMonths: raw.min_term_months,
      maxTermMonths: raw.max_term_months,
      createdAt: raw.created_at,
    };
  }

  async findAll(): Promise<CreditType[]> {
    const request = pool.request();
    const result = await request.query(`SELECT * FROM credit_types`);

    return result.recordset.map((raw) => ({
      id: raw.id,
      name: raw.name,
      interestRate: raw.interest_rate,
      minAmount: raw.min_amount,
      maxAmount: raw.max_amount,
      minTermMonths: raw.min_term_months,
      maxTermMonths: raw.max_term_months,
      createdAt: raw.created_at,
    }));
  }

  async deleteById(id: number): Promise<void> {
    const request = pool.request();
    await request.query(`DELETE FROM credit_types WHERE id = ${id}`);
  }
}