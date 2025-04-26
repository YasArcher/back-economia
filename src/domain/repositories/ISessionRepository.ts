import { CreateSessionDTO } from '../../application/session/dto/CreateSessionDTO';
import { Session } from '../models/Session';

export interface ISessionRepository {
  create(sessionData: CreateSessionDTO): Promise<void>;
  findByToken(token: string): Promise<Session | null>; // extra para validaciones futuras
  deleteByToken(token: string): Promise<void>;
}
