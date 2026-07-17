import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const [visible, setVisible] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-xs font-medium text-[#94A3B8] tracking-wide">
          {label}
        </label>
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={visible ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={`w-full rounded-lg bg-white/3 border px-3.5 py-2.5 pr-10 text-sm text-[#E4E2ED] placeholder:text-[#565A72] outline-none transition-colors focus:bg-white/5 ${
              error
                ? "border-[#E85A4A]/60 focus:border-[#E85A4A]"
                : "border-white/10 focus:border-[#E8A64A]/60"
            } ${className}`}
            {...rest}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#565A72] hover:text-[#94A3B8] transition-colors"
          >
            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-[#E85A4A]">
            {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-[#565A72]">{hint}</p>
        ) : null}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export default PasswordField;