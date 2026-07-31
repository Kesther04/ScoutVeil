// src/modules/signal-monitor/components/website/WebsiteDiffViewer.tsx
import type { ReactElement } from "react";
import DiffText from "../../../../shared/components/DiffText";
import PricingPageSnapshot from "./PricingPageSnapshot";
import type { WebsiteChange } from "../../types";

type WebsiteDiffViewerProps = {
  change: WebsiteChange;
};

export default function WebsiteDiffViewer({
  change,
}: WebsiteDiffViewerProps): ReactElement {
  const hasSnapshots = change.beforeSnapshotUrl || change.afterSnapshotUrl;

  return (
    <div className="flex flex-col gap-4 pt-1">
      {hasSnapshots && (
        <div className="flex gap-3">
          <PricingPageSnapshot
            label="Before"
            snapshotUrl={change.beforeSnapshotUrl}
          />
          <PricingPageSnapshot
            label="After"
            snapshotUrl={change.afterSnapshotUrl}
          />
        </div>
      )}

      {change.diffLines && change.diffLines.length > 0 ? (
        <DiffText lines={change.diffLines} />
      ) : (
        <p className="text-xs text-[#565A72] font-mono">
          No line-level diff available for this change.
        </p>
      )}
    </div>
  );
}
