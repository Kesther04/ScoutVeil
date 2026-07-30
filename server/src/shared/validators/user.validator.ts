import { z } from "zod";

const password = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password is too long."); // bcrypt's hard limit

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required.").max(120),
  companyName: z.string().trim().min(1, "Company name is required.").max(160),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password,
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().default(false),
});

export const googleAuthSchema = z.object({
  credential: z.string().min(1, "Missing Google credential."),
});

export const completeProfileSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required.").max(160),
  role: z.enum(["ADMIN", "MEMBER"]).optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Missing reset token."),
  password,
});