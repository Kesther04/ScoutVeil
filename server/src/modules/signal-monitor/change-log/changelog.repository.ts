import { prisma } from "../../../shared/database";
import type { SignalType } from "@prisma/client";

export const changelogRepository = {
  findByCompetitor(competitorId: string, limit = 50) {
    return prisma.changeLog.findMany({
      where: { competitorId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
  },

  findAll(limit = 100, signalType?: SignalType) {
    return prisma.changeLog.findMany({
      where: signalType ? { signalType } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        competitor: {
          select: { name: true, domain: true },
        },
      },
    });
  },
};