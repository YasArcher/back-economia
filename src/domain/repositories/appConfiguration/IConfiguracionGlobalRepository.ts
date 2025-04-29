import { ConfiguracionGlobal } from '../../models/appConfiguration/ConfiguracionGlobal';

export interface IConfiguracionGlobalRepository {
  getAll(): Promise<ConfiguracionGlobal[]>;  // Solo leer todos
  update(config: ConfiguracionGlobal): Promise<void>; // Solo actualizar
}