export type Dium = {
  id: number;
  lunes: boolean;
  martes: boolean;
  miercoles: boolean;
  jueves: boolean;
  viernes: boolean;
  sabado: boolean;
  domingo: boolean;
  feriados: boolean;
  BeneficioId: number;
};

export type Benefit = {
  id: number;
  comercio: string;
  descuento: number;
  descripcion: string;
  CategoriaGeneral?: {
    nombre: string;
  };
  Dium?: Dium;
  aclaratoria?: string;
  vencimiento: string;
  Imagens?: { url: string }[];
};

export type Suggestion = {
  id: number;
  comercio: string;
  descuento: number;
  Imagens: { url: string }[];
};
