import type { ReactNode } from "react";

export function AdminMetricCard({
  label,
  value,
  detail,
  icon
}: {
  label: string;
  value: string | number;
  detail: string;
  icon?: ReactNode;
}) {
  return (
    <article className="glass-card rounded-[24px] p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-venue-muted">{label}</p>
        {icon ? <div className="text-venue-amberSoft">{icon}</div> : null}
      </div>
      <p className="mt-3 text-3xl font-semibold text-venue-cream">{value}</p>
      <p className="mt-1 text-xs text-venue-dim">{detail}</p>
    </article>
  );
}
