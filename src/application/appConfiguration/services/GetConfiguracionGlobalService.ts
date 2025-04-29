import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetConfiguracionGlobalService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.configuracionGlobalRepository.getAll();
  }
}
