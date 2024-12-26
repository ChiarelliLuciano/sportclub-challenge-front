import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="relative flex justify-center items-center self-center min-h-[80vh]">
        <div className="bg-white blur-2xl w-72 h-72 sm:w-96 sm:h-96 rounded-full relative z-0" />
        <div className="absolute flex justify-center items-center bg-black w-60 h-60 sm:w-80 sm:h-80 rounded-full z-10">
          <p className="text-[80px] sm:text-[120px] text-white font-black">
            404
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-[30px] sm:text-[50px]">Página no encontrada!</p>
        <p className="text-[20px] sm:text-[30px]">
          Volver{" "}
          <span className="text-primary300 font-black">
            <Link to="/beneficios">atrás</Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default NotFound;
