import type { ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function OrDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs text-[#565A72] font-mono uppercase tracking-wide">or</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function ErrorBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-[#E85A4A]/25 bg-[#E85A4A]/8 px-3.5 py-3 text-sm text-[#E4E2ED] mb-5">
      <AlertCircle className="w-4 h-4 text-[#E85A4A] shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

export function SuccessBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-[#4ADE9E]/25 bg-[#4ADE9E]/8 px-3.5 py-3 text-sm text-[#E4E2ED] mb-5">
      <CheckCircle2 className="w-4 h-4 text-[#4ADE9E] shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

export function SubmitButton({
  children,
  isLoading,
  disabled,
}: {
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="w-full flex items-center justify-center gap-2 rounded-full bg-[#E8A64A] hover:bg-[#F0B96B] disabled:opacity-50 disabled:pointer-events-none transition-colors text-[#0B0D14] text-sm font-medium px-5 py-2.5"
    >
      {isLoading && (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-[#0B0D14]/40 border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  );
}