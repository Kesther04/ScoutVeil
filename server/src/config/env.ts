import { z } from "zod";

const envSchema = z.object({
  NODE_ENV:     z.enum(["development", "test", "production"]).default("development"),
  PORT:         z.string().default("5000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
  JWT_ACCESS_SECRET:   z.string().min(28, "JWT_ACCESS_SECRET must be at least 28 characters"),
  JWT_REFRESH_SECRET:  z.string().min(28, "JWT_REFRESH_SECRET must be at least 28 characters"),
  FRONTEND_URL: z.string().default("https://scoutveil.vercel.app").describe("The URL of the frontend application, used for CORS and reset links"),
  COOKIE_SECURE: z.coerce.boolean().default(false),
  COOKIE_DOMAIN: z.string().default("localhost"),

  ACCESS_TOKEN_TTL: z.coerce.number().default(15),
  REFRESH_TOKEN_TTL_DAYS: z.coerce.number().default(7),
  REFRESH_TOKEN_TTL_DAYS_REMEMBER_ME: z.coerce.number().default(30),
  PASSWORD_RESET_TTL_MINUTES: z.coerce.number().default(15),
});

function loadEnv() {
  // We use process.env directly here
  const result = envSchema.safeParse(process.env);
  
  if (!result.success) {
    console.error("❌  Invalid environment variables:");
    result.error.issues.forEach((e) => {
      console.error(`   ${e.path.join(".")}: ${e.message}`);
    });
    // If validation fails, the app will stop here
    process.exit(1);
  }
  return result.data;
}

export const env = loadEnv();