import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { HomeContacto } from '../../../domain/models/appConfiguration/HomeContacto';

export class UpdateHomeContactoService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(contacto: HomeContacto): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.homeContactoRepository.update(contacto);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
