import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class DeleteInvestmentConfigurationService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(id: number) {
    await this.unitOfWork.investmentRepository.delete(id);
  }
}
