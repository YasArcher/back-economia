import { HomeServicio } from "../../models/appConfiguration/HomeServicio";

export interface IHomeServicioRepository {
  getAll(): Promise<HomeServicio[]>;
  update(servicio: HomeServicio): Promise<void>;
}
