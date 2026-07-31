import { competitorRepository } from "./competitor.repository";
import { AppError } from "../../shared/utils/appError";
import type { CreateCompetitorInput, UpdateCompetitorInput } from "./competitor.types";

export const competitorService = {
  async getAllCompetitors() {
    return competitorRepository.findAll();
  },

  async getCompetitorById(id: string) {
    const competitor = await competitorRepository.findById(id);
    if (!competitor) {
      throw new AppError("Competitor not found", 404);
    }
    return competitor;
  },

  async createCompetitor(input: CreateCompetitorInput) {
    const existing = await competitorRepository.findByDomain(input.domain);
    if (existing) {
      throw new AppError("Competitor with this domain already exists", 400);
    }
    return competitorRepository.create(input);
  },

  async updateCompetitor(id: string, input: UpdateCompetitorInput) {
    await this.getCompetitorById(id);
    return competitorRepository.update(id, input);
  },

  async deleteCompetitor(id: string) {
    await this.getCompetitorById(id);
    return competitorRepository.delete(id);
  },
};