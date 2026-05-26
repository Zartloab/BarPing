"use client";

import { useState } from "react";
import { Check, LockKeyhole } from "lucide-react";
import type { ContactExchange } from "@/lib/types";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function ContactExchangeCard({ exchange }: { exchange: ContactExchange }) {
  const [mineConsented, setMineConsented] = useState(exchange.userAConsented);
  const [contact, setContact] = useState(exchange.userAContact ?? "");
  const mutual = mineConsented && exchange.userBConsented;

  return (
    <section className="glass-card rounded-[28px] p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-venue-blue/15 text-venue-amberSoft">
          <LockKeyhole size={18} />
        </div>
        <div>
          <h2 className="font-semibold text-venue-cream">Share contact?</h2>
          <p className="mt-1 text-sm leading-relaxed text-venue-muted">
            Contact only appears if both people agree. You can also write &quot;ask me in person.&quot;
          </p>
        </div>
      </div>
      <input
        value={contact}
        onChange={(event) => setContact(event.target.value)}
        placeholder="Instagram, phone, email, or ask me in person"
        className="mt-4 min-h-12 w-full rounded-full border border-white/[0.08] bg-venue-soft px-4 text-sm text-venue-cream outline-none placeholder:text-venue-dim focus:border-venue-amber/60"
      />
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <PrimaryButton onClick={() => setMineConsented(true)} disabled={mineConsented}>
          <Check size={16} />
          {mineConsented ? "Shared" : "Share if mutual"}
        </PrimaryButton>
        <SecondaryButton onClick={() => setMineConsented(false)}>Keep private</SecondaryButton>
      </div>
      {mutual ? (
        <div className="mt-4 rounded-[20px] border border-venue-amber/35 bg-venue-amber/10 p-3 text-sm text-venue-amberSoft">
          Mutual consent confirmed. Their contact: {exchange.userBContact ?? "ask me in person"}
        </div>
      ) : (
        <p className="mt-3 text-xs text-venue-dim">
          Waiting for mutual consent. Nothing is revealed yet.
        </p>
      )}
    </section>
  );
}
