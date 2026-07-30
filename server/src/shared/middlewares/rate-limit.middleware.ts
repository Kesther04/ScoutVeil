import rateLimit from "express-rate-limit";

/** Tight limiter for login/register/forgot-password to blunt credential stuffing & abuse. */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Please try again later." },
});

/** Looser limiter for /auth/me and /auth/logout which fire on every page load. */
export const sessionRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests. Please slow down." },
});