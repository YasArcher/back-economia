import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { HomeTestimonio } from '../../../domain/models/appConfiguration/HomeTestimonio';

export class SqlServerHomeTestimonioRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  private getRequest() {
    return this.transaction ? this.transaction.request() : pool.request();
  }

  async getAll(): Promise<HomeTestimonio[]> {
    const request = this.getRequest();
    const result = await request.query(`
      SELECT id, nombre_cliente, cargo, empresa, comentario, calificacion
      FROM HomeTestimonios
      ORDER BY id ASC
    `);

    return result.recordset.map((row: any) => ({
      id: row.id,
      nombreCliente: row.nombre_cliente,
      cargo: row.cargo,
      empresa: row.empresa,
      comentario: row.comentario,
      calificacion: row.calificacion,
    }));
  }

  async update(testimonio: HomeTestimonio): Promise<void> {
    const request = this.getRequest();
    await request.query(`
      UPDATE HomeTestimonios
      SET
        nombre_cliente = '${testimonio.nombreCliente}',
        cargo = '${testimonio.cargo}',
        empresa = '${testimonio.empresa}',
        comentario = '${testimonio.comentario}',
        calificacion = ${testimonio.calificacion}
      WHERE id = ${testimonio.id}
    `);
  }
}
