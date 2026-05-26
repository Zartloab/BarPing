export function SignalMark({ tone = "amber" }: { tone?: "amber" | "blue" | "olive" }) {
  const toneClass = {
    amber: "from-venue-amber/75 to-venue-amberSoft/20 shadow-[0_0_34px_rgba(217,143,69,0.28)]",
    blue: "from-venue-blue/80 to-venue-blue/20 shadow-[0_0_34px_rgba(77,106,170,0.24)]",
    olive: "from-venue-olive/80 to-venue-olive/20 shadow-[0_0_34px_rgba(124,128,97,0.24)]"
  }[tone];

  return (
    <div className={`relative h-12 w-12 overflow-hidden rounded-2xl bg-gradient-to-br ${toneClass}`}>
      <span className="absolute left-2 top-2 h-8 w-8 rounded-full border border-white/30" />
      <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-white/25" />
      <span className="absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/30" />
    </div>
  );
}
