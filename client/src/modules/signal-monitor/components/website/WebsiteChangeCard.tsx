// src/modules/signal-monitor/components/website/WebsiteChangeCard.tsx
import { useState } from "react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Badge from "../../../../shared/components/Badge";
import { formatRelativeDate } from "../../../../shared/utils/formatDate";
import type { WebsiteChange } from "../../types";
import WebsiteDiffViewer from "./WebsiteDiffViewer";

type WebsiteChangeCardProps = {
  change: WebsiteChange;
  /** Hide the competitor name/link — used inside a competitor's own detail
   *  page where it would be redundant. */
  hideCompetitor?: boolean;
};

export default function WebsiteChangeCard({
  change,
  hideCompetitor = false,
}: WebsiteChangeCardProps): ReactElement {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-white/2 overflow-hidden">
      <button
        onClick={() => setIsExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left"
      >
        <Badge tone="amber">
          {change.pageType === "pricing" ? "Pricing" : "Homepage"}
        </Badge>

        <div className="min-w-0 flex-1">
          {!hideCompetitor && (
            <Link
              to={`/app/competitors/${change.competitorId}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium text-[#94A3B8] hover:text-[#E4E2ED] transition-colors"
            >
              {change.competitorName || change.competitorDomain}
            </Link>
          )}
          <p className="text-sm text-[#E4E2ED] truncate mt-0.5">
            {change.summary}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1 text-xs font-mono text-[#4ADE9E]">
            <Plus className="w-3 h-3" />
            {change.diffAddedCount}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-mono text-[#E85A4A]">
            <Minus className="w-3 h-3" />
            {change.diffRemovedCount}
          </span>
        </div>

        <span className="text-xs text-[#565A72] font-mono shrink-0">
          {formatRelativeDate(change.detectedAt)}
        </span>

        <ChevronDown
          className={`w-4 h-4 text-[#94A3B8] shrink-0 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="px-5 pb-5">
          <WebsiteDiffViewer change={change} />
        </div>
      )}
    </div>
  );
}
