import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBenefit } from "../../services/api";
import { getAvailableDays } from "../../utils/dateHelpers";
import {
  isFavorite,
  addFavorite,
  removeFavorite,
} from "../../utils/favoritesHelpers";
import Header from "../../components/Header";

const SingleBenefit = () => {
  const { id } = useParams<{ id: string }>();
  const [benefit, setBenefit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);

  const availableDays = benefit?.Dium ? getAvailableDays(benefit.Dium) : [];

  useEffect(() => {
    if (id) {
      setFavorite(isFavorite(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    if (!id) return;

    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    const fetchBenefit = async () => {
      if (!id) {
        return;
      }
      try {
        const data = await getSingleBenefit(id);
        setBenefit(data.body);
      } catch (err: any) {
        setError(err.message || "Error fetching benefit");
      } finally {
        setLoading(false);
      }
    };

    fetchBenefit();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen min-w-full p-4">
      <Header />
      <div className="container mx-auto relative">
        {benefit ? (
          <div className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-lg p-6 mt-10 relative">
            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 px-3 py-2 rounded-full shadow ${
                favorite
                  ? "bg-yellow-400 text-black font-bold"
                  : "bg-red-400 text-white font-bold"
              } hover:shadow-lg`}
              title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {favorite ? "Favorito" : "Agregar a Favoritos +"}
            </button>

            <div className="flex-shrink-0">
              <img
                src={
                  benefit.Imagens?.[0]?.url || "https://via.placeholder.com/300"
                }
                alt={`Imagen de ${benefit.comercio}`}
                className="h-64 w-64 object-contain rounded-md"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h2 className="text-3xl font-bold mb-4">
                {benefit.descuento}% de descuento en {benefit.comercio}
              </h2>
              <p className="text-xl mb-4">{benefit.descripcion}</p>
              <p className="text-base">
                Categoría:{" "}
                <span className="font-semibold">
                  {benefit.CategoriaGeneral?.nombre}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Información adicional:{" "}
                <span className="font-semibold">
                  {benefit.aclaratoria || "N/A"}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Días disponibles:{" "}
                <span className="font-semibold">
                  {availableDays.length > 0
                    ? availableDays.join(", ")
                    : "No especificado"}
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                Válido hasta:{" "}
                <span className="font-semibold">
                  {new Date(benefit.vencimiento).toLocaleDateString("es-ES")}
                </span>
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Beneficio no encontrado</p>
        )}
      </div>
    </div>
  );
};

export default SingleBenefit;
