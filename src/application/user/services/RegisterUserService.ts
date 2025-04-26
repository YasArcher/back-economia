import { CreateUserDTO } from '../dto/CreateUserDTO';
import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { User } from '../../../domain/models/User';

export class RegisterUserService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(dto: CreateUserDTO): Promise<void> {
    await this.unitOfWork.start();
    try {
      const userToSave: User = {
        name: dto.name,
        email: dto.email,
        password_hash: dto.password,
      };

      const user = await this.unitOfWork.userRepository.create(userToSave);

      await this.unitOfWork.userRoleRepository.assignRole(user.id!, dto.roleId);

      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
