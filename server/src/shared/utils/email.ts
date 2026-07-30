import { logger } from "./logger";

/**
 * Placeholder mailer. Swap the body for your real provider (Resend, SES,
 * Postmark, etc.) — signature stays the same so nothing else has to change.
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string): Promise<void> {
  logger.info(`[email:stub] Password reset link for ${to}: ${resetUrl}`);
  // TODO: wire up real transactional email provider
}