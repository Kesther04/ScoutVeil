import type { WebsiteSnapshot } from "@prisma/client";

export interface ScrapePageOptions {
  competitorId: string;
  url: string;
  pageType: string;
}

export interface DiffResult {
  hasChanges: boolean;
  diffSummary: string;
  addedLines: number;
  removedLines: number;
}

export type { WebsiteSnapshot };