import { Prisma } from "@prisma/client";
import { prisma } from "../../shared/database";
import type { RegisterInput } from "./user.types";

type User = Prisma.UserGetPayload<{}>;
type RefreshToken = Prisma.RefreshTokenGetPayload<{}>;
type PasswordReset = Prisma.PasswordResetGetPayload<{}>;

export const userRepository = {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  },

  findByGoogleId(googleId: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { googleId } });
  },

  createWithPassword(input: RegisterInput, passwordHash: string): Promise<User> {
    return prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        fullName: input.fullName,
        companyName: input.companyName,
        authProvider: "PASSWORD",
        profileIncomplete: false,
      },
    });
  },

  createWithGoogle(params: {
    email: string;
    fullName: string;
    googleId: string;
    avatarUrl?: string | null;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        email: params.email,
        fullName: params.fullName,
        googleId: params.googleId,
        avatarUrl: params.avatarUrl ?? null,
        authProvider: "GOOGLE",
        profileIncomplete: true,
      },
    });
  },

  completeProfile(id: string, companyName: string, role?: "ADMIN" | "MEMBER" | "OWNER"): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: {
        companyName,
        profileIncomplete: false,
        ...(role ? { role } : {}),
      },
    });
  },

  updatePassword(id: string, passwordHash: string): Promise<User> {
    return prisma.user.update({ where: { id }, data: { passwordHash } });
  },

  // ── Refresh tokens ──────────────────────────────
  saveRefreshToken(userId: string, tokenHash: string, expiresAt: Date): Promise<RefreshToken> {
    return prisma.refreshToken.create({ data: { userId, tokenHash, expiresAt } });
  },

  findRefreshToken(tokenHash: string): Promise<RefreshToken | null> {
    return prisma.refreshToken.findUnique({ where: { tokenHash } });
  },

  revokeRefreshToken(tokenHash: string): Promise<Prisma.BatchPayload> {
    return prisma.refreshToken.updateMany({
      where: { tokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  revokeAllRefreshTokens(userId: string): Promise<Prisma.BatchPayload> {
    return prisma.refreshToken.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  // ── Password resets ─────────────────────────────
  savePasswordReset(userId: string, tokenHash: string, expiresAt: Date): Promise<PasswordReset> {
    return prisma.passwordReset.create({ data: { userId, tokenHash, expiresAt } });
  },

  findValidPasswordReset(tokenHash: string): Promise<PasswordReset | null> {
    return prisma.passwordReset.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
    });
  },

  markPasswordResetUsed(id: string): Promise<PasswordReset> {
    return prisma.passwordReset.update({ where: { id }, data: { usedAt: new Date() } });
  },
};