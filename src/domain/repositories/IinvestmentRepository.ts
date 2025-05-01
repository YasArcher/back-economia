import { Configuration } from '../models/Configuration';

export interface IinvestmentRepository {
  getAll(): Promise<Configuration[]>;                         // Leer todos
  getById(id: number): Promise<Configuration | null>;         // Leer por ID
  create(config: Configuration): Promise<Configuration>; // Crear nuevo
  update(config: Configuration): Promise<void>;               // Actualizar existente
  delete(id: number): Promise<void>;                                // Borrar por ID
}
