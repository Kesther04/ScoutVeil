import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../shared/middlewares/validate.middleware";
import { requireAuth } from "../../shared/middlewares/auth.middleware";
import { authRateLimiter, sessionRateLimiter } from "../../shared/middlewares/rate-limit.middleware";
import { asyncHandler } from "../../shared/utils/asyncHandler";
import {
  registerSchema,
  loginSchema,
  googleAuthSchema,
  completeProfileSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../shared/validators/user.validator";

const router = Router();

router.post("/register", authRateLimiter, validate(registerSchema), asyncHandler(authController.register));
router.post("/login", authRateLimiter, validate(loginSchema), asyncHandler(authController.login));
router.post("/google", authRateLimiter, validate(googleAuthSchema), asyncHandler(authController.google));

router.post(
  "/complete-profile",
  requireAuth,
  validate(completeProfileSchema),
  asyncHandler(authController.completeProfile)
);

router.post(
  "/forgot-password",
  authRateLimiter,
  validate(forgotPasswordSchema),
  asyncHandler(authController.forgotPassword)
);
router.post(
  "/reset-password",
  authRateLimiter,
  validate(resetPasswordSchema),
  asyncHandler(authController.resetPassword)
);

router.get("/me", sessionRateLimiter, requireAuth, asyncHandler(authController.me));
router.post("/logout", sessionRateLimiter, asyncHandler(authController.logout));

router.post(
  "/refresh",
  sessionRateLimiter,
  asyncHandler(authController.refreshToken)
);

export { router as authRoutes };