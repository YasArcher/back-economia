import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { MenuItem} from '../../../domain/models/appConfiguration/InformeEconomico';

export class SqlServerInformeEconomicoRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  private getRequest() {
    return this.transaction ? this.transaction.request() : pool.request();
  }

  async getAll(): Promise<MenuItem[]> {
    const request = this.getRequest();
    const result = await request.query(`
      SELECT id, parent_id, label, path, category, orden
      FROM MenuItems
      ORDER BY orden ASC
    `);

    return result.recordset.map((row: any) => ({
      id: row.id,
      parent_id: row.parent_id,
      label: row.label,
      path: row.path,
      category: row.category,
      orden: row.orden,
    }));
  }

  async update(id: number, item: MenuItem): Promise<void> {
    const request = this.getRequest();
    await request.query(`
      UPDATE MenuItems SET
        parent_id = ${item.parent_id ?? 'NULL'},
        label = '${item.label}',
        path = '${item.path}',
        category = ${item.category ? `'${item.category}'` : 'NULL'},
        orden = ${item.orden}
      WHERE id = ${id}
    `);
  }
}