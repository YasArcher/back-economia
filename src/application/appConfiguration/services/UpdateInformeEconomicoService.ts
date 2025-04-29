import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { InformeEconomico } from '../../../domain/models/appConfiguration/InformeEconomico';

export class UpdateInformeEconomicoService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(id: number, informe: InformeEconomico): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.informeEconomicoRepository.update(id, informe);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
