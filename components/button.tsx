import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-clinic/30 focus:ring-offset-2",
        variant === "primary" &&
          "bg-ink text-white shadow-soft hover:-translate-y-0.5 hover:bg-clinic hover:shadow-glow",
        variant === "secondary" &&
          "border border-white/70 bg-white/68 text-ink shadow-[0_12px_40px_rgba(23,33,43,0.08)] backdrop-blur-xl hover:-translate-y-0.5 hover:border-clinic/20 hover:bg-white",
        variant === "ghost" &&
          "bg-transparent text-ink/72 hover:bg-white/60 hover:text-ink",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
