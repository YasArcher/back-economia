import { SqlServerCreditTypeRepository } from '../../../infrastructure/repositories/SqlServerCreditTypeRepository';

export class DeleteCreditTypeService {
  private readonly creditTypeRepo = new SqlServerCreditTypeRepository();

  async execute(id: number): Promise<void> {
    await this.creditTypeRepo.deleteById(id);
  }
}
