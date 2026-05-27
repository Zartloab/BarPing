import type { ReactNode } from "react";
import type { Event, Venue } from "@/lib/types";

export function StatusPill({ status }: { status: "Set up" | "Live" | "After" | "Closed" | "Paused" }) {
  const live = status === "Live";
  const danger = status === "Closed";

  return (
    <span
      className={`inline-flex min-h-7 items-center gap-2 rounded-[999px] border px-3 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em] ${
        live
          ? "border-venue-olive/25 bg-[#dfece0] text-venue-olive"
          : danger
            ? "border-venue-danger/25 bg-[#f6d4c7] text-venue-danger"
            : "border-venue-soft bg-white text-venue-muted"
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
    <header className="border-b border-venue-soft bg-white py-4">
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
    <div className="inline-grid grid-cols-3 rounded-[12px] border border-venue-soft bg-venue-raised p-1">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`min-h-9 rounded-[9px] px-4 text-sm font-medium transition ${
            value === item ? "bg-white text-venue-cream shadow-[0_1px_6px_rgba(24,29,38,0.08)]" : "text-venue-muted hover:text-venue-cream"
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
