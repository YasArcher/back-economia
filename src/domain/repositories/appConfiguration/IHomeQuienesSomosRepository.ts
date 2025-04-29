// repositories/appConfiguration/IHomeQuienesSomosRepository.ts
import { HomeQuienesSomos } from '../../models/appConfiguration/HomeQuienesSomos';

export interface IHomeQuienesSomosRepository {
  getAll(): Promise<HomeQuienesSomos[]>;        // Obtener todos (si hay varios)
  update(info: HomeQuienesSomos): Promise<void>; // Actualizar
}
