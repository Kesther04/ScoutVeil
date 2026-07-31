// src/shared/components/Loader.tsx
import type { ReactElement } from "react";

type LoaderProps = {
  label?: string;
  fullHeight?: boolean;
};

export default function Loader({
  label = "Loading…",
  fullHeight = false,
}: LoaderProps): ReactElement {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 text-[#94A3B8] ${
        fullHeight ? "min-h-[40vh]" : "py-16"
      }`}
    >
      <div className="h-6 w-6 rounded-full border-2 border-white/10 border-t-[#E8A64A] animate-spin" />
      <span className="text-xs font-mono uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
