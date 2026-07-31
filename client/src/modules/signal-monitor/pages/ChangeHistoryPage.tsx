// src/modules/signal-monitor/pages/ChangeHistoryPage.tsx
import type { ReactElement } from "react";
import { useSearchParams } from "react-router-dom";
import { useWebsiteChanges } from "../hooks/useWebsiteChanges";
import ChangeHistoryTimeline from "../components/ChangeHistoryTimeline";

export default function ChangeHistoryPage(): ReactElement {
  const [searchParams] = useSearchParams();
  const competitorId = searchParams.get("competitorId") ?? undefined;

  const { changes, isLoading, error } = useWebsiteChanges(
    competitorId ? { competitorId } : undefined
  );

  return (
    <div className="max-w-4xl">
      <p className="text-sm text-[#94A3B8] mb-6">
        {isLoading
          ? "Loading history…"
          : `${changes.length} change${changes.length === 1 ? "" : "s"} recorded${
              competitorId ? " for this competitor" : ""
            }`}
      </p>

      <ChangeHistoryTimeline
        changes={changes}
        isLoading={isLoading}
        error={error}
        hideCompetitor={Boolean(competitorId)}
      />
    </div>
  );
}
