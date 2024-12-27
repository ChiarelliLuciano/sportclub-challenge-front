import type { Dium } from "../types/types";

export const getAvailableDays = (dium: Dium): string[] => {
  const days = {
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado",
    domingo: "Domingo",
    feriados: "Feriados",
  };

  return Object.entries(days)
    .filter(([key]) => dium[key as keyof Dium])
    .map(([, value]) => value);
};
