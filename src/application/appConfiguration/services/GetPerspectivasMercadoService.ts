import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetPerspectivasMercadoService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.perspectivaMercadoRepository.getAll();
  }
}
