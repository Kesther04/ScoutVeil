// src/shared/components/Input.tsx
import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-xs font-medium text-[#94A3B8]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full bg-white/4 border rounded-lg px-3.5 py-2.5 text-sm text-[#E4E2ED] placeholder:text-[#565A72] focus:outline-none transition-colors ${
            error
              ? "border-[#E85A4A]/50 focus:border-[#E85A4A]"
              : "border-white/10 focus:border-[#E8A64A]/50"
          } ${className}`}
          {...rest}
        />
        {error ? (
          <p className="text-xs text-[#E85A4A]">{error}</p>
        ) : hint ? (
          <p className="text-xs text-[#565A72]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
