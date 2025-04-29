// application/appConfiguration/services/UpdateHomeQuienesSomosService.ts
import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { HomeQuienesSomos } from '../../../domain/models/appConfiguration/HomeQuienesSomos';

export class UpdateHomeQuienesSomosService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(info: HomeQuienesSomos): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.quienesSomosRepository.update(info);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
