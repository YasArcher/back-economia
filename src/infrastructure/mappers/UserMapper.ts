import { User } from '../../domain/models/User';

export class UserMapper {
  static toDomain(raw: any): User {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      password_hash: raw.password_hash,
    };
  }
}
