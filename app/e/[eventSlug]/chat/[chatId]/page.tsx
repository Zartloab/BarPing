"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Flag, Lightbulb, LogOut, Send } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ContactExchangeCard } from "@/components/contact-exchange";
import { FeedbackSheet } from "@/components/feedback-sheet";
import { FindMeBeacon } from "@/components/find-me-beacon";
import { FindMeRequestModal } from "@/components/find-me-request-modal";
import { MotionShell } from "@/components/motion-shell";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { beaconPalette, openerChips } from "@/lib/constants";
import { demoContactExchange, demoEvent, demoFindMeSession, demoGuests, demoMessages } from "@/lib/demo-data";
import { containsAbusePlaceholder } from "@/lib/safety";
import { minutesRemaining, shortTime } from "@/lib/time";
import type { ChatMessage, FindMeSession } from "@/lib/types";

export default function ChatPage() {
  const params = useParams<{ eventSlug: string; chatId: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const other = demoGuests[1];
  const [messages, setMessages] = useState<ChatMessage[]>(demoMessages);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [findMeRequestOpen, setFindMeRequestOpen] = useState(false);
  const [beacon, setBeacon] = useState<FindMeSession | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  function sendMessage(text = body) {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (containsAbusePlaceholder(trimmed)) {
      setError("That message did not go through. Keep it kind and low-pressure.");
      return;
    }
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), sender: "me", body: trimmed, createdAt: new Date().toISOString() }
    ]);
    setError(null);
    setBody("");
  }

  function requestFindMe() {
    if (!demoEvent.findMeEnabled) {
      setError("Find Me is turned off for tonight. You can still chat or meet through a table.");
      return;
    }
    setFindMeRequestOpen(true);
  }

  function acceptFindMe() {
    const color = beaconPalette[0];
    setBeacon({
      ...demoFindMeSession,
      status: "active",
      colorToken: color.token,
      colorName: color.name,
      expiresAt: new Date(Date.now() + 90 * 1000).toISOString()
    });
    setFindMeRequestOpen(false);
  }

  function reportFindMe() {
    setError("Find Me was reported. Venue staff can review the session metadata.");
    setBeacon(null);
    setFindMeRequestOpen(false);
  }

  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col">
        <header className="sticky top-3 z-20 rounded-[28px] border border-white/[0.08] bg-venue-raised/90 p-4 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">Temporary chat</p>
              <h1 className="mt-1 text-lg font-semibold">{other.alias}</h1>
              <p className="mt-1 text-xs text-venue-muted">Expires in {minutesRemaining(demoEvent.endsAt)} min</p>
            </div>
            <div className="flex gap-2">
              {demoEvent.findMeEnabled ? (
                <SecondaryButton className="min-h-10 px-3" onClick={requestFindMe} aria-label="Find each other">
                  <Lightbulb size={16} />
                </SecondaryButton>
              ) : null}
              <SecondaryButton className="min-h-10 px-3" aria-label="Report chat">
                <Flag size={16} />
              </SecondaryButton>
              <Link
                className="tap-highlight inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.08] px-3 text-venue-muted"
                href={`/e/${eventSlug}/room`}
                aria-label="Leave chat"
              >
                <LogOut size={16} />
              </Link>
            </div>
          </div>
        </header>
        <section className="mt-4 grid gap-3">
          <div className="glass-card rounded-[24px] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-venue-amberSoft">Accepted ping</p>
                <h2 className="mt-1 font-semibold">Ready to find each other?</h2>
                <p className="mt-1 text-sm leading-relaxed text-venue-muted">
                  {demoEvent.findMeEnabled
                    ? "Find Me only starts after both people agree. Both phones show the same color for 90 seconds."
                    : "Find Me is turned off for this event. You can still meet through a table or keep chatting."}
                </p>
              </div>
              {demoEvent.findMeEnabled ? (
                <PrimaryButton className="min-h-10 shrink-0 px-4" onClick={requestFindMe}>
                  Find each other
                </PrimaryButton>
              ) : null}
            </div>
          </div>
          {error ? (
            <div className="rounded-[20px] border border-venue-danger/35 bg-venue-danger/10 p-3 text-sm text-venue-danger">
              {error}
            </div>
          ) : null}
        </section>
        <div className="scrollbar-warm mt-5 flex-1 space-y-3 overflow-y-auto pb-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "me" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-[22px] px-4 py-3 text-sm leading-relaxed ${
                  message.sender === "me"
                    ? "bg-venue-amber text-venue-ink"
                    : message.sender === "system"
                      ? "border border-white/[0.08] bg-white/[0.04] text-center text-venue-muted"
                      : "bg-venue-soft text-venue-cream"
                }`}
              >
                <p>{message.body}</p>
                {message.sender !== "system" ? (
                  <p className={`mt-1 text-[0.65rem] ${message.sender === "me" ? "text-venue-ink/65" : "text-venue-dim"}`}>
                    {shortTime(message.createdAt)}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {openerChips.slice(0, 4).map((chip) => (
            <button
              key={chip}
              onClick={() => sendMessage(chip)}
              type="button"
              className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-2 text-xs text-venue-muted"
            >
              {chip}
            </button>
          ))}
        </div>
        <ContactExchangeCard exchange={demoContactExchange} />
        {showFeedback ? (
          <div className="mt-4">
            <FeedbackSheet onClose={() => setShowFeedback(false)} />
          </div>
        ) : (
          <button
            className="mt-4 w-full rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-venue-muted"
            onClick={() => setShowFeedback(true)}
            type="button"
          >
            Leaving soon? Share quick feedback.
          </button>
        )}
        <form
          className="mt-4 flex gap-2 rounded-full border border-white/[0.08] bg-venue-raised p-2"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Message for tonight..."
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-venue-cream outline-none placeholder:text-venue-dim"
          />
          <button className="grid h-11 w-11 place-items-center rounded-full bg-venue-amber text-venue-ink" type="submit" aria-label="Send">
            <Send size={17} />
          </button>
        </form>
      </MotionShell>
      {findMeRequestOpen ? (
        <FindMeRequestModal
          guest={other}
          onAccept={acceptFindMe}
          onDecline={() => setFindMeRequestOpen(false)}
          onReport={reportFindMe}
        />
      ) : null}
      {beacon ? (
        <FindMeBeacon
          session={beacon}
          onEnd={() => setBeacon(null)}
          onReport={reportFindMe}
        />
      ) : null}
    </AppShell>
  );
}
