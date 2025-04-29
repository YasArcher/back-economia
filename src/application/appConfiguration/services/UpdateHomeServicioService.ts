import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { HomeServicio } from '../../../domain/models/appConfiguration/HomeServicio';

export class UpdateHomeServicioService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(servicio: HomeServicio): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.homeServicioRepository.update(servicio);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
