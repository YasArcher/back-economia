import { Transaction } from 'mssql';
import { pool } from '../../../config/sqlServerClient';
import { ConfiguracionGlobal } from '../../../domain/models/appConfiguration/ConfiguracionGlobal';

export class SqlServerConfiguracionGlobalRepository {
  private transaction: Transaction | null;

  constructor(transaction?: Transaction) {
    this.transaction = transaction ?? null;
  }

  private getRequest() {
    return this.transaction ? this.transaction.request() : pool.request();
  }

  async getAll(): Promise<ConfiguracionGlobal[]> {
    const request = this.getRequest();
    const result = await request.query(`
      SELECT 
        id,
        nombre_empresa,
        logo_url,
        texto_principal,
        texto_secundario,
        texto_terciario,
        background_white,
        background_gray,
        background_dark,
        text_light
      FROM ConfiguracionesGlobales
      ORDER BY id ASC
    `);

    return result.recordset.map((row: any) => ({
      id: row.id,
      nombreEmpresa: row.nombre_empresa,
      logoUrl: row.logo_url,
      textoPrincipal: row.texto_principal,
      textoSecundario: row.texto_secundario,
      textoTerciario: row.texto_terciario,
      backgroundWhite: row.background_white,
      backgroundGray: row.background_gray,
      backgroundDark: row.background_dark,
      textLight: row.text_light,
    }));
  }

  async update(config: ConfiguracionGlobal): Promise<void> {
    const request = this.getRequest();
    await request.query(`
      UPDATE ConfiguracionesGlobales
      SET
        nombre_empresa = '${config.nombreEmpresa}',
        texto_principal = '${config.textoPrincipal ?? ''}',
        texto_secundario = '${config.textoSecundario ?? ''}',
        texto_terciario = '${config.textoTerciario ?? ''}',
        background_white = '${config.backgroundWhite}',
        background_gray = '${config.backgroundGray}',
        background_dark = '${config.backgroundDark}',
        text_light = '${config.textLight}'
      WHERE id = ${config.id}
    `);
  }
}
