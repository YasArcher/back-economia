import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { HomeContacto } from '../../../domain/models/appConfiguration/HomeContacto';

export class SqlServerHomeContactoRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  async get(): Promise<HomeContacto | null> {
    const request = this.transaction ? this.transaction.request() : pool.request();
    const result = await request.query(`
      SELECT TOP 1 id, telefono, email, direccion
      FROM HomeContacto
      ORDER BY id ASC
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    const row = result.recordset[0];
    return {
      id: row.id,
      telefono: row.telefono,
      email: row.email,
      direccion: row.direccion,
    };
  }

  async update(contacto: HomeContacto): Promise<void> {
    const request = this.transaction ? this.transaction.request() : pool.request();
    await request.query(`
      UPDATE HomeContacto
      SET
        telefono = '${contacto.telefono}',
        email = '${contacto.email}',
        direccion = '${contacto.direccion}'
      WHERE id = ${contacto.id}
    `);
  }
}
