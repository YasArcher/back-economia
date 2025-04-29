import { HomeContacto } from "../../models/appConfiguration//HomeContacto";

export interface IHomeContactoRepository {
  get(): Promise<HomeContacto | null>;
  update(contacto: HomeContacto): Promise<void>;
}
