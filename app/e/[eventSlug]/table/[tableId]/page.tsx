"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Bell, Flag, Lightbulb, LogOut, Send, UsersRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { MotionShell } from "@/components/motion-shell";
import { SecondaryButton } from "@/components/ui/buttons";
import { generateAlias } from "@/lib/aliases";
import { demoEvent, demoGuests, demoMessages, demoTables } from "@/lib/demo-data";
import { containsAbusePlaceholder } from "@/lib/safety";
import { shortTime } from "@/lib/time";
import type { ChatMessage } from "@/lib/types";

type SavedTableProfile = {
  alias?: string;
  joinedTableId?: string;
  pingsAllowedTableIds?: string[];
};

export default function TablePage() {
  const params = useParams<{ eventSlug: string; tableId: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const tableId = params?.tableId ?? demoTables[0].id;
  const table = demoTables.find((item) => item.id === tableId) ?? demoTables[0];
  const generatedAlias = useMemo(() => generateAlias(), []);
  const [alias, setAlias] = useState(generatedAlias);
  const [hellosAllowed, setHellosAllowed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "system", sender: "system", body: "This table is temporary. Keep it kind and venue-safe.", createdAt: new Date().toISOString() },
    { id: "t1", sender: "them", body: "Anyone got a favourite track from tonight?", createdAt: new Date().toISOString() },
    ...demoMessages.slice(2, 3)
  ]);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const tableAliases = demoGuests.slice(0, Math.max(0, table.memberCount - 1)).map((guest) => guest.alias);

  useEffect(() => {
    const saved = window.localStorage.getItem("barping-profile");
    let profile: SavedTableProfile = {};
    if (saved) {
      try {
        profile = JSON.parse(saved) as SavedTableProfile;
      } catch {
        profile = {};
      }
    }

    const nextAlias = profile.alias ?? generatedAlias;
    const allowedTableIds = profile.pingsAllowedTableIds ?? [];
    const nextProfile = {
      ...profile,
      alias: nextAlias,
      joinedTableId: table.id,
      entryChoice: "Join a table",
      isVisibleToPings: false,
      hasJoinedTable: true,
      pingsAllowedTableIds: allowedTableIds
    };

    setAlias(nextAlias);
    setHellosAllowed(allowedTableIds.includes(table.id));
    window.localStorage.setItem("barping-profile", JSON.stringify(nextProfile));
  }, [generatedAlias, table.id]);

  function toggleHellos() {
    const saved = window.localStorage.getItem("barping-profile");
    let profile: SavedTableProfile = {};
    if (saved) {
      try {
        profile = JSON.parse(saved) as SavedTableProfile;
      } catch {
        profile = {};
      }
    }
    const existing = new Set(profile.pingsAllowedTableIds ?? []);
    if (existing.has(table.id)) {
      existing.delete(table.id);
      setHellosAllowed(false);
    } else {
      existing.add(table.id);
      setHellosAllowed(true);
    }
    window.localStorage.setItem(
      "barping-profile",
      JSON.stringify({ ...profile, alias, joinedTableId: table.id, hasJoinedTable: true, pingsAllowedTableIds: Array.from(existing) })
    );
  }

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
        <header className="sticky top-3 z-20 rounded-[18px] border border-white/[0.08] bg-venue-raised/90 p-4 shadow-soft backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-venue-amberSoft">Conversation table</p>
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

        <section className="mt-4 grid gap-3">
          <div className="rounded-[14px] border border-venue-soft bg-venue-card p-4">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-venue-amber/12 text-venue-amberSoft">
                <Lightbulb size={18} />
              </div>
              <div>
                <p className="text-xs font-medium text-venue-dim">Prompt</p>
                <h2 className="mt-1 text-xl font-medium leading-tight">{table.prompt}</h2>
              </div>
            </div>
          </div>

          <div className="rounded-[14px] border border-venue-soft bg-venue-card p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-venue-raised px-3 py-1 text-xs text-venue-muted">You: {alias}</span>
              {tableAliases.slice(0, 3).map((guestAlias) => (
                <span key={guestAlias} className="rounded-full bg-venue-raised px-3 py-1 text-xs text-venue-muted">{guestAlias}</span>
              ))}
              <span className="rounded-full bg-venue-raised px-3 py-1 text-xs text-venue-dim">{table.memberCount} seated</span>
            </div>
          </div>

          <SecondaryButton className="w-full" onClick={toggleHellos}>
            <Bell size={16} />
            {hellosAllowed ? "Hellos allowed" : "Allow hellos from this table"}
          </SecondaryButton>

          {error ? (
            <div className="rounded-[14px] border border-venue-danger/35 bg-venue-danger/10 p-3 text-sm text-venue-danger">
              {error}
            </div>
          ) : null}
        </section>

        <div className="scrollbar-warm mt-5 flex-1 space-y-3 overflow-y-auto pb-5">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}>
              <div
                className={`max-w-[82%] rounded-[18px] px-4 py-3 text-sm leading-relaxed ${
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
