// src/shared/utils/formatDomain.ts

/** Strips protocol, www, trailing slash — so "https://www.rivalco.com/"
 *  and "rivalco.com" are treated as the same tracked domain. */
export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
}

export function isValidDomain(input: string): boolean {
  const domain = normalizeDomain(input);
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(
    domain
  );
}
