import { ISessionRepository } from '../../domain/repositories/ISessionRepository';
import { CreateSessionDTO } from '../../application/session/dto/CreateSessionDTO';
import { Session } from '../../domain/models/Session';
import { Transaction } from 'mssql';

export class SqlServerSessionRepository implements ISessionRepository {
  constructor(private readonly transaction: Transaction) {}

  async create(sessionData: CreateSessionDTO): Promise<void> {
    const request = this.transaction.request();
    await request.query(`
      INSERT INTO sessions (user_id, token, ip_address, user_agent, expires_at)
      VALUES (
        ${sessionData.userId},
        '${sessionData.token}',
        '${sessionData.ipAddress}',
        '${sessionData.userAgent}',
        '${sessionData.expiresAt.toISOString()}'
      )
    `);
  }

  async findByToken(token: string): Promise<Session | null> {
    const request = this.transaction.request();
    const result = await request.query(`
      SELECT id, user_id, token, ip_address, user_agent, created_at, expires_at
      FROM sessions
      WHERE token = '${token}'
    `);

    if (result.recordset.length === 0) {
      return null;
    }

    const row = result.recordset[0];
    return {
      id: row.id,
      userId: row.user_id,
      token: row.token,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      createdAt: row.created_at,
      expiresAt: row.expires_at
    };
  }
  async deleteByToken(token: string): Promise<void> {
    const request = this.transaction.request();
    await request.query(`
      DELETE FROM sessions
      WHERE token = '${token}'
    `);
  }
  
}
