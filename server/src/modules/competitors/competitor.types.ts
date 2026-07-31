import type { Competitor as PrismaCompetitor } from "@prisma/client";

export interface CreateCompetitorInput {
  name: string;
  domain: string;
}

export interface UpdateCompetitorInput {
  name?: string;
  domain?: string;
}

export type CompetitorResponse = PrismaCompetitor;