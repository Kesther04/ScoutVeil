import type { AuthProvider, Role, User as PrismaUser } from "@prisma/client";

/** Exactly what the frontend's `User` interface (types.ts) expects. */
export interface PublicUser {
  id: string;
  fullName: string;
  email: string;
  companyName: string | null;
  avatarUrl?: string | null;
  authProvider: "password" | "google";
  profileIncomplete: boolean;
  createdAt: string;
}

export function toPublicUser(user: PrismaUser): PublicUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    companyName: user.companyName,
    avatarUrl: user.avatarUrl,
    authProvider: user.authProvider === "GOOGLE" ? "google" : "password",
    profileIncomplete: user.profileIncomplete,
    createdAt: user.createdAt.toISOString(),
  };
}

export interface RegisterInput {
  fullName: string;
  companyName: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface CompleteProfileInput {
  companyName: string;
  role?: Role;
}

export type { AuthProvider, Role };