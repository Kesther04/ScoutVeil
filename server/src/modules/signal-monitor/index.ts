import { Router } from "express";
import { websiteRoutes } from "./website/website.routes";
import { changelogRoutes } from "./change-log/changelog.routes";

const signalMonitorRouter = Router();

signalMonitorRouter.use("/website", websiteRoutes);
signalMonitorRouter.use("/changelog", changelogRoutes);

export { signalMonitorRouter };