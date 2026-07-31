import type { Request, Response } from "express";
import { changelogService } from "./changelog.service";
import type { SignalType } from "@prisma/client";

export const changelogController = {
  async getByCompetitor(req: Request, res: Response) {
    const { competitorId } = req.params;
    const logs = await changelogService.getCompetitorLogs(competitorId);
    res.json({ status: "success", data: logs });
  },

  async getAll(req: Request, res: Response) {
    const signalType = req.query.signalType as SignalType | undefined;
    const logs = await changelogService.getAllLogs(signalType);
    res.json({ status: "success", data: logs });
  },
};