// src/shared/components/Badge.tsx
import type { ReactElement, ReactNode } from "react";

type BadgeTone = "amber" | "green" | "red" | "yellow" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  amber: "bg-[#E8A64A]/10 text-[#F0B96B]",
  green: "bg-[#4ADE9E]/10 text-[#4ADE9E]",
  red: "bg-[#E85A4A]/10 text-[#E85A4A]",
  yellow: "bg-[#E8C24A]/10 text-[#E8C24A]",
  neutral: "bg-white/5 text-[#94A3B8]",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
};

export default function Badge({
  children,
  tone = "neutral",
  dot = false,
}: BadgeProps): ReactElement {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
