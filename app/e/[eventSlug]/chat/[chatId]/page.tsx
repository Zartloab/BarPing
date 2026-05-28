"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { BackLink, GuestPrimaryButton, GuestShell, TopBar } from "@/components/guest-v7";
import { demoEvent, demoGuests, demoMessages } from "@/lib/demo-data";
import { containsAbusePlaceholder } from "@/lib/safety";
import type { ChatMessage } from "@/lib/types";

const chatDurationMs = 10 * 60 * 1000;

export default function ChatPage() {
  const params = useParams<{ eventSlug: string; chatId: string }>();
  const eventSlug = params?.eventSlug ?? demoEvent.slug;
  const other = demoGuests[1];
  const startedAt = useMemo(() => Date.now(), []);
  const [now, setNow] = useState(startedAt);
  const [messages, setMessages] = useState<ChatMessage[]>(demoMessages);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const [keepWanted, setKeepWanted] = useState(false);
  const [bothAgreed, setBothAgreed] = useState(false);

  const elapsed = Math.min(chatDurationMs, now - startedAt);
  const remainingRatio = Math.max(0, 1 - elapsed / chatDurationMs);
  const expired = ended || remainingRatio <= 0;

  useEffect(() => {
    if (expired) return;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [expired]);

  useEffect(() => {
    if (!keepWanted) return;
    const timer = window.setTimeout(() => setBothAgreed(true), 1600);
    return () => window.clearTimeout(timer);
  }, [keepWanted]);

  function sendMessage() {
    const trimmed = body.trim();
    if (!trimmed || expired) return;
    if (containsAbusePlaceholder(trimmed)) {
      setError("That message did not go through. Keep it kind and low-pressure.");
      return;
    }
    setMessages((current) => [...current, { id: crypto.randomUUID(), sender: "me", body: trimmed, createdAt: new Date().toISOString() }]);
    setBody("");
    setError(null);
  }

  return (
    <GuestShell>
      <div className="absolute inset-x-0 top-0 z-50 h-1 bg-[var(--surface-raised)]">
        <div
          className={`h-full transition-transform duration-1000 ${remainingRatio <= 0.2 ? "bg-[var(--primary)]" : "bg-[var(--live)]"}`}
          style={{ transformOrigin: "left", transform: `scaleX(${remainingRatio})` }}
        />
      </div>

      <TopBar leftAction={<BackLink href={`/e/${eventSlug}/room`} />} />
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-4">
        <div>
          <p className="guest-label text-[var(--secondary)]">Temporary chat</p>
          <h1 className="mt-1 font-display text-[18px] text-[var(--text-main)]">{other.alias}</h1>
        </div>
        <button className="guest-micro uppercase tracking-[0.1em] text-[var(--danger)]" onClick={() => setEnded(true)} type="button">End</button>
      </div>

      <section className={`scrollbar-warm flex-1 space-y-3 overflow-y-auto px-4 py-5 transition duration-700 ${expired ? "grayscale" : ""}`}>
        <p className="guest-micro mx-auto max-w-[280px] rounded-[10px] border border-[var(--border-default)] bg-[var(--surface)] px-3 py-2 text-center uppercase tracking-[0.08em] text-[var(--text-muted)]">
          Hello accepted. Keep it easy. No pressure.
        </p>

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : message.sender === "system" ? "justify-center" : "justify-start"}`}>
            <p className={`max-w-[82%] rounded-[16px] px-4 py-3 text-sm leading-6 ${
                message.sender === "me"
                  ? "bg-[var(--primary)] text-[var(--bg-main)]"
                  : message.sender === "system"
                  ? "border border-[var(--border-default)] bg-[var(--surface)] text-center text-[var(--text-muted)]"
                  : "bg-[var(--surface-raised)] text-[var(--text-soft)]"
            }`}>
              {message.body}
            </p>
          </div>
        ))}

        {expired ? (
          <div className="mx-auto mt-8 max-w-[330px] text-center">
            <h2 className="font-display text-4xl leading-none">That was good.</h2>
            <p className="mt-3 text-sm text-[var(--text-muted)]">The chat has closed.</p>
            <div className="mt-7 animate-[sheetIn_500ms_ease-out_both]">
              {bothAgreed ? (
                <div className="rounded-[12px] border border-[var(--live)]/35 bg-[rgba(124,255,203,0.08)] p-4">
                  <p className="font-medium text-[var(--live)]">You both agreed.</p>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">What happens next is up to you.</p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-[var(--text-soft)]">Keep in touch? You both need to agree.</p>
                  <GuestPrimaryButton className="mt-4" disabled={keepWanted} onClick={() => setKeepWanted(true)}>
                    {keepWanted ? "Waiting..." : "I'd like that"}
                  </GuestPrimaryButton>
                  <p className="mt-3 text-xs text-[var(--text-muted)]">If they tap this too, something happens.</p>
                </>
              )}
            </div>
          </div>
        ) : null}
      </section>

      {error ? <p className="mx-4 mb-3 rounded-[10px] bg-[rgba(255,92,122,0.1)] p-3 text-sm text-[var(--danger)]">{error}</p> : null}

      {!expired ? (
        <form
          className="mx-4 mb-3 flex gap-2 rounded-[10px] border border-[var(--border-default)] bg-[var(--surface-raised)] p-2"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage();
          }}
        >
          <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Keep it easy..."
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[var(--text-main)] outline-none placeholder:text-[var(--text-muted)]"
          />
          <button className="rounded-[6px] bg-[var(--primary)] px-4 text-sm font-medium text-[var(--bg-main)]" type="submit">Send</button>
        </form>
      ) : null}

      <button className="mb-5 text-center text-xs text-[var(--danger)]" type="button">Report</button>
    </GuestShell>
  );
}
