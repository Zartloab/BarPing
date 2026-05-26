"use client";

import { useEffect, useState } from "react";
import { Flag, X } from "lucide-react";
import type { FindMeSession } from "@/lib/types";

export function FindMeBeacon({
  session,
  onEnd,
  onReport
}: {
  session: FindMeSession;
  onEnd: () => void;
  onReport: () => void;
}) {
  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.ceil((new Date(session.expiresAt).getTime() - Date.now()) / 1000))
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, Math.ceil((new Date(session.expiresAt).getTime() - Date.now()) / 1000)));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session.expiresAt]);

  useEffect(() => {
    if (remaining === 0) {
      onEnd();
    }
  }, [remaining, onEnd]);

  return (
    <div
      className="fixed inset-0 z-[80] flex min-h-dvh flex-col justify-between p-5 text-venue-ink"
      style={{ background: session.colorToken }}
    >
      <div className="flex items-center justify-between">
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-black/18 px-4 text-sm font-semibold text-white backdrop-blur"
          onClick={onEnd}
          type="button"
        >
          <X size={17} />
          End
        </button>
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-black/18 px-4 text-sm font-semibold text-white backdrop-blur"
          onClick={onReport}
          type="button"
        >
          <Flag size={17} />
          Report
        </button>
      </div>
      <div className="mx-auto w-full max-w-[430px] text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/65">Find Me</p>
        <h1 className="mt-4 font-serif text-6xl leading-none text-black/85">{session.colorName}</h1>
        <p className="mx-auto mt-5 max-w-xs text-lg font-medium leading-relaxed text-black/72">
          Hold your phone up if you want to be found. Stay where you feel comfortable.
        </p>
        <div className="mx-auto mt-8 grid h-28 w-28 place-items-center rounded-full bg-black/14 text-4xl font-semibold text-white shadow-[0_0_80px_rgba(0,0,0,0.2)]">
          {remaining}
        </div>
      </div>
      <p className="mx-auto max-w-[360px] rounded-full bg-black/16 px-4 py-3 text-center text-sm font-medium text-white backdrop-blur">
        No GPS, no direction, no exact location. Both screens show only this color.
      </p>
    </div>
  );
}
