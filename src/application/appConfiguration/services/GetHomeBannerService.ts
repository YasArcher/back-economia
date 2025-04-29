import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';

export class GetHomeBannerService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute() {
    return await this.unitOfWork.homeBannerRepository.getAll();
  }
}
