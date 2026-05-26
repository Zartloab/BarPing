import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

const base =
  "tap-highlight inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-45";

export function PrimaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} bg-venue-amber text-venue-ink shadow-amber hover:bg-venue-amberSoft ${className}`}
      {...props}
    />
  );
}

export function SecondaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} warm-border bg-transparent text-venue-cream hover:border-venue-amber/50 hover:bg-venue-amber/10 ${className}`}
      {...props}
    />
  );
}

export function DangerButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} border border-venue-danger/40 bg-venue-danger/10 text-venue-danger hover:bg-venue-danger/15 ${className}`}
      {...props}
    />
  );
}

export function PrimaryLink({ className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      className={`${base} bg-venue-amber text-venue-ink shadow-amber hover:bg-venue-amberSoft ${className}`}
      {...props}
    />
  );
}

export function SecondaryLink({ className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      className={`${base} warm-border bg-transparent text-venue-cream hover:border-venue-amber/50 hover:bg-venue-amber/10 ${className}`}
      {...props}
    />
  );
}
