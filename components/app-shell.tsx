import type { ReactNode } from "react";

export function AppShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-venue-ink text-venue-cream">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-venue-amber/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-36 h-[26rem] w-[26rem] rounded-full bg-venue-blue/20 blur-3xl" />
        <div className="absolute bottom-[-18rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-venue-olive/15 blur-3xl" />
      </div>
      <div className={`relative mx-auto min-h-dvh px-5 py-5 ${wide ? "max-w-6xl" : "max-w-[430px]"}`}>
        {children}
      </div>
    </main>
  );
}
