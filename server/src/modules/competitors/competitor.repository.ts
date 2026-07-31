import { prisma } from "../../shared/database";
import type { CreateCompetitorInput, UpdateCompetitorInput } from "./competitor.types";

export const competitorRepository = {
  findAll() {
    return prisma.competitor.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: string) {
    return prisma.competitor.findUnique({
      where: { id },
      include: {
        websiteSnapshots: { orderBy: { scannedAt: "desc" }, take: 5 },
        changeLogs: { orderBy: { createdAt: "desc" }, take: 10 },
        threatScores: { orderBy: { computedAt: "desc" }, take: 1 },
      },
    });
  },

  findByDomain(domain: string) {
    return prisma.competitor.findFirst({
      where: { domain: domain.toLowerCase() },
    });
  },

  create(data: CreateCompetitorInput) {
    return prisma.competitor.create({
      data: {
        name: data.name,
        domain: data.domain.toLowerCase(),
      },
    });
  },

  update(id: string, data: UpdateCompetitorInput) {
    return prisma.competitor.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.domain && { domain: data.domain.toLowerCase() }),
      },
    });
  },

  delete(id: string) {
    return prisma.competitor.delete({
      where: { id },
    });
  },
};