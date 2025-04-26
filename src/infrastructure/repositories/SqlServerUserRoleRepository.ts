import { IUserRoleRepository } from '../../domain/repositories/IUserRoleRepository';
import { Transaction } from 'mssql';

export class SqlServerUserRoleRepository implements IUserRoleRepository {
  constructor(private readonly transaction: Transaction) {}

  async assignRole(userId: number, roleId: number): Promise<void> {
    const request = this.transaction.request();
    await request.query(`
      INSERT INTO user_roles (user_id, role_id)
      VALUES (${userId}, ${roleId})
    `);
  }
}