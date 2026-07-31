import type { Request, Response } from "express";
import { competitorService } from "./competitor.service";

export const competitorController = {
  async getAll(_req: Request, res: Response) {
    const competitors = await competitorService.getAllCompetitors();
    res.json({ status: "success", data: competitors });
  },

  async getById(req: Request, res: Response) {
    const competitor = await competitorService.getCompetitorById(req.params.id as string);
    res.json({ status: "success", data: competitor });
  },

  async create(req: Request, res: Response) {
    const competitor = await competitorService.createCompetitor(req.body);
    res.status(201).json({ status: "success", data: competitor });
  },

  async update(req: Request, res: Response) {
    const competitor = await competitorService.updateCompetitor(req.params.id as string, req.body);
    res.json({ status: "success", data: competitor });
  },

  async delete(req: Request, res: Response) {
    await competitorService.deleteCompetitor(req.params.id as string);
    res.status(204).send();
  },
};