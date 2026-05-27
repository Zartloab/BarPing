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
      className={`${base} bg-venue-amber text-venue-ink shadow-[0_16px_36px_rgba(255,122,107,0.18)] hover:bg-venue-amberSoft ${className}`}
      {...props}
    />
  );
}

export function SecondaryButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} border border-venue-blue/30 bg-venue-blue/10 text-[#B9C7FF] hover:border-venue-blue/50 hover:bg-venue-blue/15 ${className}`}
      {...props}
    />
  );
}

export function DangerButton({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`${base} border border-venue-danger/45 bg-venue-danger/10 text-venue-danger hover:bg-venue-danger/15 ${className}`}
      {...props}
    />
  );
}

export function PrimaryLink({ className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      className={`${base} bg-venue-amber text-venue-ink shadow-[0_16px_36px_rgba(255,122,107,0.18)] hover:bg-venue-amberSoft ${className}`}
      {...props}
    />
  );
}

export function SecondaryLink({ className = "", ...props }: LinkButtonProps) {
  return (
    <Link
      className={`${base} border border-venue-blue/30 bg-venue-blue/10 text-[#B9C7FF] hover:border-venue-blue/50 hover:bg-venue-blue/15 ${className}`}
      {...props}
    />
  );
}
