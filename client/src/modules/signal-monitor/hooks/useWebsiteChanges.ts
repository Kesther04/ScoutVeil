// src/modules/signal-monitor/hooks/useWebsiteChanges.ts
import { useCallback, useEffect, useState } from "react";
import { signalMonitorApi } from "../api";
import type { ListWebsiteChangesParams, WebsiteChange } from "../types";

export function useWebsiteChanges(params?: ListWebsiteChangesParams) {
  const [changes, setChanges] = useState<WebsiteChange[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const competitorId = params?.competitorId;

  const fetchChanges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await signalMonitorApi.listWebsiteChanges(
        competitorId ? { competitorId } : undefined
      );
      setChanges(data);
    } catch {
      setError("Couldn't load website changes. Try refreshing.");
    } finally {
      setIsLoading(false);
    }
  }, [competitorId]);

  useEffect(() => {
    fetchChanges();
  }, [fetchChanges]);

  return { changes, isLoading, error, refetch: fetchChanges };
}
