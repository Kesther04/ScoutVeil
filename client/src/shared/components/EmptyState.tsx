// src/shared/components/EmptyState.tsx
import type { ReactElement, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps): ReactElement {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-16">
      <div className="w-11 h-11 rounded-xl bg-[#E8A64A]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#E8A64A]" strokeWidth={1.75} />
      </div>
      <h3 className="text-[#E4E2ED] font-medium">{title}</h3>
      {description && (
        <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
