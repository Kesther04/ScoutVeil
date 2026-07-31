// src/modules/competitors/hooks/useCompetitors.ts
import { useCallback, useEffect, useState } from "react";
import { competitorsApi } from "../api";
import type { Competitor, CreateCompetitorPayload } from "../types";

export function useCompetitors() {
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompetitors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await competitorsApi.list();
      setCompetitors(data);
    } catch {
      setError("Couldn't load your competitors. Try refreshing.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompetitors();
  }, [fetchCompetitors]);

  const addCompetitor = useCallback(
    async (payload: CreateCompetitorPayload) => {
      const created = await competitorsApi.create(payload);
      setCompetitors((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const removeCompetitor = useCallback(async (id: string) => {
    await competitorsApi.remove(id);
    setCompetitors((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return {
    competitors,
    isLoading,
    error,
    addCompetitor,
    removeCompetitor,
    refetch: fetchCompetitors,
  };
}
