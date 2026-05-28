"use client";

import { motion } from "framer-motion";
import type { Guest } from "@/lib/types";
import { DangerButton, PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function PingModal({
  guest,
  incoming,
  onClose,
  onAccept,
  onIgnore,
  onBlock
}: {
  guest: Guest | null;
  incoming?: boolean;
  onClose: () => void;
  onAccept?: () => void;
  onIgnore?: () => void;
  onBlock?: () => void;
}) {
  if (!guest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="glass-card w-full max-w-[430px] rounded-[30px] p-5"
      >
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">
          {incoming ? "Incoming Hello" : "Hello sent"}
        </p>
        <h2 className="mt-3 font-serif text-3xl text-venue-cream">{guest.alias}</h2>
        <p className="mt-2 text-sm leading-relaxed text-venue-muted">
          {incoming
            ? `${guest.alias} sent a Hello. You can accept, ignore, or block.`
            : "A Circle-scoped Hello has been sent. If they accept, a temporary chat opens for tonight."}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {guest.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-venue-muted">
              {topic}
            </span>
          ))}
        </div>
        <div className="mt-6 grid gap-2">
          {incoming ? (
            <>
              <PrimaryButton onClick={onAccept}>Say hello</PrimaryButton>
              <SecondaryButton onClick={onIgnore}>Not tonight</SecondaryButton>
              <DangerButton onClick={onBlock}>Block/report</DangerButton>
            </>
          ) : (
            <PrimaryButton onClick={onClose}>Back to room</PrimaryButton>
          )}
        </div>
      </motion.div>
    </div>
  );
}
