import { prisma } from "../../../shared/database";

export const websiteRepository = {
  findLatestSnapshot(competitorId: string, pageType: string) {
    return prisma.websiteSnapshot.findFirst({
      where: { competitorId, pageType },
      orderBy: { scannedAt: "desc" },
    });
  },

  createSnapshot(data: {
    competitorId: string;
    pageType: string;
    url: string;
    contentHash: string;
    rawContent: string;
    diffSummary?: string | null;
  }) {
    return prisma.websiteSnapshot.create({ data });
  },

  getSnapshotsByCompetitor(competitorId: string, limit = 20) {
    return prisma.websiteSnapshot.findMany({
      where: { competitorId },
      orderBy: { scannedAt: "desc" },
      take: limit,
    });
  },
};