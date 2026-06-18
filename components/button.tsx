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
        "group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-clinic/30 focus:ring-offset-2",
        variant === "primary" &&
          "bg-ink text-white shadow-soft hover:-translate-y-1 hover:bg-clinic hover:shadow-glow",
        variant === "secondary" &&
          "border border-white/70 bg-white/68 text-ink shadow-[0_12px_40px_rgba(23,33,43,0.08)] backdrop-blur-xl hover:-translate-y-1 hover:border-clinic/20 hover:bg-white hover:shadow-[0_20px_70px_rgba(23,33,43,0.12)]",
        variant === "ghost" &&
          "bg-transparent text-ink/72 hover:bg-white/60 hover:text-ink",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.34),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center justify-center gap-2">{children}</span>
    </a>
  );
}
