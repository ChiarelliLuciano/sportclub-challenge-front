import { useEffect, useState } from "react";
import { getBenefits } from "../../services/api";
import Header from "../../components/Header";

type Benefit = {
  id: number;
  comercio: string;
  descripcion: string;
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
      <h1 className="text-2xl font-bold mb-4">Beneficios:</h1>
      <ul className="space-y-2">
        {benefits.map((benefit) => (
          <li key={benefit.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{benefit.comercio}</h2>
            <p className="text-gray-700">{benefit.descripcion}</p>
            <a
              href={`/beneficio/${benefit.id}`}
              className="text-blue-500 hover:underline mt-2 block"
            >
              View Details
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;
