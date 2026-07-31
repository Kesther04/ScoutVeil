import { Router } from "express";
import { changelogController } from "./changelog.controller";
import { requireAuth } from "../../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../../shared/utils/asyncHandler";

const router = Router();

router.use(requireAuth);

router.get("/all", asyncHandler(changelogController.getAll));
router.get("/:competitorId", asyncHandler(changelogController.getByCompetitor));

export { router as changelogRoutes };