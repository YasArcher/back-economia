import { IUnitOfWork } from '../../../domain/unitOfWork/IUnitOfWork';
import { HomeBanner } from '../../../domain/models/appConfiguration/HomeBanner';

export class UpdateHomeBannerService {
  constructor(private readonly unitOfWork: IUnitOfWork) {}

  async execute(banner: HomeBanner): Promise<void> {
    await this.unitOfWork.start();
    try {
      await this.unitOfWork.homeBannerRepository.update(banner);
      await this.unitOfWork.complete();
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    }
  }
}
