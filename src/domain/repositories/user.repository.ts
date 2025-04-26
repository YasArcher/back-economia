export interface UserRepository {
    findAll(): Promise<any[]>;
  }
  