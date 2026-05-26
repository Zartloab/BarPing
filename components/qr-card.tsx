import { Download, Printer } from "lucide-react";
import type { Event } from "@/lib/types";
import { SecondaryButton } from "@/components/ui/buttons";

export function QRCard({ event }: { event: Event }) {
  const eventUrl = `/e/${event.slug}`;
  return (
    <section className="glass-card rounded-[28px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Event QR</p>
          <h2 className="mt-2 text-lg font-semibold text-venue-cream">{event.title}</h2>
          <p className="mt-1 break-all text-sm text-venue-muted">{eventUrl}</p>
        </div>
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-venue-cream p-2 text-venue-ink">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, index) => (
              <span key={index} className={`h-3 w-3 rounded-[3px] ${index % 2 || index % 7 === 0 ? "bg-venue-ink" : "bg-transparent"}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <SecondaryButton className="min-h-10 px-4">
          <Download size={16} />
          Download
        </SecondaryButton>
        <SecondaryButton className="min-h-10 px-4">
          <Printer size={16} />
          Print
        </SecondaryButton>
      </div>
    </section>
  );
}
