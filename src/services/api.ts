import axios from "axios";
import type { Benefit, Suggestion } from "../types/types";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Fetch benefits with pagination support
 * @param page Page number (optional)
 * @returns Benefits list and pagination info
 */
export const getBenefits = async (
  page?: number
): Promise<{ body: { beneficios: Benefit[]; totalPages: number } }> => {
  const url = page ? `/beneficios?page=${page}` : "/beneficios";
  const response = await apiClient.get(url);
  return response.data;
};

/**
 * Fetch a single benefit by ID
 * @param id Benefit id
 * @returns A single benefit
 */
export const getSingleBenefit = async (
  id: string
): Promise<{ body: Benefit }> => {
  const response = await apiClient.get(`/beneficios/${id}`);
  return response.data;
};

/**
 * Fetch benefits filtered by value
 * @param value Value to filter by
 * @returns List of benefits matching the filter
 */
export const getByValue = async (
  value: string
): Promise<{ body: { beneficios: Suggestion[] } }> => {
  const response = await apiClient.get(
    `/beneficios/comercio/${encodeURIComponent(value)}`
  );
  return response.data;
};

export default apiClient;
