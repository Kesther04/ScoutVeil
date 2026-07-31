// src/modules/dashboard/components/CompetitorOverviewGrid.tsx
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Globe, Plus } from "lucide-react";
import Badge from "../../../shared/components/Badge";
import { formatRelativeDate } from "../../../shared/utils/formatDate";
import type { DashboardCompetitorRow } from "../types";

type CompetitorOverviewGridProps = {
  competitors: DashboardCompetitorRow[];
};

export default function CompetitorOverviewGrid({
  competitors,
}: CompetitorOverviewGridProps): ReactElement {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {competitors.map((c) => (
        <Link
          key={c.id}
          to={`/app/competitors/${c.id}`}
          className="rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 transition-colors p-5 flex flex-col gap-3"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-[#E4E2ED] truncate">
                {c.name || c.domain}
              </p>
              <p className="text-xs text-[#94A3B8] truncate">{c.domain}</p>
            </div>
          </div>

          {c.lastChangeAt ? (
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {c.lastChangePageType && (
                  <Badge tone="amber">
                    {c.lastChangePageType === "pricing" ? "Pricing" : "Homepage"}
                  </Badge>
                )}
                <span className="text-xs text-[#565A72] font-mono">
                  {formatRelativeDate(c.lastChangeAt)}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                {c.lastChangeSummary}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#565A72] font-mono">
              No changes detected yet
            </p>
          )}
        </Link>
      ))}

      <Link
        to="/app/competitors"
        className="rounded-xl border border-dashed border-white/10 hover:border-[#E8A64A]/30 hover:bg-white/2 transition-colors p-5 flex flex-col items-center justify-center gap-2 text-[#94A3B8] hover:text-[#F0B96B] min-h-[120px]"
      >
        <Plus className="w-4 h-4" />
        <span className="text-xs font-medium">Add competitor</span>
      </Link>
    </div>
  );
}
