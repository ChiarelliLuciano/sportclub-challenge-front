import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:2024/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBenefits = async () => {
  const response = await apiClient.get("/beneficios");
  return response.data;
};

export const getSingleBenefit = async (id: string) => {
  const response = await apiClient.get(`/beneficios/${id}`);
  return response.data;
};

export default apiClient;
