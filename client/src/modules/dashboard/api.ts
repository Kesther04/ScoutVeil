// src/modules/dashboard/api.ts
import { apiClient } from "../../services/client";
import type { DashboardSummary } from "./types";

export const dashboardApi = {
  getSummary: async (): Promise<DashboardSummary> => {
    const response = await apiClient.get("/dashboard/summary");
    return response.data.data;
  },
};
