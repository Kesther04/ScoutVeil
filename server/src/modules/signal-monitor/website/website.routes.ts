import { Router } from "express";
import { websiteController } from "./website.controller";
import { requireAuth } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.post("/scan", asyncHandler(websiteController.triggerScan));
router.get("/snapshots/:competitorId", asyncHandler(websiteController.getSnapshots));

export { router as websiteRoutes };