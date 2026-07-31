// src/modules/signal-monitor/types.ts

export type WebsitePageType = "homepage" | "pricing";

export type DiffLine = {
  type: "added" | "removed" | "context";
  text: string;
};

export type WebsiteChange = {
  id: string;
  competitorId: string;
  competitorDomain: string;
  competitorName?: string | null;
  pageType: WebsitePageType;
  detectedAt: string;
  summary: string;
  diffAddedCount: number;
  diffRemovedCount: number;
  diffLines?: DiffLine[];
  beforeSnapshotUrl?: string | null;
  afterSnapshotUrl?: string | null;
};

export type ListWebsiteChangesParams = {
  competitorId?: string;
};
