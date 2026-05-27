import type { ReactNode } from "react";
import type { Event, Venue } from "@/lib/types";

export function StatusPill({ status }: { status: "Set up" | "Live" | "After" | "Closed" | "Paused" }) {
  const live = status === "Live";
  const danger = status === "Closed";

  return (
    <span
      className={`inline-flex min-h-7 items-center gap-2 rounded-full border px-3 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${
        live
          ? "border-venue-amber/35 bg-venue-amber/12 text-venue-amberSoft"
          : danger
            ? "border-venue-danger/30 bg-venue-danger/10 text-venue-danger"
            : "border-white/[0.1] bg-white/[0.035] text-venue-muted"
      }`}
    >
      {live ? <span className="h-1.5 w-1.5 rounded-full bg-venue-amber" /> : null}
      {status}
    </span>
  );
}

export function VenueConsoleHeader({
  venue,
  event,
  status,
  summary,
  action
}: {
  venue: Venue;
  event: Event;
  status: "Set up" | "Live" | "After" | "Closed" | "Paused";
  summary: string;
  action: ReactNode;
}) {
  return (
    <header className="venue-panel-flat rounded-[24px] px-4 py-4 md:px-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-venue-dim">{venue.name}</p>
            <StatusPill status={status} />
          </div>
          <h1 className="mt-2 truncate text-2xl font-semibold tracking-[-0.02em] text-venue-cream md:text-3xl">{event.title}</h1>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-venue-muted">{summary}</p>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </header>
  );
}

export function StageControl<T extends string>({
  value,
  items,
  onChange
}: {
  value: T;
  items: T[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="inline-grid grid-cols-3 rounded-full border border-white/[0.08] bg-black/20 p-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`min-h-9 rounded-full px-4 text-sm font-semibold transition ${
            value === item ? "bg-venue-cream text-venue-ink" : "text-venue-muted hover:text-venue-cream"
          }`}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export function ConsolePanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-panel rounded-[20px] p-4 md:p-5 ${className}`}>{children}</section>;
}

export function CommandPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-command rounded-[20px] p-4 md:p-5 ${className}`}>{children}</section>;
}

export function UtilityPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-panel-flat rounded-[18px] p-4 ${className}`}>{children}</section>;
}

export function SafetyPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-safety rounded-[20px] p-4 md:p-5 ${className}`}>{children}</section>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-venue-dim">{children}</p>;
}
