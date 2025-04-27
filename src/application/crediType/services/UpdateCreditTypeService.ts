import { UpdateCreditTypeDTO } from '../dto/UpdateCreditTypeDTO';
import { SqlServerCreditTypeRepository } from '../../../infrastructure/repositories/SqlServerCreditTypeRepository';

export class UpdateCreditTypeService {
  private creditTypeRepo = new SqlServerCreditTypeRepository();

  async execute(dto: UpdateCreditTypeDTO): Promise<void> {
    const existing = await this.creditTypeRepo.findById(dto.id);
    if (!existing) {
      throw new Error('Credit Type not found');
    }

    const updated = {
      ...existing,
      ...dto,
    };

    await this.creditTypeRepo.update(updated);
  }
}
