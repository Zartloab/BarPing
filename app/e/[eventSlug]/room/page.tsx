"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Ban, Bell, Flag, MessageCircle, Sparkles, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EmptyRoomState } from "@/components/empty-room-state";
import { FeedbackSheet } from "@/components/feedback-sheet";
import { MotionShell } from "@/components/motion-shell";
import { PingModal } from "@/components/ping-modal";
import { SignalCard } from "@/components/signal-card";
import { PrimaryLink, SecondaryButton } from "@/components/ui/buttons";
import { VenueHeader } from "@/components/venue-header";
import { demoAnnouncements, demoEvent, demoGuests, demoPings, demoSocialWindows, demoTables, demoVenue } from "@/lib/demo-data";
import { containsAbusePlaceholder } from "@/lib/safety";
import type { Guest, GuestEntryChoice } from "@/lib/types";

type Tab = "People" | "Tables" | "Pings";

export default function RoomPage() {
  const params = useParams<{ eventSlug: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const [tab, setTab] = useState<Tab>("People");
  const [pingedGuest, setPingedGuest] = useState<Guest | null>(null);
  const [incoming, setIncoming] = useState<Guest | null>(demoGuests.find((guest) => guest.id === demoPings[0]?.fromUserId) ?? null);
  const [toast, setToast] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [entryChoice, setEntryChoice] = useState<GuestEntryChoice>("Join a table");
  const guests = useMemo(() => demoGuests, []);
  const socialWindowActive = demoSocialWindows.some((windowItem) => windowItem.status === "active");
  const recommendedTable = demoTables.find((table) => table.isSpotlighted) ?? demoTables[0];
  const canPing = entryChoice !== "Just browsing";

  useEffect(() => {
    const saved = window.localStorage.getItem("barping-profile");
    if (!saved) return;
    try {
      const profile = JSON.parse(saved) as { entryChoice?: GuestEntryChoice };
      if (profile.entryChoice) {
        setEntryChoice(profile.entryChoice);
        setTab(profile.entryChoice === "Open to pings" ? "People" : "Tables");
      }
    } catch {
      setEntryChoice("Join a table");
    }
  }, []);

  function sendPing(guest: Guest) {
    if (!canPing) {
      setToast("You are browsing tonight. Opt into pings first if you want to send one.");
      return;
    }
    if (!socialWindowActive) {
      setToast("Social Mode is paused. Pings open when the host starts the window.");
      return;
    }
    if (containsAbusePlaceholder(guest.note)) {
      setToast("This ping was held by the safety filter. Please keep it low-pressure.");
      return;
    }
    setPingedGuest(guest);
    setToast(`Ping sent to ${guest.alias}.`);
  }

  function reportGuest(guest: Guest) {
    setToast(`Report opened for ${guest.alias}. Venue staff can review this in the dashboard.`);
  }

  return (
    <AppShell>
      <VenueHeader venue={demoVenue} event={demoEvent} count={guests.length + 1} />
      <MotionShell className="pb-6">
        <div className="mb-4 grid grid-cols-3 gap-2 rounded-full border border-white/[0.08] bg-venue-raised p-1">
          {(["People", "Tables", "Pings"] as Tab[]).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`min-h-10 rounded-full text-sm font-semibold transition ${
                tab === item ? "bg-venue-amber text-venue-ink" : "text-venue-muted hover:text-venue-cream"
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {toast ? (
          <div className="mb-4 rounded-[22px] border border-venue-amber/30 bg-venue-amber/10 p-3 text-sm text-venue-amberSoft">
            {toast}
          </div>
        ) : null}

        <section className="mb-4 grid gap-3">
          {demoAnnouncements.map((announcement) => (
            <div key={announcement.id} className="flex gap-3 rounded-[22px] border border-white/[0.08] bg-white/[0.04] p-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <Bell size={16} />
              </div>
              <p className="text-sm leading-relaxed text-venue-muted">{announcement.body}</p>
            </div>
          ))}
        </section>

        {recommendedTable ? (
          <section className="mb-5 glass-card rounded-[28px] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">Recommended table</p>
                <h2 className="mt-2 text-xl font-semibold">{recommendedTable.name}</h2>
                <p className="mt-1 text-sm leading-relaxed text-venue-muted">{recommendedTable.prompt}</p>
                <p className="mt-3 text-xs text-venue-dim">
                  {recommendedTable.maxMembers - recommendedTable.memberCount} open seats - {recommendedTable.energyLevel ?? "Warming up"}
                </p>
              </div>
              <span className="rounded-full bg-venue-amber/12 px-3 py-1 text-xs text-venue-amberSoft">{entryChoice}</span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <PrimaryLink href={`/e/${eventSlug}/table/${recommendedTable.id}`}>Join table</PrimaryLink>
              <SecondaryButton onClick={() => setToast(`Host notified: place me at ${recommendedTable.name}.`)}>
                Ask host to place me
              </SecondaryButton>
            </div>
          </section>
        ) : null}

        {tab === "People" ? (
          <section className="grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Active people</h2>
                <p className="mt-1 text-sm text-venue-muted">Anonymous venue passes. No photos, no real names.</p>
              </div>
              <span className="rounded-full bg-white/[0.04] px-3 py-1 text-sm text-venue-muted">{guests.length}</span>
            </div>
            {guests.length ? (
              guests.map((guest, index) => (
                <SignalCard key={guest.id} guest={guest} index={index} onPing={canPing ? sendPing : undefined} onReport={reportGuest} />
              ))
            ) : (
              <EmptyRoomState />
            )}
          </section>
        ) : null}

        {tab === "Tables" ? (
          <section className="grid gap-4">
            <div>
              <h2 className="text-xl font-semibold">Group tables</h2>
              <p className="mt-1 text-sm text-venue-muted">Lower-pressure group rooms inside this event.</p>
            </div>
            {demoTables.map((table) => (
              <article key={table.id} className="glass-card rounded-[28px] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                      {table.isSpotlighted ? <Sparkles className="text-venue-amberSoft" size={17} /> : null}
                      {table.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-venue-muted">{table.description}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-white/[0.04] px-3 py-1 text-xs text-venue-muted">
                    <UsersRound size={14} />
                    {table.memberCount}/{table.maxMembers}
                  </div>
                </div>
                <div className="mt-4 rounded-[20px] border border-white/[0.08] bg-white/[0.035] p-3">
                  <p className="text-sm font-semibold text-venue-cream">{table.prompt}</p>
                  <p className="mt-1 text-xs text-venue-muted">
                    {table.maxMembers - table.memberCount} open seats - {table.energyLevel ?? "Warming up"} - Suggested for {table.suggestedTopics.join(", ")}
                  </p>
                </div>
                <div className="mt-4 grid gap-2">
                  <PrimaryLink className="w-full" href={`/e/${eventSlug}/table/${table.id}`}>Join table</PrimaryLink>
                  <SecondaryButton onClick={() => setToast(`Host notified: bring me into ${table.name}.`)}>
                    Bring me into a group
                  </SecondaryButton>
                  <SecondaryButton onClick={() => setToast(`Host notified: joining ${table.name} with a friend.`)}>
                    Join with a friend
                  </SecondaryButton>
                </div>
              </article>
            ))}
          </section>
        ) : null}

        {tab === "Pings" ? (
          <section className="grid gap-4">
            <div>
              <h2 className="text-xl font-semibold">Incoming pings</h2>
              <p className="mt-1 text-sm text-venue-muted">Accept, ignore, or block. No pressure either way.</p>
            </div>
            {incoming ? (
              <article className="glass-card rounded-[28px] p-4">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">You got a ping</p>
                <h3 className="mt-2 text-lg font-semibold">{incoming.alias}</h3>
                <p className="mt-2 text-sm text-venue-muted">{demoPings[0].message}</p>
                <div className="mt-4 grid gap-2">
                  <PrimaryLink href={`/e/${eventSlug}/chat/demo-chat`}>Accept</PrimaryLink>
                  <SecondaryButton onClick={() => setIncoming(null)}>
                    <Ban size={16} />
                    Ignore
                  </SecondaryButton>
                  <SecondaryButton onClick={() => reportGuest(incoming)}>
                    <Flag size={16} />
                    Report
                  </SecondaryButton>
                </div>
              </article>
            ) : (
              <div className="glass-card rounded-[28px] p-6 text-center">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-venue-blue/15 text-venue-amberSoft">
                  <MessageCircle size={21} />
                </div>
                <h3 className="font-semibold">No pending pings.</h3>
                <p className="mt-2 text-sm text-venue-muted">You can keep browsing the room or join a table.</p>
              </div>
            )}
          </section>
        ) : null}

        <section className="mt-6">
          {showFeedback ? (
            <FeedbackSheet onClose={() => setShowFeedback(false)} />
          ) : (
            <button
              className="w-full rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-4 text-left"
              onClick={() => setShowFeedback(true)}
              type="button"
            >
              <span className="block font-semibold text-venue-cream">Leaving the event?</span>
              <span className="mt-1 block text-sm text-venue-muted">Share a quick safety and usefulness check before you go.</span>
            </button>
          )}
        </section>
      </MotionShell>
      <PingModal guest={pingedGuest} onClose={() => setPingedGuest(null)} />
    </AppShell>
  );
}
