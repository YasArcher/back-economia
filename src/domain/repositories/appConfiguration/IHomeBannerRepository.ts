// src/domain/repositories/appConfiguration/IHomeBannerRepository.ts

import { HomeBanner } from "../../models/appConfiguration/HomeBanner";

export interface IHomeBannerRepository {
  getAll(): Promise<HomeBanner[]>;     // Leer todos los banners
  update(banner: HomeBanner): Promise<void>; // Actualizar un banner
}
