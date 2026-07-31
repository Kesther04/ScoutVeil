// src/modules/competitors/pages/CompetitorDetailsPage.tsx
import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import { Radar } from "lucide-react";
import { competitorsApi } from "../api";
import type { Competitor } from "../types";
import CompetitorDetailsHeader from "../components/CompetitorDetailsHeader";
import { useWebsiteChanges } from "../../signal-monitor/hooks/useWebsiteChanges";
import ChangeHistoryTimeline from "../../signal-monitor/components/ChangeHistoryTimeline";

export default function CompetitorDetailsPage(): ReactElement {
  const { competitorId } = useParams<{ competitorId: string }>();

  const [competitor, setCompetitor] = useState<Competitor | null>(null);
  const [isLoadingCompetitor, setIsLoadingCompetitor] = useState(true);
  const [competitorError, setCompetitorError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitorId) return;
    setIsLoadingCompetitor(true);
    setCompetitorError(null);
    competitorsApi
      .getById(competitorId)
      .then(setCompetitor)
      .catch(() => setCompetitorError("Couldn't load this competitor."))
      .finally(() => setIsLoadingCompetitor(false));
  }, [competitorId]);

  const {
    changes,
    isLoading: isLoadingChanges,
    error: changesError,
  } = useWebsiteChanges({ competitorId });

  if (isLoadingCompetitor) return <Loader label="Loading competitor" fullHeight />;

  if (competitorError || !competitor) {
    return (
      <EmptyState
        icon={Radar}
        title="Couldn't load this competitor"
        description={competitorError ?? "This competitor may have been removed."}
      />
    );
  }

  return (
    <div className="max-w-4xl">
      <CompetitorDetailsHeader competitor={competitor} />
      <h3 className="text-sm font-medium text-[#E4E2ED] mb-4">
        Change history
      </h3>
      <ChangeHistoryTimeline
        changes={changes}
        isLoading={isLoadingChanges}
        error={changesError}
        hideCompetitor
      />
    </div>
  );
}
