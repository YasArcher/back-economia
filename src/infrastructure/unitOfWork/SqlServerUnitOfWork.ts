import { IUnitOfWork } from '../../domain/unitOfWork/IUnitOfWork';
import { SqlServerUserRepository } from '../repositories/SqlServerUserRepository';
import { SqlServerUserRoleRepository } from '../repositories/SqlServerUserRoleRepository';
import { SqlServerSessionRepository } from '../repositories/SqlServerSessionRepository';
import { SqlServerInvestmentRepository } from '../repositories/SqlServerInvestmentRepository';

import { SqlServerConfiguracionGlobalRepository } from '../repositories/appConfiguration/SqlServerConfiguracionGlobalRepository';
import { SqlServerHomeBannerRepository } from '../repositories/appConfiguration/SqlServerHomeBannerRepository';
import { SqlServerHomeContactoRepository } from '../repositories/appConfiguration/SqlServerHomeContactoRepository';
import { SqlServerHomeServicioRepository } from '../repositories/appConfiguration/SqlServerHomeServicioRepository';
import { SqlServerHomeTestimonioRepository } from '../repositories/appConfiguration/SqlServerHomeTestimonioRepository';
import { SqlServerInformeEconomicoRepository } from '../repositories/appConfiguration/SqlServerInformeEconomicoRepository';
import { SqlServerPerspectivaMercadoRepository } from '../repositories/appConfiguration/SqlServerPerspectivaMercadoRepository';

import { pool } from '../../config/sqlServerClient';
import { Transaction } from 'mssql';
import { SqlServerHomeQuienesSomosRepository } from '../repositories/appConfiguration/SqlServerHomeQuienesSomosRepository';

export class SqlServerUnitOfWork implements IUnitOfWork {
  public userRepository: SqlServerUserRepository;
  public userRoleRepository: SqlServerUserRoleRepository;
  public sessionRepository: SqlServerSessionRepository;
  public configuracionGlobalRepository: SqlServerConfiguracionGlobalRepository;
  public homeBannerRepository: SqlServerHomeBannerRepository;
  public homeServicioRepository: SqlServerHomeServicioRepository;
  public homeTestimonioRepository: SqlServerHomeTestimonioRepository;
  public homeContactoRepository: SqlServerHomeContactoRepository;
  public informeEconomicoRepository: SqlServerInformeEconomicoRepository;
  public perspectivaMercadoRepository: SqlServerPerspectivaMercadoRepository;
  public quienesSomosRepository: SqlServerHomeQuienesSomosRepository
  public investmentRepository: SqlServerInvestmentRepository;

  private transaction: Transaction;

  constructor() {
    this.transaction = new Transaction(pool);

    this.userRepository = new SqlServerUserRepository(this.transaction);
    this.userRoleRepository = new SqlServerUserRoleRepository(this.transaction);
    this.sessionRepository = new SqlServerSessionRepository(this.transaction);

    this.configuracionGlobalRepository = new SqlServerConfiguracionGlobalRepository(this.transaction);
    this.homeBannerRepository = new SqlServerHomeBannerRepository(this.transaction);
    this.homeServicioRepository = new SqlServerHomeServicioRepository(this.transaction);
    this.homeTestimonioRepository = new SqlServerHomeTestimonioRepository(this.transaction);
    this.homeContactoRepository = new SqlServerHomeContactoRepository(this.transaction);
    this.informeEconomicoRepository = new SqlServerInformeEconomicoRepository(this.transaction);
    this.perspectivaMercadoRepository = new SqlServerPerspectivaMercadoRepository(this.transaction);
    this.quienesSomosRepository = new SqlServerHomeQuienesSomosRepository(this.transaction);
    this.investmentRepository = new SqlServerInvestmentRepository(this.transaction);

  }

  async start(): Promise<void> {
    await this.transaction.begin();
  }

  async complete(): Promise<void> {
    await this.transaction.commit();
  }

  async rollback(): Promise<void> {
    await this.transaction.rollback();
  }
}
