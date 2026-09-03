import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

const base =
  "focus-ring inline-flex items-center justify-center gap-2 px-7 py-3.5 font-display uppercase tracking-wide text-sm transition-all duration-300 ease-out";

const variants = {
  primary:
    "bg-amber text-ground hover:bg-amber-glow hover:shadow-[0_0_28px_rgba(255,195,0,0.45)] active:scale-[0.98]",
  ghost:
    "border border-bone/30 text-bone hover:border-amber hover:text-amber active:scale-[0.98]",
};

type Variant = keyof typeof variants;

export function Button({
  href,
  variant = "primary",
  children,
  className = "",
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = `${base} ${variants[variant]} ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function ButtonEl({
  variant = "primary",
  children,
  className = "",
  ...rest
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
