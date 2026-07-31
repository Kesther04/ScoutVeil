import type { Request, Response } from "express";
import { websiteService } from "./website.service";

export const websiteController = {
  async triggerScan(req: Request, res: Response) {
    const { competitorId, url, pageType } = req.body;
    const snapshot = await websiteService.scanAndDiffPage({ competitorId, url, pageType });
    res.status(201).json({ status: "success", data: snapshot });
  },

  async getSnapshots(req: Request, res: Response) {
    const { competitorId } = req.params;
    const snapshots = await websiteService.getCompetitorSnapshots(competitorId);
    res.json({ status: "success", data: snapshots });
  },
};