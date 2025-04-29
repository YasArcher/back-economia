// application/appConfiguration/services/GetHomeQuienesSomosService.ts
import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetHomeQuienesSomosService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.quienesSomosRepository.getAll();
  }
}
