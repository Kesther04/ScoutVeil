import { Router } from "express";
import { competitorController } from "./competitor.controller";
import { requireAuth } from "../../shared/middlewares/auth.middleware";
import { validate } from "../../shared/middlewares/validate.middleware";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import { competitorSchema } from "../../shared/validators/competitor.validator";

const router = Router();

router.use(requireAuth);

router.get("/", asyncHandler(competitorController.getAll));
router.get("/:id", asyncHandler(competitorController.getById));
router.post("/", validate(competitorSchema), asyncHandler(competitorController.create));
router.patch("/:id", validate(competitorSchema.partial()), asyncHandler(competitorController.update));
router.delete("/:id", asyncHandler(competitorController.delete));

export { router as competitorRoutes };