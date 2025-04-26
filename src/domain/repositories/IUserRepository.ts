import { User } from "../models/User";
export interface IUserRepository {
    create(user: { name: string; email: string }): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
  }