// src/users/auth.routes.ts

import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  getMeHandler,
  logoutHandler,
  refreshHandler,
} from "./auth.controller";
// import { requireAuth } from "./jwt.strategy";

const router = Router();

// ─── Registration ─────────────────────────────────────────────────────────────

/**
 * @route   POST /auth/register
 * @desc    Create a user
 * @access  Public
 * @body    { name, email, password }
 */
router.post("/register/individual", registerHandler);

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * @route   POST /auth/login
 * @desc    Unified login — works for OWNER, ADMIN and MEMBER roles
 * @access  Public
 * @body    { email, password }
 */
router.post("/login", loginHandler);

// ─── Password Reset ───────────────────────────────────────────────────────────

/**
 * @route   POST /auth/forgot-password
 * @desc    Send a password reset email (email only, all account types)
 * @access  Public
 * @body    { email }
 */
router.post("/forgot-password", forgotPasswordHandler);

/**
 * @route   POST /auth/reset-password
 * @desc    Confirm a password reset using the emailed token
 * @access  Public
 * @body    { token, newPassword }
 */
router.post("/reset-password", resetPasswordHandler);

// ─── Protected ────────────────────────────────────────────────────────────────

/**
 * @route   GET /auth/me
 * @desc    Return the authenticated user's JWT payload
 * @access  Private — requires Bearer token
 */
router.get("/me", requireAuth, getMeHandler);



router.post("/refresh", refreshHandler);


router.post("/logout", logoutHandler);

export default router;