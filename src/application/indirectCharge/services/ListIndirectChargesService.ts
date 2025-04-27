import { SqlServerIndirectChargeRepository } from '../../../infrastructure/repositories/SqlServerIndirectChargeRepository';
import { IndirectCharge } from '../../../domain/models/IndirectCharge';

export class ListIndirectChargesService {
  private indirectChargeRepo = new SqlServerIndirectChargeRepository();

  async execute(): Promise<IndirectCharge[]> {
    return await this.indirectChargeRepo.findAll();
  }
}
