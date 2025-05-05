import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/models/User';
import { Transaction } from 'mssql';
import { UserMapper } from '../mappers/UserMapper';

export class SqlServerUserRepository implements IUserRepository {
  constructor(private readonly transaction: Transaction) {}

  async create(user: { name: string; email: string; password_hash: string }): Promise<User> {
    const request = this.transaction.request();
    const result = await request.query(`
      INSERT INTO users (name, email, password_hash)
      OUTPUT inserted.id, inserted.name, inserted.email, inserted.password_hash
      VALUES ('${user.name}', '${user.email}', '${user.password_hash}')
    `);

    const raw = result.recordset[0];
    return UserMapper.toDomain(raw);
  }

  async findByEmail(email: string): Promise<User | null> {
    const request = this.transaction.request();
    const result = await request.query(`
SELECT 
  u.id, 
  u.name, 
  u.email, 
  u.password_hash, 
  rl.name AS role
FROM users u
LEFT JOIN user_roles ur ON ur.user_id = u.id
LEFT JOIN roles rl ON ur.role_id = rl.id
WHERE u.email = '${email}'

    `);

    if (result.recordset.length === 0) {
      return null;
    }

    const raw = result.recordset[0];
    return UserMapper.toDomain(raw);
  }
}
