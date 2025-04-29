// src/domain/interfaces/repositories/appConfiguration/IPerspectivaMercadoRepository.ts

import { PerspectivaMercado } from "../../models/appConfiguration/PerspectivaMercado";

export interface IPerspectivaMercadoRepository {
  getAll(): Promise<PerspectivaMercado[]>;
  update(id: number, perspectiva: PerspectivaMercado): Promise<void>;
}
