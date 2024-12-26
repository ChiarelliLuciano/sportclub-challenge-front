import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:2024/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Pagitation support
 * @param page Page number (optional)
 * @returns
 */
export const getBenefits = async (page?: number) => {
  const url = page ? `/beneficios?page=${page}` : "/beneficios";
  const response = await apiClient.get(url);
  return response.data;
};

export const getSingleBenefit = async (id: string) => {
  const response = await apiClient.get(`/beneficios/${id}`);
  return response.data;
};

export default apiClient;
