import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetHomeTestimoniosService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.homeTestimonioRepository.getAll();
  }
}
