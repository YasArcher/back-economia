import { UserRepositoryImpl } from '../infrastructure/repositories/user.repository';

const userRepository = new UserRepositoryImpl();

export const getUsersUseCase = {
  execute: async () => {
    return userRepository.findAll();
  }
};
