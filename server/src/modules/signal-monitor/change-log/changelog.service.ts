import { changelogRepository } from "./changelog.repository";
import type { SignalType } from "@prisma/client";

export const changelogService = {
  async getCompetitorLogs(competitorId: string) {
    return changelogRepository.findByCompetitor(competitorId);
  },

  async getAllLogs(signalType?: SignalType) {
    return changelogRepository.findAll(100, signalType);
  },
};