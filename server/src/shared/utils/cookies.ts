import type { Response } from "express";
import { env } from "../../config/env";

const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

const baseOptions = {
  httpOnly: true,
  secure: env.COOKIE_SECURE,
  sameSite: "lax" as const,
  domain: env.COOKIE_DOMAIN,
  path: "/",
};

export function setAccessCookie(res: Response, token: string) {
  res.cookie(ACCESS_COOKIE, token, {
    ...baseOptions,
    maxAge: 15 * 60 * 1000, // 15m, mirrors ACCESS_TOKEN_TTL default
  });
}

export function setRefreshCookie(res: Response, token: string, ttlDays: number) {
  res.cookie(REFRESH_COOKIE, token, {
    ...baseOptions,
    maxAge: ttlDays * 24 * 60 * 60 * 1000,
    path: "/auth", // only sent back on auth routes — matches app.use("/auth", authRouter)
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, { ...baseOptions });
  res.clearCookie(REFRESH_COOKIE, { ...baseOptions, path: "/auth" });
}

export const COOKIE_NAMES = { ACCESS_COOKIE, REFRESH_COOKIE };