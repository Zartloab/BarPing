import { Coffee } from "lucide-react";

export function EmptyRoomState() {
  return (
    <div className="glass-card rounded-[28px] p-6 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
        <Coffee size={22} />
      </div>
      <h3 className="text-lg font-semibold text-venue-cream">You&apos;re early.</h3>
      <p className="mt-2 text-sm leading-relaxed text-venue-muted">
        Signal Night has started, but the room is still warming up.
      </p>
      <p className="mt-4 rounded-2xl bg-white/[0.04] px-4 py-3 text-sm text-venue-muted">
        Tonight&apos;s Drop: What song should play next?
      </p>
    </div>
  );
}
