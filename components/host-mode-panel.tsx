"use client";

import { useState } from "react";
import { Megaphone, Play, Square, Sparkles } from "lucide-react";
import { hostNudges } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { loadLocalPilotEvent, saveLocalPilotEvent, updatePilotLiveStatus } from "@/lib/venue-pilot";
import type { Event, EventTable, HostAnnouncement, SocialWindow } from "@/lib/types";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";

export function HostModePanel({
  event,
  windows,
  announcements,
  tables
}: {
  event: Event;
  windows: SocialWindow[];
  announcements: HostAnnouncement[];
  tables: EventTable[];
}) {
  const [isLive, setIsLive] = useState(windows.some((windowItem) => windowItem.status === "active"));
  const [message, setMessage] = useState(hostNudges[0]);
  const [spotlight, setSpotlight] = useState(tables.find((table) => table.isSpotlighted)?.id ?? tables[0]?.id);
  const [recentAnnouncements, setRecentAnnouncements] = useState(announcements);
  const [statusMessage, setStatusMessage] = useState("");

  async function setWindowStatus(nextStatus: "scheduled" | "active" | "ended" | "closed") {
    await updatePilotLiveStatus(event, nextStatus);
    setIsLive(nextStatus === "active");
    setStatusMessage(nextStatus === "active" ? "Social Mode is live." : nextStatus === "closed" ? "Event closed." : "Social Mode paused.");
  }

  async function sendAnnouncement(kind: HostAnnouncement["kind"] = "announcement", body = message) {
    const announcement: HostAnnouncement = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `announcement-${Date.now()}`,
      eventId: event.id,
      venueId: event.venueId,
      body,
      kind,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString()
    };

    setRecentAnnouncements((items) => [announcement, ...items]);
    setStatusMessage(kind === "last_call" ? "Final call sent." : "Announcement sent.");

    const supabase = createClient();
    if (supabase) {
      await supabase.from("host_announcements").insert({
        id: announcement.id,
        event_id: announcement.eventId,
        venue_id: announcement.venueId,
        body: announcement.body,
        kind: announcement.kind,
        created_at: announcement.createdAt,
        expires_at: announcement.expiresAt
      });
    }
  }

  async function spotlightTable(tableId: string) {
    setSpotlight(tableId);
    const local = loadLocalPilotEvent();
    const nextTables = local.tables.map((table) => ({ ...table, isSpotlighted: table.id === tableId }));
    if (local.socialWindow) saveLocalPilotEvent(local.event, nextTables, local.assets, local.socialWindow);

    const supabase = createClient();
    if (supabase) {
      await supabase.from("event_tables").update({ is_spotlighted: false }).eq("event_id", event.id);
      await supabase.from("event_tables").update({ is_spotlighted: true }).eq("id", tableId);
    }
  }

  return (
    <section className="glass-card rounded-[28px] p-5">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-venue-amberSoft">Host Mode</p>
          <h2 className="mt-2 text-2xl font-semibold">Run the social window.</h2>
          <p className="mt-2 text-sm text-venue-muted">Start the window, nudge tables, and keep the room safe and intentional.</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs ${isLive ? "bg-venue-amber/12 text-venue-amberSoft" : "bg-white/[0.04] text-venue-muted"}`}>
          {isLive ? "Social window live" : "Social window paused"}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <PrimaryButton onClick={() => setWindowStatus("active")}>
          <Play size={16} />
          Start window
        </PrimaryButton>
        <SecondaryButton onClick={() => setWindowStatus("ended")}>
          <Square size={16} />
          Pause window
        </SecondaryButton>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-4">
          <label className="text-sm text-venue-muted">
            Announcement
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 min-h-24 w-full resize-none rounded-[20px] border border-white/[0.08] bg-venue-soft p-3 text-sm text-venue-cream outline-none focus:border-venue-amber/60"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {hostNudges.map((nudge) => (
              <button
                key={nudge}
                onClick={() => setMessage(nudge)}
                type="button"
                className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-venue-muted"
              >
                {nudge.slice(0, 28)}...
              </button>
            ))}
          </div>
          <PrimaryButton className="mt-4 w-full" onClick={() => sendAnnouncement()}>
            <Megaphone size={16} />
            Send announcement
          </PrimaryButton>
          <SecondaryButton className="mt-3 w-full" onClick={() => sendAnnouncement("last_call", "Final call: Social Mode wraps soon. Join a table or share contact only if both people agree.")}>
            Final call
          </SecondaryButton>
        </div>

        <div className="rounded-[24px] border border-white/[0.08] bg-white/[0.035] p-4">
          <p className="text-sm text-venue-muted">Spotlight a table prompt</p>
          <div className="mt-3 grid gap-2">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => spotlightTable(table.id)}
                className={`rounded-[18px] border p-3 text-left ${
                  spotlight === table.id ? "border-venue-amber/50 bg-venue-amber/10" : "border-white/[0.08] bg-white/[0.025]"
                }`}
                type="button"
              >
                <span className="flex items-center gap-2 font-semibold text-venue-cream">
                  {spotlight === table.id ? <Sparkles size={15} /> : null}
                  {table.name}
                </span>
                <span className="mt-1 block text-xs text-venue-muted">{table.prompt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[22px] border border-white/[0.08] bg-white/[0.035] p-4">
        <h3 className="font-semibold">Recent announcements</h3>
        <div className="mt-3 grid gap-2">
          {recentAnnouncements.map((announcement) => (
            <p key={announcement.id} className="rounded-2xl bg-venue-soft p-3 text-sm text-venue-muted">{announcement.body}</p>
          ))}
        </div>
      </div>
      {statusMessage ? <p className="mt-4 rounded-2xl bg-venue-amber/10 p-3 text-sm text-venue-amberSoft">{statusMessage}</p> : null}
    </section>
  );
}
