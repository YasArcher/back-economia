import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { ConfiguracionGlobal } from '../../../domain/models/appConfiguration/ConfiguracionGlobal';

export class UpdateConfiguracionGlobalService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(config: ConfiguracionGlobal): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.configuracionGlobalRepository.update(config);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
