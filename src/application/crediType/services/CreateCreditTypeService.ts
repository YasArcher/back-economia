import { CreateCreditTypeDTO } from '../dto/CreateCreditTypeDTO';
import { SqlServerCreditTypeRepository } from '../../../infrastructure/repositories/SqlServerCreditTypeRepository';

export class CreateCreditTypeService {
  private creditTypeRepo = new SqlServerCreditTypeRepository();

  async execute(dto: CreateCreditTypeDTO): Promise<void> {
    await this.creditTypeRepo.create(dto);
  }
}
