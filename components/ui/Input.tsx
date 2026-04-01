import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-white/60">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full h-11 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 text-sm text-white",
              "placeholder:text-white/30",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent",
              "disabled:opacity-50 disabled:bg-white/[0.02]",
              leftIcon && "pl-10",
              error && "border-red-400/50 focus:ring-red-400/50",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-white/30">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input };
