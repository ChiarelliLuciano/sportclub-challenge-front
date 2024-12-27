import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getBenefits } from "../../services/api";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import BenefitCard from "../../components/BenefitCard";
import type { Benefit } from "../../types/types";

const Benefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const fetchBenefits = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const data = await getBenefits(page);
      setBenefits(data.body.beneficios);
      setTotalPages(data.body.totalPages);
      setError("");
    } catch (err: any) {
      setError(err.message || "Error fetching benefits");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBenefits(currentPage);
  }, [fetchBenefits, currentPage]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      navigate(`/beneficios?page=${page}`);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen min-w-full p-4">
      <Header />
      <div className="container mx-auto">
        <h1 className="text-xl uppercase font-bold mb-4">
          Beneficios para vos
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              id={benefit.id}
              comercio={benefit.comercio}
              descuento={benefit.descuento}
              imagen={benefit.Imagens?.[0]?.url || ""}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-10 gap-4">
          <button
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 rounded-full border ${
              currentPage <= 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-red-500 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            &larr; Anterior
          </button>

          <span className="text-sm font-medium text-gray-700">
            Página <span className="font-semibold">{currentPage}</span> de{" "}
            <span className="font-semibold">{totalPages}</span>
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 rounded-full border ${
              currentPage >= totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-red-500 hover:bg-red-100 hover:text-red-600"
            }`}
          >
            Siguiente &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
