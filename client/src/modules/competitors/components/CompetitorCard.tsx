// src/modules/competitors/components/CompetitorCard.tsx
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Globe, MoreHorizontal } from "lucide-react";
import Badge from "../../../shared/components/Badge";
import { formatRelativeDate } from "../../../shared/utils/formatDate";
import type { Competitor } from "../types";

type CompetitorCardProps = {
  competitor: Competitor;
};

export default function CompetitorCard({
  competitor,
}: CompetitorCardProps): ReactElement {
  const hasChange = Boolean(competitor.lastChangeAt);

  return (
    <Link
      to={`/app/competitors/${competitor.id}`}
      className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 transition-colors px-5 py-4"
    >
      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <Globe className="w-4 h-4 text-[#94A3B8]" strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#E4E2ED] truncate">
            {competitor.name || competitor.domain}
          </span>
          {competitor.status === "paused" && (
            <Badge tone="neutral">Paused</Badge>
          )}
        </div>
        <p className="text-xs text-[#94A3B8] truncate mt-0.5">
          {competitor.domain}
        </p>
      </div>

      <div className="hidden sm:flex flex-col items-end min-w-0 max-w-[45%]">
        {hasChange ? (
          <>
            <div className="flex items-center gap-2">
              {competitor.lastChangePageType && (
                <Badge tone="amber">
                  {competitor.lastChangePageType === "pricing"
                    ? "Pricing"
                    : "Homepage"}
                </Badge>
              )}
              <span className="text-xs text-[#565A72] font-mono">
                {formatRelativeDate(competitor.lastChangeAt as string)}
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] truncate mt-1 max-w-full">
              {competitor.lastChangeSummary}
            </p>
          </>
        ) : (
          <span className="text-xs text-[#565A72] font-mono">
            No changes detected yet
          </span>
        )}
      </div>

      <MoreHorizontal className="w-4 h-4 text-[#565A72] group-hover:text-[#94A3B8] transition-colors shrink-0" />
    </Link>
  );
}
