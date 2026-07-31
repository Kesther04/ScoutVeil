// src/modules/dashboard/types.ts

export type DashboardCompetitorRow = {
  id: string;
  domain: string;
  name?: string | null;
  lastChangeAt?: string | null;
  lastChangeSummary?: string | null;
  lastChangePageType?: "homepage" | "pricing" | null;
};

export type DashboardSummary = {
  totalCompetitors: number;
  changesThisWeek: number;
  competitors: DashboardCompetitorRow[];
};
