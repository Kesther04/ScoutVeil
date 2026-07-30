/**
 * You likely already have this in shared/utils/logger.ts per your structure —
 * only drop this in if it doesn't exist yet. Swap for pino/winston later
 * without touching call sites.
 */
export const logger = {
  info: (...args: unknown[]) => console.log("[info]", ...args),
  warn: (...args: unknown[]) => console.warn("[warn]", ...args),
  error: (...args: unknown[]) => console.error("[error]", ...args),
};