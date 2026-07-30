import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { verifyAccessToken, type AccessTokenPayload } from "../utils/token";
import { COOKIE_NAMES } from "../utils/cookies";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

/** Requires a valid access token (cookie, falling back to Authorization: Bearer). */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const bearer = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.slice(7)
    : undefined;
  const token = req.cookies?.[COOKIE_NAMES.ACCESS_COOKIE] ?? bearer;

  if (!token) {
    return next(new AppError("You need to be signed in to do that.", 401));
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError("Your session has expired. Please sign in again.", 401));
  }
}