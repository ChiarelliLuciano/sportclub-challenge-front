import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
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

/**
 * Pagitation support
 * @param id Benefit id
 * @returns
 */
export const getSingleBenefit = async (id: string) => {
  const response = await apiClient.get(`/beneficios/${id}`);
  return response.data;
};

/**
 * Fetch benefits filtered by comercio value
 * @param value Value to filter by
 * @returns
 */
export const getByValue = async (value: string) => {
  const response = await apiClient.get(
    `/beneficios/comercio/${encodeURIComponent(value)}`
  );
  return response.data;
};

export default apiClient;
