// src/modules/signal-monitor/components/ChangeHistoryTimeline.tsx
import type { ReactElement } from "react";
import { Radar } from "lucide-react";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import WebsiteChangeCard from "./website/WebsiteChangeCard";
import type { WebsiteChange } from "../types";

type ChangeHistoryTimelineProps = {
  changes: WebsiteChange[];
  isLoading: boolean;
  error: string | null;
  hideCompetitor?: boolean;
};

export default function ChangeHistoryTimeline({
  changes,
  isLoading,
  error,
  hideCompetitor = false,
}: ChangeHistoryTimelineProps): ReactElement {
  if (isLoading) return <Loader label="Loading change history" />;

  if (error) {
    return (
      <EmptyState icon={Radar} title="Something went wrong" description={error} />
    );
  }

  if (changes.length === 0) {
    return (
      <EmptyState
        icon={Radar}
        title="No changes detected yet"
        description="Once a tracked homepage or pricing page changes, it'll show up here with a full diff."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {changes.map((change) => (
        <WebsiteChangeCard
          key={change.id}
          change={change}
          hideCompetitor={hideCompetitor}
        />
      ))}
    </div>
  );
}
