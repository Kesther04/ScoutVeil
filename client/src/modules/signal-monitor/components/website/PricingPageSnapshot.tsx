// src/modules/signal-monitor/components/website/PricingPageSnapshot.tsx
import type { ReactElement } from "react";
import { ImageOff, ExternalLink } from "lucide-react";

type PricingPageSnapshotProps = {
  label: string;
  snapshotUrl?: string | null;
};

/** Thumbnail preview of a captured page snapshot (before or after a
 *  change). Used inside the diff viewer for both homepage and pricing
 *  page snapshots. */
export default function PricingPageSnapshot({
  label,
  snapshotUrl,
}: PricingPageSnapshotProps): ReactElement {
  return (
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-2">
        {label}
      </p>
      {snapshotUrl ? (
        <a
          href={snapshotUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative block rounded-lg border border-white/10 overflow-hidden aspect-video bg-black/30"
        >
          <img
            src={snapshotUrl}
            alt={`${label} snapshot`}
            className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="absolute top-2 right-2 w-6 h-6 rounded-md bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="w-3 h-3 text-white" />
          </span>
        </a>
      ) : (
        <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 aspect-video bg-black/20 text-[#565A72]">
          <ImageOff className="w-4 h-4" />
          <span className="text-xs">No snapshot</span>
        </div>
      )}
    </div>
  );
}
