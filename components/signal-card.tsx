"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShieldAlert } from "lucide-react";
import type { Guest } from "@/lib/types";
import { formatVisibleUntil } from "@/lib/ux";
import { SignalMark } from "@/components/signal-mark";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function SignalCard({
  guest,
  onPing,
  onReport,
  index = 0
}: {
  guest: Guest;
  onPing?: (guest: Guest) => void;
  onReport?: (guest: Guest) => void;
  index?: number;
}) {
  const tone = index % 3 === 0 ? "amber" : index % 3 === 1 ? "blue" : "olive";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.24 }}
      className="glass-card rounded-[28px] p-4"
    >
      <div className="flex items-start gap-3">
        <SignalMark tone={tone} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-venue-cream">{guest.alias}</h3>
              <p className="mt-1 text-xs text-venue-muted">{guest.mode}</p>
            </div>
            <span className="rounded-full bg-venue-amber/12 px-3 py-1 text-xs font-medium text-venue-amberSoft">
              {guest.vibe}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-venue-muted">{guest.note}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {guest.topics.map((topic) => (
          <span
            key={topic}
            className={`rounded-full border px-3 py-1 text-xs ${
              guest.sharedTopics?.includes(topic)
                ? "border-venue-amber/40 bg-venue-amber/10 text-venue-amberSoft"
                : "border-white/[0.08] bg-white/[0.03] text-venue-muted"
            }`}
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-venue-dim">
          {formatVisibleUntil(guest.expiresAt)}
        </p>
        <div className="flex gap-2">
          {onReport ? (
            <SecondaryButton className="min-h-10 px-3" aria-label={`Report ${guest.alias}`} onClick={() => onReport(guest)}>
              <ShieldAlert size={16} />
            </SecondaryButton>
          ) : null}
          {onPing ? (
            <PrimaryButton className="min-h-10 px-4" onClick={() => onPing(guest)}>
              <MessageCircle size={16} />
              Send Hello
            </PrimaryButton>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
