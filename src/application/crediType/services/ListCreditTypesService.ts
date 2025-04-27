import { SqlServerCreditTypeRepository } from '../../../infrastructure/repositories/SqlServerCreditTypeRepository';
import { CreditType } from '../../../domain/models/CreditType';

export class ListCreditTypesService {
  private creditTypeRepo = new SqlServerCreditTypeRepository();

  async execute(): Promise<CreditType[]> {
    return await this.creditTypeRepo.findAll();
  }
}
