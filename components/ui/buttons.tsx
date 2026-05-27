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
  "tap-highlight inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-45";

export function PrimaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} bg-venue-amber text-venue-ink shadow-[0_10px_24px_rgba(24,29,38,0.12)] hover:bg-venue-amberSoft ${className}`}
      {...props}
    />
  );
}

export function SecondaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} border border-venue-soft bg-white text-venue-cream hover:border-venue-cream/30 hover:bg-venue-raised ${className}`}
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
      className={`${base} bg-venue-amber text-venue-ink shadow-[0_10px_24px_rgba(24,29,38,0.12)] hover:bg-venue-amberSoft ${className}`}
      {...props}
    />
  );
}

export function SecondaryLink({ className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      className={`${base} border border-venue-soft bg-white text-venue-cream hover:border-venue-cream/30 hover:bg-venue-raised ${className}`}
      {...props}
    />
  );
}
