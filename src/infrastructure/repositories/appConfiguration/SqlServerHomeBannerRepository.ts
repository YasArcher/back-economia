import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { HomeBanner } from '../../../domain/models/appConfiguration/HomeBanner';

export class SqlServerHomeBannerRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  async getAll(): Promise<HomeBanner[]> {
    const request = this.transaction ? this.transaction.request() : pool.request();
    const result = await request.query(`
      SELECT id, titulo, subtitulo, imagen_url
      FROM HomeBanner
      ORDER BY id ASC
    `);

    return result.recordset.map((row: any) => ({
      id: row.id,
      titulo: row.titulo,
      subtitulo: row.subtitulo,
      imagenUrl: row.imagen_url,
    }));
  }

  async update(banner: HomeBanner): Promise<void> {
    const request = this.transaction ? this.transaction.request() : pool.request();
    await request.query(`
      UPDATE HomeBanner
      SET
        titulo = '${banner.titulo}',
        subtitulo = '${banner.subtitulo}',
        imagen_url = '${banner.imagenUrl}'
      WHERE id = ${banner.id}
    `);
  }
}
