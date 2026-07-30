import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { logger } from "../utils/logger";

/**
 * You likely already have a version of this per your structure — this shape
 * ({ message, errors }) is what the frontend's `request()` helper expects:
 *   const message = body?.message
 *   const fieldErrors = body?.errors
 */
export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
      ...(err.fieldErrors ? { errors: err.fieldErrors } : {}),
    });
  }

  logger.error(err);
  return res.status(500).json({ message: "Something went wrong. Please try again." });
}