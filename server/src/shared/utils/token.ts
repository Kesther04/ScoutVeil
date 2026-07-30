import crypto from "crypto";
import jwt, { type SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

export interface AccessTokenPayload {
  sub: string; // userId
  email: string;
  role: string;
}

/** Short-lived JWT carried on every request to identify the user. */
export function signAccessToken(payload: AccessTokenPayload): string {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: (env.ACCESS_TOKEN_TTL ?? "15m") as NonNullable<SignOptions["expiresIn"]>, // Type assertion on expiresIn because zod coerces to number, but SignOptions expects string | number
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

/**
 * Opaque, high-entropy refresh/reset tokens. We hand the raw value to the
 * client and only ever persist its SHA-256 hash, so a DB read never yields a
 * usable token.
 */
export function generateOpaqueToken(): { raw: string; hash: string } {
  const raw = crypto.randomBytes(48).toString("hex");
  const hash = hashOpaqueToken(raw);
  return { raw, hash };
}

export function hashOpaqueToken(raw: string): string {
  return crypto.createHash("sha256").update(raw).digest("hex");
}