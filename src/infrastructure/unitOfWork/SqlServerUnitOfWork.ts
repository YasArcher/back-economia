import { IUnitOfWork } from '../../domain/unitOfWork/IUnitOfWork';
import { SqlServerUserRepository } from '../repositories/SqlServerUserRepository';
import { SqlServerUserRoleRepository } from '../repositories/SqlServerUserRoleRepository';
import { SqlServerSessionRepository } from '../repositories/SqlServerSessionRepository';
import { pool } from '../../config/sqlServerClient';
import { Transaction } from 'mssql';

export class SqlServerUnitOfWork implements IUnitOfWork {
  public userRepository: SqlServerUserRepository;
  public userRoleRepository: SqlServerUserRoleRepository;
  public sessionRepository: SqlServerSessionRepository;
  private transaction: Transaction;

  constructor() {
    this.transaction = new Transaction(pool);
    this.userRepository = new SqlServerUserRepository(this.transaction);
    this.userRoleRepository = new SqlServerUserRoleRepository(this.transaction);
    this.sessionRepository = new SqlServerSessionRepository(this.transaction);
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