import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { HomeQuienesSomos } from '../../../domain/models/appConfiguration/HomeQuienesSomos';

export class SqlServerHomeQuienesSomosRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  async getAll(): Promise<HomeQuienesSomos[]> {
    const request = this.transaction ? this.transaction.request() : pool.request();
    const result = await request.query(`
      SELECT id, titulo, descripcion_1, descripcion_2, imagen_url
      FROM about_us
      ORDER BY id ASC
    `);

    return result.recordset.map((row: any) => ({
      id: row.id,
      titulo: row.titulo,
      descripcion_1: row.descripcion_1,
      descripcion_2: row.descripcion_2,
      imagen_url: row.imagen_url,
    }));
  }

  async update(info: HomeQuienesSomos): Promise<void> {
    const request = this.transaction ? this.transaction.request() : pool.request();
    await request.query(`
      UPDATE about_us
      SET
        titulo = '${info.titulo}',
        descripcion_1 = '${info.descripcion_1}',
        descripcion_2 = ${info.descripcion_2 ? `'${info.descripcion_2}'` : 'NULL'},
        imagen_url = '${info.imagen_url}'
      WHERE id = ${info.id}
    `);
  }
}
