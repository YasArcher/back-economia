import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { Configuration } from '../../../domain/models/Configuration';

export class UpdateInvestmentConfigurationService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: Configuration) {
    await this.unitOfWork.investmentRepository.update(data);
  }
}
