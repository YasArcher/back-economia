import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { Configuration } from '../../../domain/models/Configuration';

export class CreateInvestmentConfigurationService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(data: Configuration) {
    return await this.unitOfWork.investmentRepository.create(data);
  }
}
