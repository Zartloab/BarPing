"use client";

import { useState } from "react";
import { Megaphone, Pause, Play, Radio, Square, Star } from "lucide-react";
import { hostNudges } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { loadLocalPilotEvent, saveLocalPilotEvent, updatePilotLiveStatus } from "@/lib/venue-pilot";
import type { Event, EventTable, HostAnnouncement, SocialWindow } from "@/lib/types";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { CommandPanel, ConsolePanel, SectionLabel, StatusPill } from "@/components/venue-console";

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
    setStatusMessage(kind === "last_call" ? "Final call sent." : "Nudge sent.");

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
    <section className="grid gap-5">
      <CommandPanel>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <StatusPill status={isLive ? "Live" : "Paused"} />
              <SectionLabel>Host controls</SectionLabel>
            </div>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.01em]">Social Mode {isLive ? "is live" : "is paused"}.</h2>
            <p className="mt-1 text-sm text-venue-muted">
              Guests currently see: join a table, open to pings, or just browse.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {isLive ? (
              <>
                <SecondaryButton className="px-4" onClick={() => setWindowStatus("ended")}>
                  <Pause size={16} />
                  Pause Social Mode
                </SecondaryButton>
                <SecondaryButton className="border-venue-danger/30 text-venue-danger hover:bg-venue-danger/10" onClick={() => setWindowStatus("closed")}>
                  <Square size={16} />
                  Close night
                </SecondaryButton>
              </>
            ) : (
              <PrimaryButton className="px-4 sm:col-span-2" onClick={() => setWindowStatus("active")}>
                <Play size={16} />
                Start Social Mode
              </PrimaryButton>
            )}
          </div>
        </div>
        {statusMessage ? <p className="mt-4 rounded-[10px] bg-venue-olive/10 px-3 py-2 text-sm text-venue-olive">{statusMessage}</p> : null}
      </CommandPanel>

      <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <ConsolePanel>
          <div className="flex items-center gap-3">
            <Megaphone className="text-venue-danger" size={19} />
            <div>
              <SectionLabel>Send nudge</SectionLabel>
              <h3 className="mt-1 text-xl font-medium">Room announcement</h3>
            </div>
          </div>
          <label className="mt-4 block text-sm text-venue-muted">
            Current text
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-2 min-h-24 w-full resize-none rounded-[10px] border border-venue-soft bg-white p-3 text-sm text-venue-cream outline-none focus:border-venue-blue/60"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {hostNudges.map((nudge) => (
              <button
                key={nudge}
                onClick={() => setMessage(nudge)}
                type="button"
                className="min-h-9 rounded-[999px] border border-venue-soft bg-white px-3 text-xs text-venue-muted hover:border-venue-cream/25 hover:text-venue-cream"
              >
                {nudge.slice(0, 34)}...
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <PrimaryButton onClick={() => sendAnnouncement()}>
              <Radio size={16} />
              Send nudge
            </PrimaryButton>
            <SecondaryButton onClick={() => sendAnnouncement("last_call", "Final call: Social Mode wraps soon. Join a table or share contact only if both people agree.")}>
              Final call
            </SecondaryButton>
          </div>
        </ConsolePanel>

        <ConsolePanel>
          <div className="flex items-center gap-3">
            <Star className="text-venue-danger" size={19} />
            <div>
              <SectionLabel>Feature a table</SectionLabel>
              <h3 className="mt-1 text-xl font-medium">Featured table</h3>
            </div>
          </div>
          <div className="mt-4 grid gap-2">
            {tables.map((table) => (
              <button
                key={table.id}
                onClick={() => spotlightTable(table.id)}
                className={`rounded-[10px] border px-3 py-2.5 text-left transition ${
                  spotlight === table.id ? "border-venue-cream bg-venue-raised" : "border-venue-soft bg-white"
                }`}
                type="button"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium text-venue-cream">{table.name}</span>
                  <span className="rounded-[999px] bg-venue-olive/10 px-2 py-0.5 text-xs text-venue-olive">{table.energyLevel ?? "Warming up"}</span>
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-venue-muted">{table.prompt}</span>
              </button>
            ))}
          </div>
        </ConsolePanel>
      </section>

      <ConsolePanel className="p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <SectionLabel>Recent announcements</SectionLabel>
            <p className="mt-1 text-sm text-venue-muted">{recentAnnouncements[0]?.body ?? "No nudges sent yet."}</p>
          </div>
          <p className="text-xs text-venue-dim">{recentAnnouncements.length} total</p>
        </div>
      </ConsolePanel>
    </section>
  );
}
