import React from "react";
import logo from "../assets/logo.png";

type BenefitCardProps = {
  id: number;
  comercio: string;
  descuento: number;
  imagen: string;
};

const BenefitCard: React.FC<BenefitCardProps> = ({
  id,
  comercio,
  descuento,
  imagen,
}) => {
  return (
    <a
      href={`/beneficio/${id}`}
      className="flex max-h-fit min-h-[260px] w-[calc(50%-12px)] min-w-[150px] flex-col items-center rounded-[2px] bg-white md:h-full md:max-h-[340px] md:min-h-[340px] md:min-w-[248px]"
    >
      <img
        alt={`Logo de ${comercio}`}
        className="h-full max-h-[240px] w-full max-w-[240px] rounded object-contain px-[10px] pt-[10px] md:mx-0 md:w-full md:px-0"
        src={imagen || logo}
      />
      <div className="flex h-full w-full flex-col justify-center gap-2 p-[10px] md:flex-row md:items-center md:justify-start md:px-4">
        <h2 className="w-full gap-2 text-center text-xl font-bold uppercase md:flex md:h-1/2 md:w-[84px] md:min-w-16 md:items-center md:text-[32px]">
          {descuento}%
        </h2>
        <div className="h-[2px] w-full rounded-full bg-gray-300 md:h-8 md:w-[2px] md:min-w-[2px]"></div>
        <h2 className="w-full text-base font-bold uppercase lg:text-lg">
          {comercio}
        </h2>
      </div>
    </a>
  );
};

export default BenefitCard;
