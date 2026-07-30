import { env } from "../../config/env";
import { AppError } from "../../shared/utils/appError";
import { comparePassword, hashPassword } from "../../shared/utils/password";
import { generateOpaqueToken, hashOpaqueToken, signAccessToken } from "../../shared/utils/token";
import { sendPasswordResetEmail } from "../../shared/utils/email";
import { userRepository } from "./user.repository";
import { toPublicUser, type CompleteProfileInput, type LoginInput, type RegisterInput } from "./user.types";
import { verifyGoogleCredential } from "./jwt.strategy";
import type { User as PrismaUser } from "@prisma/client";

function buildTokens(user: PrismaUser) {
  const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
  const refresh = generateOpaqueToken();
  return { accessToken, refreshTokenRaw: refresh.raw, refreshTokenHash: refresh.hash };
}

export const authService = {
  async register(input: RegisterInput) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw new AppError("An account with that email already exists.", 409, {
        email: "An account with that email already exists.",
      });
    }

    const passwordHash = await hashPassword(input.password);
    const user = await userRepository.createWithPassword(input, passwordHash);
    return this.issueSession(user, false);
  },

  async login(input: LoginInput) {
    const user = await userRepository.findByEmail(input.email);
    if (!user || !user.passwordHash) {
      throw new AppError("Invalid email or password.", 401);
    }

    const valid = await comparePassword(input.password, user.passwordHash);
    if (!valid) {
      throw new AppError("Invalid email or password.", 401);
    }

    return this.issueSession(user, input.rememberMe);
  },

  async continueWithGoogle(credential: string) {
    const profile = await verifyGoogleCredential(credential);

    let user = await userRepository.findByGoogleId(profile.googleId);
    if (!user) {
      // Allow linking: someone who registered with a password using the same
      // email can also sign in with Google going forward.
      user = await userRepository.findByEmail(profile.email);
    }

    if (!user) {
      user = await userRepository.createWithGoogle(profile  as any);
    }

    return this.issueSession(user, true);
  },

  async completeProfile(userId: string, input: CompleteProfileInput) {
    const user = await userRepository.completeProfile(userId, input.companyName);
    return toPublicUser(user);
  },

  async me(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("Account not found.", 404);
    }
    return toPublicUser(user);
  },

  async forgotPassword(email: string) {
    const user = await userRepository.findByEmail(email);
    // Always respond the same way whether or not the account exists, so we
    // don't leak which emails are registered.
    if (!user || user.authProvider === "GOOGLE") {
      return;
    }

    const { raw, hash } = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + env.PASSWORD_RESET_TTL_MINUTES * 60 * 1000);
    await userRepository.savePasswordReset(user.id, hash, expiresAt);

    const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${raw}`;
    await sendPasswordResetEmail(user.email, resetUrl);
  },

  async resetPassword(rawToken: string, newPassword: string) {
    const hash = hashOpaqueToken(rawToken);
    const record = await userRepository.findValidPasswordReset(hash);
    if (!record) {
      throw new AppError("This reset link is invalid or has expired.", 400);
    }

    const passwordHash = await hashPassword(newPassword);
    await userRepository.updatePassword(record.userId, passwordHash);
    await userRepository.markPasswordResetUsed(record.id);
    await userRepository.revokeAllRefreshTokens(record.userId); // sign out everywhere
  },

  async logout(refreshTokenRaw?: string) {
    if (refreshTokenRaw) {
      await userRepository.revokeRefreshToken(hashOpaqueToken(refreshTokenRaw));
    }
  },

  /** Shared by register/login/google: mints tokens + persists the refresh token. */
  async issueSession(user: PrismaUser, rememberMe: boolean) {
    const ttlDays = rememberMe ? env.REFRESH_TOKEN_TTL_DAYS_REMEMBER_ME : env.REFRESH_TOKEN_TTL_DAYS;
    const { accessToken, refreshTokenRaw, refreshTokenHash } = buildTokens(user);
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

    await userRepository.saveRefreshToken(user.id, refreshTokenHash, expiresAt);

    return {
      user: toPublicUser(user),
      accessToken,
      refreshTokenRaw,
      ttlDays,
    };
  },
};