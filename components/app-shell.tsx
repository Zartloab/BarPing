import type { ReactNode } from "react";

export function AppShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-venue-ink text-venue-cream">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-venue-cream/10" />
      <div className={`relative mx-auto min-h-dvh px-5 ${wide ? "max-w-[1240px] py-4 md:px-8 md:py-6" : "max-w-[430px] py-5"}`}>
        {children}
      </div>
    </main>
  );
}
