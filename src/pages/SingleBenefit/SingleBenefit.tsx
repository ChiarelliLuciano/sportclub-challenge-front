import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleBenefit } from "../../services/api";
import Header from "../../components/Header";

const SingleBenefit = () => {
  const { id } = useParams<{ id: string }>();
  const [benefit, setBenefit] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBenefit = async () => {
      try {
        const data = await getSingleBenefit(id || "");
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
      <h1 className="text-2xl font-bold mb-4">Detalle</h1>
      {benefit ? (
        <div className="border p-4 rounded">
          <p className="text-lg font-semibold">Comercio: {benefit.comercio}</p>
          <p>ID: {benefit.id}</p>
        </div>
      ) : (
        <p>Beneficio no encontrado</p>
      )}
    </div>
  );
};

export default SingleBenefit;
