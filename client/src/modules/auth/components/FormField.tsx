import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, id, className = "", ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-xs font-medium text-[#94A3B8] tracking-wide">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`w-full rounded-lg bg-white/3 border px-3.5 py-2.5 text-sm text-[#E4E2ED] placeholder:text-[#565A72] outline-none transition-colors focus:bg-white/5 ${
            error
              ? "border-[#E85A4A]/60 focus:border-[#E85A4A]"
              : "border-white/10 focus:border-[#E8A64A]/60"
          } ${className}`}
          {...rest}
        />
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

FormField.displayName = "FormField";

export default FormField;