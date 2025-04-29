import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { HomeTestimonio } from '../../../domain/models/appConfiguration/HomeTestimonio';

export class UpdateHomeTestimonioService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(testimonio: HomeTestimonio): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.homeTestimonioRepository.update(testimonio);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
