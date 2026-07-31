// src/modules/dashboard/pages/DashboardPage.tsx
import type { ReactElement } from "react";
import { Radar, Users, Sparkles } from "lucide-react";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import Button from "../../../shared/components/Button";
import { useDashboardSummary } from "../hooks/useDashboardSummary";
import { useWebsiteChanges } from "../../signal-monitor/hooks/useWebsiteChanges";
import CompetitorOverviewGrid from "../components/CompetitorOverviewGrid";
import RecentActivityFeed from "../components/RecentActivityFeed";
import { useNavigate } from "react-router-dom";

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/2 px-5 py-4 flex items-center gap-3.5">
      <div className="w-9 h-9 rounded-lg bg-[#E8A64A]/10 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-[#E8A64A]" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-lg font-mono font-medium text-[#E4E2ED] leading-none">
          {value}
        </p>
        <p className="text-xs text-[#94A3B8] mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function DashboardPage(): ReactElement {
  const navigate = useNavigate();
  const { summary, isLoading, error } = useDashboardSummary();
  const { changes, isLoading: isLoadingChanges, error: changesError } =
    useWebsiteChanges();

  if (isLoading) return <Loader label="Loading dashboard" fullHeight />;

  if (error || !summary) {
    return (
      <EmptyState
        icon={Radar}
        title="Something went wrong"
        description={error ?? "Couldn't load your dashboard."}
      />
    );
  }

  if (summary.totalCompetitors === 0) {
    return (
      <EmptyState
        icon={Radar}
        title="No competitors tracked yet"
        description="Add your first competitor to start catching homepage and pricing changes automatically."
        action={
          <Button onClick={() => navigate("/app/competitors")}>
            Add competitor
          </Button>
        }
      />
    );
  }

  return (
    <div className="max-w-5xl flex flex-col gap-10">
      <div className="grid sm:grid-cols-2 gap-4">
        <StatCard
          icon={Users}
          label="Competitors tracked"
          value={summary.totalCompetitors}
        />
        <StatCard
          icon={Sparkles}
          label="Changes this week"
          value={summary.changesThisWeek}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#E4E2ED] mb-4">
          Your competitors
        </h3>
        <CompetitorOverviewGrid competitors={summary.competitors} />
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#E4E2ED] mb-4">
          Recent activity
        </h3>
        <RecentActivityFeed
          changes={changes}
          isLoading={isLoadingChanges}
          error={changesError}
        />
      </div>
    </div>
  );
}
