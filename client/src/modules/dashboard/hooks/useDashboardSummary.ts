// src/modules/dashboard/hooks/useDashboardSummary.ts
import { useCallback, useEffect, useState } from "react";
import { dashboardApi } from "../api";
import type { DashboardSummary } from "../types";

export function useDashboardSummary() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await dashboardApi.getSummary();
      setSummary(data);
    } catch {
      setError("Couldn't load your dashboard. Try refreshing.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return { summary, isLoading, error, refetch: fetchSummary };
}
