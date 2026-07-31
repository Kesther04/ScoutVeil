import { z } from "zod";

export const competitorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  domain: z
    .string()
    .min(3, "Domain is required")
    .regex(
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
      "Must be a valid domain (e.g. competitor.com)"
    ),
});