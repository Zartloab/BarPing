"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Flag, Lightbulb, LogOut, Send, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryButton } from "@/components/ui/buttons";
import { demoEvent, demoGuests, demoMessages, demoTables } from "@/lib/demo-data";
import { containsAbusePlaceholder } from "@/lib/safety";
import { shortTime } from "@/lib/time";
import type { ChatMessage } from "@/lib/types";

export default function TablePage() {
  const params = useParams<{ eventSlug: string; tableId: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const tableId = params?.tableId ?? demoTables[0].id;
  const table = demoTables.find((item) => item.id === tableId) ?? demoTables[0];
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "system", sender: "system", body: "This table is temporary. Keep it kind and venue-safe.", createdAt: new Date().toISOString() },
    { id: "t1", sender: "them", body: "Anyone got a favourite track from tonight?", createdAt: new Date().toISOString() },
    ...demoMessages.slice(2, 3)
  ]);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  function sendMessage() {
    const trimmed = body.trim();
    if (!trimmed) return;
    if (containsAbusePlaceholder(trimmed)) {
      setError("That message did not go through. Keep table chat kind and venue-safe.");
      return;
    }
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), sender: "me", body: trimmed, createdAt: new Date().toISOString() }
    ]);
    setError(null);
    setBody("");
  }

  return (
    <AppShell>
      <MotionShell className="flex min-h-[calc(100dvh-2.5rem)] flex-col">
        <header className="sticky top-3 z-20 rounded-[28px] border border-white/[0.08] bg-venue-raised/90 p-4 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">Group table</p>
              <h1 className="mt-1 text-lg font-semibold">{table.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-xs text-venue-muted">
                <UsersRound size={14} />
                {table.memberCount}/{table.maxMembers} guests
              </p>
            </div>
            <div className="flex gap-2">
              <SecondaryButton className="min-h-10 px-3" aria-label="Report table">
                <Flag size={16} />
              </SecondaryButton>
              <Link
                className="tap-highlight inline-flex min-h-10 items-center justify-center rounded-full border border-white/[0.08] px-3 text-venue-muted"
                href={`/e/${eventSlug}/room`}
                aria-label="Leave table"
              >
                <LogOut size={16} />
              </Link>
            </div>
          </div>
        </header>
        <div className="mt-4 flex flex-wrap gap-2">
          {demoGuests.slice(0, table.memberCount).map((guest) => (
            <span key={guest.id} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-venue-muted">{guest.alias}</span>
          ))}
        </div>
        <section className="mt-4 grid gap-3">
          <div className="glass-card rounded-[24px] p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <Lightbulb size={18} />
              </div>
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-venue-amberSoft">Table prompt</p>
                <h2 className="mt-1 font-semibold">{table.prompt}</h2>
                <p className="mt-1 text-sm text-venue-muted">
                  {table.maxMembers - table.memberCount} open seats. Suggested for {table.suggestedTopics.join(", ")}.
                </p>
              </div>
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
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}>
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
                {message.sender !== "system" ? <p className="mt-1 text-[0.65rem] text-venue-dim">{shortTime(message.createdAt)}</p> : null}
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2 rounded-full border border-white/[0.08] bg-venue-raised p-2"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Message the table..."
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-venue-cream outline-none placeholder:text-venue-dim"
          />
          <button className="grid h-11 w-11 place-items-center rounded-full bg-venue-amber text-venue-ink" type="submit" aria-label="Send">
            <Send size={17} />
          </button>
        </form>
      </MotionShell>
    </AppShell>
  );
}
