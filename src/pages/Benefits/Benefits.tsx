import { useEffect, useState } from "react";
import { getBenefits } from "../../services/api";
import Header from "../../components/Header";
import BenefitCard from "../../components/BenefitCard";

type Benefit = {
  id: number;
  comercio: string;
  descripcion: string;
  descuento: number;
  Imagens: { url: string }[];
};

const Benefits = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const data = await getBenefits();
        setBenefits(data.body.beneficios);
      } catch (err: any) {
        setError(err.message || "Error fetching benefits");
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen min-w-full p-4">
      <Header />
      <h1 className="text-xl font-bold mb-6">
        BENEFICIOS DISPONIBLES PARA VOS
      </h1>
      <div className="grid sm:grid-cols-3 xl:grid-cols-5 gap-2">
        {benefits.map((benefit) => (
          <BenefitCard
            id={benefit.id}
            key={benefit.id}
            comercio={benefit.comercio}
            descuento={benefit.descuento}
            imagen={benefit.Imagens[0]?.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
