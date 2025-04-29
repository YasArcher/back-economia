import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetHomeServiciosService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.homeServicioRepository.getAll();
  }
}
