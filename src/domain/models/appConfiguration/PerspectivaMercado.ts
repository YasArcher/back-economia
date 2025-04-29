export interface PerspectivaMercado {
    id: number;
    seccionTipo: string; // "global", "sector", "proyeccion", "pais"
    titulo: string;
    descripcion: string;
    anio  ?: number;
  }
  