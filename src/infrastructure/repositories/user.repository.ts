import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl implements UserRepository {
  async findAll() {
    return [{ id: 1, name: "John Doe" }];
  }
}
