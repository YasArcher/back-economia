import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetHomeContactoService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.homeContactoRepository.get();
  }
}
