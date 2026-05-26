import { ShieldCheck } from "lucide-react";
import { safetyNotice } from "@/lib/constants";

export function SafetyNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`warm-border flex gap-3 rounded-[24px] bg-venue-soft/80 ${compact ? "p-3" : "p-4"}`}>
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-venue-olive/20 text-venue-amberSoft">
        <ShieldCheck size={17} />
      </div>
      <p className={`${compact ? "text-xs" : "text-sm"} leading-relaxed text-venue-muted`}>{safetyNotice}</p>
    </div>
  );
}
