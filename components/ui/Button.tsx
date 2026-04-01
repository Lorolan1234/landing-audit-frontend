import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-gradient-to-r from-indigo-500 to-rose-500 text-white hover:opacity-90 active:scale-[0.98] shadow-lg shadow-indigo-500/25",
      secondary:
        "bg-white/[0.05] text-white/70 border border-white/[0.1] hover:bg-white/[0.1] active:scale-[0.98]",
      ghost: "text-white/50 hover:bg-white/[0.05] hover:text-white/80",
      danger: "bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
export { Button };
