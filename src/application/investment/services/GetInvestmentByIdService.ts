import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetInvestmentByIdService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(id: number) {
    return await this.unitOfWork.investmentRepository.getById(id);
  }
}
