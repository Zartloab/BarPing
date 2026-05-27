import type { ReactNode } from "react";
import type { Event, Venue } from "@/lib/types";

export function StatusPill({ status }: { status: "Set up" | "Live" | "After" | "Closed" | "Paused" }) {
  const live = status === "Live";
  const danger = status === "Closed";

  return (
    <span
      className={`inline-flex min-h-7 items-center gap-2 rounded-[999px] border px-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] ${
        live
          ? "border-venue-olive/40 bg-venue-olive/10 text-venue-olive"
          : danger
            ? "border-venue-danger/35 bg-venue-danger/10 text-venue-danger"
            : "border-venue-soft bg-venue-card text-venue-muted"
      }`}
    >
      {live ? <span className="h-1.5 w-1.5 rounded-full bg-venue-olive" /> : null}
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
    <header className="border-b border-venue-soft bg-transparent py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-medium text-venue-muted">{venue.name}</p>
            <StatusPill status={status} />
          </div>
          <h1 className="mt-2 truncate text-2xl font-medium tracking-[-0.01em] text-venue-cream md:text-[2rem]">{event.title}</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-venue-muted">{summary}</p>
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
    <div className="inline-grid rounded-[12px] border border-venue-soft bg-venue-raised p-1" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`min-h-9 rounded-[9px] px-4 text-sm font-medium transition ${
            value === item ? "bg-venue-card text-venue-cream shadow-[0_1px_8px_rgba(0,0,0,0.24)]" : "text-venue-muted hover:text-venue-cream"
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
  return <section className={`venue-panel rounded-[12px] p-4 md:p-5 ${className}`}>{children}</section>;
}

export function CommandPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-command rounded-[12px] p-4 md:p-5 ${className}`}>{children}</section>;
}

export function UtilityPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-panel-flat rounded-[12px] p-4 ${className}`}>{children}</section>;
}

export function SafetyPanel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`venue-safety rounded-[12px] p-4 md:p-5 ${className}`}>{children}</section>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-xs font-medium text-venue-dim">{children}</p>;
}
