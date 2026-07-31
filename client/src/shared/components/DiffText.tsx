// src/shared/components/DiffText.tsx
import type { ReactElement } from "react";

export type DiffLine = {
  type: "added" | "removed" | "context";
  text: string;
};

type DiffTextProps = {
  lines: DiffLine[];
};

const lineStyles: Record<DiffLine["type"], string> = {
  added: "text-[#4ADE9E]",
  removed: "text-[#E85A4A]/70 line-through decoration-[#E85A4A]/40",
  context: "text-[#94A3B8]",
};

const prefix: Record<DiffLine["type"], string> = {
  added: "+",
  removed: "−",
  context: " ",
};

/** Renders a list of diff lines, monospace, git-diff style. Shared
 *  between the website diff viewer and anywhere else a before/after
 *  text comparison needs to show up (OSINT diffs, later). */
export default function DiffText({ lines }: DiffTextProps): ReactElement {
  return (
    <div className="font-mono text-xs leading-relaxed rounded-xl border border-white/10 bg-black/20 p-4 overflow-x-auto">
      {lines.map((line, i) => (
        <div key={i} className={`flex gap-3 ${lineStyles[line.type]}`}>
          <span className="select-none opacity-50 shrink-0">
            {prefix[line.type]}
          </span>
          <span className="whitespace-pre-wrap break-words">{line.text}</span>
        </div>
      ))}
    </div>
  );
}
