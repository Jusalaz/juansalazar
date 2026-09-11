import Link from "next/link";
import { ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-dark" | "accent" | "ghost";
  className?: string;
};

const variants: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-inverse text-white hover:bg-berry transition-colors duration-200",
  secondary:
    "bg-transparent text-ink border-2 border-ink hover:bg-inverse hover:text-white transition-colors duration-200",
  "secondary-dark":
    "bg-transparent text-white border-2 border-white/40 hover:border-white hover:bg-white/10 transition-colors duration-200",
  accent:
    "bg-coral text-white hover:bg-coral-dark transition-colors duration-200",
  ghost: "bg-transparent text-accent hover:text-ink transition-colors duration-200",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
