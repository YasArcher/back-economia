import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { PerspectivaMercado } from '../../../domain/models/appConfiguration/PerspectivaMercado';

export class SqlServerPerspectivaMercadoRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  private getRequest() {
    return this.transaction ? this.transaction.request() : pool.request();
  }

  async getAll(): Promise<PerspectivaMercado[]> {
    const request = this.getRequest();
    const result = await request.query(`
      SELECT id, seccion_tipo, titulo, descripcion, anio
      FROM PerspectivasMercado
      ORDER BY id ASC
    `);

    return result.recordset.map((row) => ({
      id: row.id,
      seccionTipo: row.seccion_tipo,
      titulo: row.titulo,
      descripcion: row.descripcion,
      anio: row.anio,
    }));
  }

  async create(perspectiva: PerspectivaMercado): Promise<void> {
    const request = this.getRequest();
    await request.query(`
      INSERT INTO PerspectivasMercado (seccion_tipo, titulo, descripcion)
      VALUES ('${perspectiva.seccionTipo}', '${perspectiva.titulo}', '${perspectiva.descripcion}')
    `);
  }

  async update(id: number, perspectiva: PerspectivaMercado): Promise<void> {
    const request = this.getRequest();
    await request.query(`
      UPDATE PerspectivasMercado
      SET 
        seccion_tipo = '${perspectiva.seccionTipo}',
        titulo = '${perspectiva.titulo}',
        descripcion = '${perspectiva.descripcion}',
         anio= ${perspectiva.anio}
      WHERE id = ${id}
    `);
  }
}
