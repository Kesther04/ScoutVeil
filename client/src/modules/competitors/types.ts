// src/modules/competitors/types.ts

export type CompetitorStatus = "active" | "paused";

export type Competitor = {
  id: string;
  domain: string;
  name?: string | null;
  status: CompetitorStatus;
  addedAt: string;
  lastChangeAt?: string | null;
  lastChangeSummary?: string | null;
  lastChangePageType?: "homepage" | "pricing" | null;
};

export type CreateCompetitorPayload = {
  domain: string;
  name?: string;
};
