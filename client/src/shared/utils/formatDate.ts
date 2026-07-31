// src/shared/utils/formatDate.ts

/** "Jul 2, 2026" style absolute date. */
export function formatDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** "3h ago" / "2d ago" style relative date, falling back to the absolute
 *  date once it's more than a week old — recent changes matter more than
 *  exact timestamps, older ones need a fixed anchor. */
export function formatRelativeDate(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  const diffHours = Math.round(diffMs / 3600000);
  const diffDays = Math.round(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(date);
}
