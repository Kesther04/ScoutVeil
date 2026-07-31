// src/shared/components/Button.tsx
import type { ButtonHTMLAttributes, ReactElement } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#E8A64A] hover:bg-[#F0B96B] text-[#0B0D14] disabled:hover:bg-[#E8A64A]",
  secondary:
    "bg-white/4 hover:bg-white/8 text-[#E4E2ED] border border-white/10",
  ghost: "bg-transparent hover:bg-white/5 text-[#94A3B8] hover:text-[#E4E2ED]",
  danger: "bg-[#E85A4A]/10 hover:bg-[#E85A4A]/20 text-[#E85A4A]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  className = "",
  children,
  ...rest
}: ButtonProps): ReactElement {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  );
}
