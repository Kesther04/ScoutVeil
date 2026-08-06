// src/modules/competitors/api.ts
import { apiClient } from "../../services/client";
import type { Competitor, CreateCompetitorPayload } from "./types";

export const competitorsApi = {
  list: async (): Promise<Competitor[]> => {
    const response = await apiClient.get("/competitors");
    return response.data.data;
  },

  create: async (payload: CreateCompetitorPayload): Promise<Competitor> => {
    const response = await apiClient.post("/competitors", payload);
    return response.data.data;
  },

  getById: async (id: string): Promise<Competitor> => {
    const response = await apiClient.get(`/competitors/${id}`);
    console.log(response.data.data);
    return response.data.data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`/competitors/${id}`);
  },
};
