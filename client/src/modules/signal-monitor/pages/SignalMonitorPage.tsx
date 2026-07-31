// src/modules/signal-monitor/pages/SignalMonitorPage.tsx
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useWebsiteChanges } from "../hooks/useWebsiteChanges";
import ChangeHistoryTimeline from "../components/ChangeHistoryTimeline";

export default function SignalMonitorPage(): ReactElement {
  const { changes, isLoading, error } = useWebsiteChanges();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#94A3B8]">
          {isLoading
            ? "Checking for changes…"
            : `${changes.length} change${changes.length === 1 ? "" : "s"} detected`}
        </p>
        <Link
          to="/app/signals/history"
          className="text-xs text-[#94A3B8] hover:text-[#E4E2ED] transition-colors"
        >
          View full history →
        </Link>
      </div>

      <ChangeHistoryTimeline
        changes={changes}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
