// src/modules/signal-monitor/api.ts
import { apiClient } from "../../services/client";
import type { ListWebsiteChangesParams, WebsiteChange } from "./types";

export const signalMonitorApi = {
  listWebsiteChanges: async (
    params?: ListWebsiteChangesParams
  ): Promise<WebsiteChange[]> => {
    const response = await apiClient.get("/signals/website", { params });
    return response.data.data;
  },

  getWebsiteChangeById: async (id: string): Promise<WebsiteChange> => {
    const response = await apiClient.get(`/signals/website/${id}`);
    return response.data.data;
  },
};
