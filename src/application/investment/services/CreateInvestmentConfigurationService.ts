import { Configuration } from '../../../domain/models/Configuration';
import { CreateConfigurationDTO } from '../dto/InvestmentRequestDTO';
import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class CreateInvestmentConfigurationService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(dto: CreateConfigurationDTO): Promise<Configuration> {
    const nuevaConfiguracion: Configuration = {
      id: 0, // o lo maneja la BD (auto-incremental)
      minAmount: dto.min_amount,
      maxAmount: dto.max_amount ,// Provide a default value for maxAmount
      minTermMonths: dto.min_term_months,
      maxTermMonths: dto.max_term_months ,
      interestRate: dto.interest_rate,
      createdAt: new Date(),
    };

    return await this.unitOfWork.investmentRepository.create(nuevaConfiguracion);
  }
}
