import { websiteRepository } from "./website.repository";
import { scrapeWebsitePage } from "./website.scraper";
import { computeTextDiff, generateContentHash } from "./website.differ";
import { prisma } from "../../../shared/database";
import { AppError } from "../../../shared/utils/appError";
import type { ScrapePageOptions } from "./website.types";

export const websiteService = {
  async scanAndDiffPage(options: ScrapePageOptions) {
    const { competitorId, url, pageType } = options;

    const rawContent = await scrapeWebsitePage(url);
    const contentHash = generateContentHash(rawContent);

    const latestSnapshot = await websiteRepository.findLatestSnapshot(competitorId, pageType);

    let diffSummary: string | null = null;
    let isChanged = false;

    if (latestSnapshot) {
      if (latestSnapshot.contentHash === contentHash) {
        return latestSnapshot; // No changes detected
      }

      const diffResult = computeTextDiff(latestSnapshot.rawContent, rawContent);
      diffSummary = diffResult.diffSummary;
      isChanged = diffResult.hasChanges;
    }

    const newSnapshot = await websiteRepository.createSnapshot({
      competitorId,
      pageType,
      url,
      contentHash,
      rawContent,
      diffSummary,
    });

    if (isChanged && diffSummary) {
      await prisma.changeLog.create({
        data: {
          competitorId,
          signalType: "WEBSITE",
          summary: `Website update on ${pageType} page (${url})`,
          sourceRef: newSnapshot.id,
        },
      });
    }

    return newSnapshot;
  },

  async getCompetitorSnapshots(competitorId: string) {
    const competitor = await prisma.competitor.findUnique({ where: { id: competitorId } });
    if (!competitor) throw new AppError("Competitor not found", 404);

    return websiteRepository.getSnapshotsByCompetitor(competitorId);
  },
};