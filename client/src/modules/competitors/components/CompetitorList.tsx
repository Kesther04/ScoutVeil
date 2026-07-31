// src/modules/competitors/components/CompetitorList.tsx
import type { ReactElement } from "react";
import { Radar } from "lucide-react";
import Loader from "../../../shared/components/Loader";
import EmptyState from "../../../shared/components/EmptyState";
import Button from "../../../shared/components/Button";
import CompetitorCard from "./CompetitorCard";
import type { Competitor } from "../types";

type CompetitorListProps = {
  competitors: Competitor[];
  isLoading: boolean;
  error: string | null;
  onAddClick: () => void;
};

export default function CompetitorList({
  competitors,
  isLoading,
  error,
  onAddClick,
}: CompetitorListProps): ReactElement {
  if (isLoading) return <Loader label="Loading competitors" />;

  if (error) {
    return (
      <EmptyState
        icon={Radar}
        title="Something went wrong"
        description={error}
      />
    );
  }

  if (competitors.length === 0) {
    return (
      <EmptyState
        icon={Radar}
        title="No competitors tracked yet"
        description="Add a domain to start catching homepage and pricing changes automatically."
        action={<Button onClick={onAddClick}>Add competitor</Button>}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {competitors.map((competitor) => (
        <CompetitorCard key={competitor.id} competitor={competitor} />
      ))}
    </div>
  );
}
