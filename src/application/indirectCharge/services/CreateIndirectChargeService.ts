import { CreateIndirectChargeDTO } from '../dto/CreateIndirectChargeDTO';
import { SqlServerIndirectChargeRepository } from '../../../infrastructure/repositories/SqlServerIndirectChargeRepository';

export class CreateIndirectChargeService {
  private indirectChargeRepo = new SqlServerIndirectChargeRepository();

  async execute(dto: CreateIndirectChargeDTO): Promise<void> {
    await this.indirectChargeRepo.create(dto);
  }
}
