import { IUserRepository } from '../repositories/IUserRepository';
import { IUserRoleRepository } from '../repositories/IUserRoleRepository';
import { ISessionRepository } from '../repositories/ISessionRepository';

export interface IUnitOfWork {
  userRepository: IUserRepository;
  userRoleRepository: IUserRoleRepository;
  sessionRepository: ISessionRepository;
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
}
