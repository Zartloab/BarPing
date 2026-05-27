import type { ReactNode } from "react";

export function AppShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-venue-ink text-venue-cream">
      <div className="pointer-events-none absolute inset-0">
        <div className={`absolute left-1/2 top-[-18rem] -translate-x-1/2 rounded-full bg-venue-amber blur-3xl ${wide ? "h-[28rem] w-[44rem] opacity-[0.08]" : "h-[30rem] w-[30rem] opacity-20"}`} />
        <div className={`absolute right-[-18rem] top-28 rounded-full bg-venue-blue blur-3xl ${wide ? "h-[24rem] w-[24rem] opacity-[0.055]" : "h-[26rem] w-[26rem] opacity-20"}`} />
        {!wide ? <div className="absolute bottom-[-18rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-venue-olive/15 blur-3xl" /> : null}
      </div>
      <div className={`relative mx-auto min-h-dvh px-5 ${wide ? "max-w-[1180px] py-5 md:px-8 md:py-7" : "max-w-[430px] py-5"}`}>
        {children}
      </div>
    </main>
  );
}
