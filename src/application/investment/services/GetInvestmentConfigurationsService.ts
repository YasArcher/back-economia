import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetInvestmentConfigurationsService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.investmentRepository.getAll();
  }
}
