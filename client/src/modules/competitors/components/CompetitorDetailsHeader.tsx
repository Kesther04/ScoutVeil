// src/modules/competitors/components/CompetitorDetailsHeader.tsx
import type { ReactElement } from "react";
import { ArrowLeft, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../../../shared/components/Badge";
import { formatDate } from "../../../shared/utils/formatDate";
import type { Competitor } from "../types";

type CompetitorDetailsHeaderProps = {
  competitor: Competitor;
};

export default function CompetitorDetailsHeader({
  competitor,
}: CompetitorDetailsHeaderProps): ReactElement {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <Link
        to="/app/competitors"
        className="inline-flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#E4E2ED] transition-colors w-fit"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        All competitors
      </Link>

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
          <Globe className="w-5 h-5 text-[#94A3B8]" strokeWidth={1.75} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-medium text-[#E4E2ED] truncate">
              {competitor.name || competitor.domain}
            </h2>
            <Badge
              tone={competitor.status === "active" ? "green" : "neutral"}
              dot
            >
              {competitor.status === "active" ? "Tracking" : "Paused"}
            </Badge>
          </div>
          <p className="text-sm text-[#94A3B8] mt-0.5">
            {competitor.domain} · added {formatDate(competitor.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}
