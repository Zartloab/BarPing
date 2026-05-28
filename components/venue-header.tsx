import { UsersRound } from "lucide-react";
import type { Event, Venue } from "@/lib/types";
import { formatEventTime } from "@/lib/time";

export function VenueHeader({ venue, event, count }: { venue: Venue; event: Event; count: number }) {
  return (
    <header className="sticky top-3 z-20 mb-5 rounded-[28px] border border-white/[0.08] bg-venue-raised/90 p-4 shadow-soft backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-venue-olive">
            <span className="h-2 w-2 rounded-full bg-venue-olive shadow-[0_0_16px_rgba(124,255,203,0.42)]" />
            {event.isLive ? "Live now" : "Scheduled"}
          </div>
          <h1 className="text-lg font-semibold leading-tight text-venue-cream">{venue.name}</h1>
          <p className="mt-1 text-sm text-venue-muted">{event.title} - {formatEventTime(event.startsAt, event.endsAt)}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-venue-cream">
          <UsersRound size={16} />
          {count} Circles
        </div>
      </div>
    </header>
  );
}
