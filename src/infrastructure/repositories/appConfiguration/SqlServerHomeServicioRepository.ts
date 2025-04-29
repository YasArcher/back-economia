import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { HomeServicio } from '../../../domain/models/appConfiguration/HomeServicio';

export class SqlServerHomeServicioRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  private getRequest() {
    return this.transaction ? this.transaction.request() : pool.request();
  }

  async getAll(): Promise<HomeServicio[]> {
    const request = this.getRequest();
    const result = await request.query(`
      SELECT id, titulo, descripcion, imagen_url, link
      FROM HomeServicios
      ORDER BY id ASC
    `);

    return result.recordset.map((row: any) => ({
      id: row.id,
      titulo: row.titulo,
      descripcion: row.descripcion,
      imagenUrl: row.imagen_url,
      link: row.link ?? undefined,
    }));
  }

  async update(servicio: HomeServicio): Promise<void> {
    const request = this.getRequest();
    await request.query(`
      UPDATE HomeServicios
      SET
        titulo = '${servicio.titulo}',
        descripcion = '${servicio.descripcion}',
        imagen_url = '${servicio.imagenUrl}',
        link = ${servicio.link ? `'${servicio.link}'` : 'NULL'}
      WHERE id = ${servicio.id}
    `);
  }
}
