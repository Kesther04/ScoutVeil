// src/modules/dashboard/components/RecentActivityFeed.tsx
import type { ReactElement } from "react";
import { Radar } from "lucide-react";
import EmptyState from "../../../shared/components/EmptyState";
import Loader from "../../../shared/components/Loader";
import WebsiteChangeCard from "../../signal-monitor/components/website/WebsiteChangeCard";
import type { WebsiteChange } from "../../signal-monitor/types";

type RecentActivityFeedProps = {
  changes: WebsiteChange[];
  isLoading: boolean;
  error: string | null;
};

export default function RecentActivityFeed({
  changes,
  isLoading,
  error,
}: RecentActivityFeedProps): ReactElement {
  if (isLoading) return <Loader label="Loading activity" />;

  if (error) {
    return <EmptyState icon={Radar} title="Something went wrong" description={error} />;
  }

  if (changes.length === 0) {
    return (
      <EmptyState
        icon={Radar}
        title="No activity yet"
        description="Once your tracked competitors' pages change, you'll see it here first."
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {changes.slice(0, 5).map((change) => (
        <WebsiteChangeCard key={change.id} change={change} />
      ))}
    </div>
  );
}
