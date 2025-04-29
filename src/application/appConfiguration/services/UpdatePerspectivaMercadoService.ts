import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { PerspectivaMercado } from '../../../domain/models/appConfiguration/PerspectivaMercado';

export class UpdatePerspectivaMercadoService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(id: number, perspectiva: PerspectivaMercado): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.perspectivaMercadoRepository.update(id, perspectiva);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
