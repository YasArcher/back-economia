import { pool } from "../../config/sqlServerClient";
import { IndirectCharge } from "../../domain/models/IndirectCharge";

export class SqlServerIndirectChargeRepository {
  async create(
    indirectCharge: Omit<IndirectCharge, "id" | "createdAt">
  ): Promise<void> {
    const request = pool.request();
    await request.query(`
      INSERT INTO indirect_charges (credit_type_id, name, charge_type, value)
      VALUES (${indirectCharge.creditTypeId}, '${indirectCharge.name}', '${indirectCharge.chargeType}', ${indirectCharge.value})
    `);
  }

  async update(indirectCharge: IndirectCharge): Promise<void> {
    const request = pool.request();
    await request.query(`
      UPDATE indirect_charges
      SET name = '${indirectCharge.name}', charge_type = '${indirectCharge.chargeType}', value = ${indirectCharge.value}
      WHERE id = ${indirectCharge.id}
    `);
  }

  async findById(id: number): Promise<IndirectCharge | null> {
    const request = pool.request();
    const result = await request.query(`
      SELECT * FROM indirect_charges WHERE id = ${id}
    `);

    if (result.recordset.length === 0) return null;

    const raw = result.recordset[0];
    return {
      id: raw.id,
      creditTypeId: raw.credit_type_id,
      name: raw.name,
      chargeType: raw.charge_type,
      value: raw.value,
      createdAt: raw.created_at,
    };
  }

  async findByCreditTypeId(creditTypeId: number): Promise<IndirectCharge[]> {
    const request = pool.request();
    const result = await request.query(`
      SELECT * FROM indirect_charges WHERE credit_type_id = ${creditTypeId}
    `);

    return result.recordset.map((raw) => ({
      id: raw.id,
      creditTypeId: raw.credit_type_id,
      name: raw.name,
      chargeType: raw.charge_type,
      value: raw.value,
      createdAt: raw.created_at,
    }));
  }

  async findAll(): Promise<IndirectCharge[]> {
    const request = pool.request();
    const result = await request.query(`SELECT * FROM indirect_charges`);

    return result.recordset.map((raw) => ({
      id: raw.id,
      creditTypeId: raw.credit_type_id,
      name: raw.name,
      chargeType: raw.charge_type,
      value: raw.value,
      createdAt: raw.created_at,
    }));
  }

  async deleteById(id: number): Promise<void> {
    const request = pool.request();
    await request.input("id", id).query(`
      DELETE FROM indirect_charges WHERE id = @id
    `);
  }
}
