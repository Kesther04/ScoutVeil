// src/shared/components/Modal.tsx
import type { ReactElement, ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalProps): ReactElement | null {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#12141D] shadow-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-[#E4E2ED] font-medium">{title}</h2>
            {subtitle && (
              <p className="text-xs text-[#94A3B8] mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#E4E2ED] hover:bg-white/5 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
