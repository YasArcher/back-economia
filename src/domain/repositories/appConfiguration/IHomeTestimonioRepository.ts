import { HomeTestimonio } from "../../models/appConfiguration/HomeTestimonio";

export interface IHomeTestimonioRepository {
  getAll(): Promise<HomeTestimonio[]>;
  update(testimonio: HomeTestimonio): Promise<void>;
}
