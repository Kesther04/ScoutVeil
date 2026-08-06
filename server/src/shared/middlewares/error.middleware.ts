import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../utils/appError";
import { logger } from "../utils/logger";

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // 1. Handled App Errors
  if (err instanceof AppError) {
    return res.status(err.status).json({
      message: err.message,
      ...(err.fieldErrors ? { errors: err.fieldErrors } : {}),
    });
  }

  // 2. Prisma Database Query Errors (Known codes)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    logger.error(`[Prisma Query Error ${err.code}]: ${err.message}`);
    return res.status(400).json({
      message: getPrismaUserFriendlyMessage(err),
      errors: err.meta?.target ? { [String(err.meta.target)]: `${err.meta.target} already exists` } : undefined,
    });
  }

  // 3. Neon WebSocket Connection / Timeout Errors
  const isNeonError = 
    err?.constructor?.name === "ErrorEvent" || 
    err?.clientVersion || 
    err instanceof Prisma.PrismaClientInitializationError;

  if (isNeonError) {
    const code = extractErrorCode(err) || "ETIMEDOUT";
    
    // Log ONLY a clean string. NEVER pass `err` or metadata objects into logger.error!
    logger.error(`[Database Error]: Connection to Neon pooler timed out (${code}).`);

    return res.status(503).json({
      message: "Database connection timed out. Please try again.",
    });
  }

  // 4. General Fallback (Only log string messages, never raw object graphs)
  const cleanMessage = err?.message || (typeof err === "string" ? err : "Unknown system error");
  logger.error(`[Unhandled Error]: ${cleanMessage}`);

  return res.status(500).json({ message: "Something went wrong. Please try again." });
}

/** Safely extracts ETIMEDOUT without triggering object serialization */
function extractErrorCode(err: any): string | undefined {
  try {
    const kErrorSymbol: any = Object.getOwnPropertySymbols(err || {}).find(
      (sym) => sym.description === "kError"
    );
    return err[kErrorSymbol]?.code || err?.code;
  } catch {
    return undefined;
  }
}

function getPrismaUserFriendlyMessage(err: Prisma.PrismaClientKnownRequestError): string {
  switch (err.code) {
    case "P2002":
      return `A record with this ${err.meta?.target || "field"} already exists.`;
    case "P2025":
      return "The requested record was not found.";
    default:
      return "A database error occurred.";
  }
}