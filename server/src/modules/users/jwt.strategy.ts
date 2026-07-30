import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env";
import { AppError } from "../../shared/utils/appError";

const googleClient = new OAuth2Client(env.GOOGLE_CLIENT_ID);

export interface GoogleProfile {
  googleId: string;
  email: string;
  fullName: string | undefined;
  avatarUrl: string | null;
}

/**
 * Verifies the ID token the frontend gets from Google's identity SDK
 * (GoogleAuthPayload.credential). Throws AppError on anything invalid.
 */
export async function verifyGoogleCredential(credential: string): Promise<GoogleProfile> {
  let ticket;
  try {
    ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: env.GOOGLE_CLIENT_ID,
    });
  } catch {
    throw new AppError("Google sign-in failed. Please try again.", 401);
  }

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email) {
    throw new AppError("Google sign-in failed. Please try again.", 401);
  }
  if (payload.email_verified === false) {
    throw new AppError("Your Google email isn't verified.", 401);
  }

  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase(),
    fullName: payload.name ?? payload.email.split("@")[0],
    avatarUrl: payload.picture ?? null,
  };
}