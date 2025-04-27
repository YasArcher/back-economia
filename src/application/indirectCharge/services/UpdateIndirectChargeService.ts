import { UpdateIndirectChargeDTO } from '../dto/UpdateIndirectChargeDTO';
import { SqlServerIndirectChargeRepository } from '../../../infrastructure/repositories/SqlServerIndirectChargeRepository';

export class UpdateIndirectChargeService {
  private indirectChargeRepo = new SqlServerIndirectChargeRepository();

  async execute(dto: UpdateIndirectChargeDTO): Promise<void> {
    const existing = await this.indirectChargeRepo.findById(dto.id);
    if (!existing) {
      throw new Error('Indirect charge not found');
    }

    const updated = {
      ...existing,
      ...dto,
    };

    await this.indirectChargeRepo.update(updated);
  }
}
