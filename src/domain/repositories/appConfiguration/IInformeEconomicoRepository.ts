// src/domain/interfaces/repositories/appConfiguration/IInformeEconomicoRepository.ts

import { MenuItem } from "../../models/appConfiguration/InformeEconomico";

export interface IInformeEconomicoRepository {
  getAll(): Promise<MenuItem[]>;
  update(id: number, informe: MenuItem): Promise<void>;
}
