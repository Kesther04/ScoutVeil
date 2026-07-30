import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { setAccessCookie, setRefreshCookie, clearAuthCookies, COOKIE_NAMES } from "../../shared/utils/cookies";
import { AppError } from "../../shared/utils/appError";

/** Sets cookies and shapes the body to match `AuthResponse` on the frontend. */
function respondWithSession(
  res: Response,
  session: { user: unknown; accessToken: string; refreshTokenRaw: string; ttlDays: number },
  status = 200
) {
  setAccessCookie(res, session.accessToken);
  setRefreshCookie(res, session.refreshTokenRaw, session.ttlDays);

  return res.status(status).json({
    user: session.user,
    tokens: {
      accessToken: session.accessToken,
      refreshToken: session.refreshTokenRaw,
    },
  });
}

export const authController = {
  async register(req: Request, res: Response) {
    const session = await authService.register(req.body);
    return respondWithSession(res, session, 201);
  },

  async login(req: Request, res: Response) {
    const session = await authService.login(req.body);
    return respondWithSession(res, session);
  },

  async google(req: Request, res: Response) {
    const session = await authService.continueWithGoogle(req.body.credential);
    respondWithSession(res, session);
  },

  async completeProfile(req: Request, res: Response) {
    if (!req.user) throw new AppError("You need to be signed in to do that.", 401);
    const user = await authService.completeProfile(req.user.sub, req.body);
    res.status(200).json({ user });
  },

  async me(req: Request, res: Response) {
    if (!req.user) throw new AppError("You need to be signed in to do that.", 401);
    const user = await authService.me(req.user.sub);
    res.status(200).json({ user });
  },

  async forgotPassword(req: Request, res: Response) {
    await authService.forgotPassword(req.body.email);
    // Generic response regardless of outcome — avoids account enumeration.
    res.status(200).json({ message: "If an account exists for that email, we've sent a reset link." });
  },

  async resetPassword(req: Request, res: Response) {
    await authService.resetPassword(req.body.token, req.body.password);
    res.status(200).json({ message: "Your password has been reset. You can now sign in." });
  },

  async logout(req: Request, res: Response) {
    const refreshTokenRaw = req.cookies?.[COOKIE_NAMES.REFRESH_COOKIE];
    await authService.logout(refreshTokenRaw);
    clearAuthCookies(res);
    res.status(200).json({ message: "Signed out." });
  },
};