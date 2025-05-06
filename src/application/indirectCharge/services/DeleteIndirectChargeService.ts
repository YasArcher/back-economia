import { SqlServerIndirectChargeRepository } from '../../../infrastructure/repositories/SqlServerIndirectChargeRepository';

export class DeleteIndirectChargeService {
  private readonly indirectChargeRepo = new SqlServerIndirectChargeRepository();

  async execute(id: number): Promise<void> {
    await this.indirectChargeRepo.deleteById(id);
  }
}
