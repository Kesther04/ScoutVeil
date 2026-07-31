import * as diff from "diff";
import crypto from "crypto";
import type { DiffResult } from "./website.types";

export function generateContentHash(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex");
}

export function computeTextDiff(oldText: string, newText: string): DiffResult {
  const changes = diff.diffLines(oldText, newText);
  let addedLines = 0;
  let removedLines = 0;
  let summaryParts: string[] = [];

  changes.forEach((change) => {
    if (change.added) {
      addedLines += change.value.split("\n").filter(Boolean).length;
      summaryParts.push(`+ ${change.value.trim()}`);
    } else if (change.removed) {
      removedLines += change.value.split("\n").filter(Boolean).length;
      summaryParts.push(`- ${change.value.trim()}`);
    }
  });

  const hasChanges = addedLines > 0 || removedLines > 0;

  return {
    hasChanges,
    diffSummary: summaryParts.join("\n"),
    addedLines,
    removedLines,
  };
}