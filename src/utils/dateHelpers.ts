export const getAvailableDays = (dium: Record<string, boolean>): string[] => {
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
    .filter(([key]) => dium[key])
    .map(([, value]) => value);
};
