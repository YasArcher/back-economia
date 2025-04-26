import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class LogoutUserService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(token: string): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.sessionRepository.deleteByToken(token);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
