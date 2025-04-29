import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetInformesEconomicosService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.informeEconomicoRepository.getAll();
  }
}
