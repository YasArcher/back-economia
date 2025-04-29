import { IUserRepository } from '../repositories/IUserRepository';
import { IUserRoleRepository } from '../repositories/IUserRoleRepository';
import { ISessionRepository } from '../repositories/ISessionRepository';

import { IConfiguracionGlobalRepository } from '../repositories/appConfiguration/IConfiguracionGlobalRepository';
import { IHomeBannerRepository } from '../repositories/appConfiguration/IHomeBannerRepository';
import { IHomeServicioRepository } from '../repositories/appConfiguration/IHomeServicioRepository';
import { IHomeTestimonioRepository } from '../repositories/appConfiguration/IHomeTestimonioRepository';
import { IHomeContactoRepository } from '../repositories/appConfiguration/IHomeContactoRepository';
import { IInformeEconomicoRepository } from '../repositories/appConfiguration/IInformeEconomicoRepository';
import { IPerspectivaMercadoRepository } from '../repositories/appConfiguration/IPerspectivaMercadoRepository';
import { IHomeQuienesSomosRepository } from '../repositories/appConfiguration/IHomeQuienesSomosRepository';

export interface IUnitOfWork {
  // Repositorios de usuarios y sesiones
  userRepository: IUserRepository;
  userRoleRepository: IUserRoleRepository;
  sessionRepository: ISessionRepository;

  // Repositorios configuraciond el mercado 
  configuracionGlobalRepository: IConfiguracionGlobalRepository;
  homeBannerRepository: IHomeBannerRepository;
  homeServicioRepository: IHomeServicioRepository;
  homeTestimonioRepository: IHomeTestimonioRepository;
  homeContactoRepository: IHomeContactoRepository;
  informeEconomicoRepository: IInformeEconomicoRepository;
  perspectivaMercadoRepository: IPerspectivaMercadoRepository;
  quienesSomosRepository: IHomeQuienesSomosRepository;

  // Métodos de manejo de transacciones
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
}
