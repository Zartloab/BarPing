"use client";

import { useState } from "react";
import { CheckCircle2, Download, Megaphone, Play, RotateCcw, ShieldCheck, Square, Star } from "lucide-react";
import { PrimaryButton, PrimaryLink, SecondaryButton, SecondaryLink } from "@/components/ui/buttons";
import { VenueGuide } from "@/components/venue-guide";
import { ConsolePanel, SafetyPanel, SectionLabel, UtilityPanel, VenueConsoleHeader } from "@/components/venue-console";
import { VenueThemeToggle } from "@/components/venue-theme-toggle";
import { hostNudges } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { getVenueDashboardState } from "@/lib/ux";
import { loadLocalPilotEvent, saveLocalPilotEvent, updatePilotLiveStatus } from "@/lib/venue-pilot";
import type {
  Event,
  EventAsset,
  EventRecommendation,
  EventTable,
  EventTemplate,
  FeedbackResponse,
  Guest,
  HostAnnouncement,
  PilotMetrics,
  Report,
  SocialWindow,
  Venue
} from "@/lib/types";

type HostStep = "nudge" | "feature" | "final" | "close";

const hostStepCopy: Record<HostStep, { label: string; title: string; body: string }> = {
  nudge: {
    label: "Send nudge",
    title: "Point guests toward a table.",
    body: "Use one clear announcement. Keep hellos out of the main prompt."
  },
  feature: {
    label: "Feature a table",
    title: "Put one table in focus.",
    body: "Feature the next useful table when the room needs direction."
  },
  final: {
    label: "Final call",
    title: "Give guests a clean ending.",
    body: "Remind everyone the night is wrapping and contact sharing stays mutual."
  },
  close: {
    label: "Close night",
    title: "Close the run sheet.",
    body: "End the guest window and move to the night recap."
  }
};

export function VenueNightDashboard({
  venue,
  event,
  templates,
  selectedTemplate,
  assets,
  tables,
  guests,
  announcements,
  windows,
  reports,
  metrics,
  feedback,
  recommendation
}: {
  venue: Venue;
  event: Event;
  templates: EventTemplate[];
  selectedTemplate: EventTemplate;
  assets: EventAsset[];
  tables: EventTable[];
  guests: Guest[];
  announcements: HostAnnouncement[];
  windows: SocialWindow[];
  reports: Report[];
  metrics: PilotMetrics;
  feedback: FeedbackResponse[];
  recommendation: EventRecommendation;
}) {
  const pilot = loadLocalPilotEvent();
  const [activeEvent, setActiveEvent] = useState(pilot.event.id !== event.id ? pilot.event : event);
  const [activeTables, setActiveTables] = useState(pilot.event.id !== event.id ? pilot.tables : tables);
  const [activeWindows, setActiveWindows] = useState<SocialWindow[]>(pilot.socialWindow ? [pilot.socialWindow] : windows);
  const [message, setMessage] = useState(hostNudges[0]);
  const [recentAnnouncements, setRecentAnnouncements] = useState(announcements);
  const [notice, setNotice] = useState("");
  const [launchKitPrinted, setLaunchKitPrinted] = useState(false);
  const [hostStep, setHostStep] = useState<HostStep>("nudge");
  const activeAssets = pilot.event.id !== event.id ? pilot.assets : assets;
  const activeTemplate = templates.find((template) => template.id === activeEvent.templateId) ?? selectedTemplate;
  const state = getVenueDashboardState(activeEvent, activeWindows);
  const status = state === "after" ? "Closed" : state === "live" ? "Live" : "Set up";
  const featuredTable = activeTables.find((table) => table.isSpotlighted) ?? activeTables[0];
  const activeTableCount = activeTables.filter((table) => table.isActive !== false).length;
  const bestTable = featuredTable?.name ?? activeTables[0]?.name ?? "Tables";
  const nextHostStep = hostStepCopy[hostStep];

  async function setNightStatus(nextStatus: "scheduled" | "active" | "ended" | "closed") {
    const result = await updatePilotLiveStatus(activeEvent, nextStatus);
    setActiveEvent(result.event);
    if (result.socialWindow) setActiveWindows([result.socialWindow]);
    setNotice(nextStatus === "active" ? "Tables are live." : nextStatus === "closed" ? "Night closed." : "Tables paused.");
  }

  async function sendAnnouncement(kind: HostAnnouncement["kind"] = "announcement", body = message) {
    const announcement: HostAnnouncement = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `announcement-${Date.now()}`,
      eventId: activeEvent.id,
      venueId: activeEvent.venueId,
      body,
      kind,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 45 * 60 * 1000).toISOString()
    };
    setRecentAnnouncements((items) => [announcement, ...items]);
    setNotice(kind === "last_call" ? "Final call sent." : "Nudge sent.");

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

  function featureTable(tableId: string) {
    const nextTables = activeTables.map((table) => ({ ...table, isSpotlighted: table.id === tableId }));
    setActiveTables(nextTables);
    const local = loadLocalPilotEvent();
    if (local.socialWindow) saveLocalPilotEvent(activeEvent, nextTables, activeAssets, local.socialWindow);
    setNotice("Featured table updated.");
  }

  function featureNextTable() {
    if (!activeTables.length) return;
    const currentIndex = Math.max(0, activeTables.findIndex((table) => table.id === featuredTable?.id));
    const nextTable = activeTables[(currentIndex + 1) % activeTables.length];
    featureTable(nextTable.id);
  }

  async function runHostStep() {
    if (hostStep === "nudge") {
      await sendAnnouncement();
      setHostStep("feature");
      return;
    }
    if (hostStep === "feature") {
      featureNextTable();
      setHostStep("final");
      return;
    }
    if (hostStep === "final") {
      await sendAnnouncement("last_call", "Final call: conversation tables wrap soon. Keep contact sharing mutual and no-pressure.");
      setHostStep("close");
      return;
    }
    await setNightStatus("closed");
  }

  return (
    <div className="grid gap-5">
      <VenueConsoleHeader
        venue={venue}
        event={{ ...activeEvent, title: activeTemplate.eventTitle }}
        status={status}
        summary={
          state === "before"
            ? "Tonight's run sheet shows the next launch action."
            : state === "live"
              ? "Host controls show one operational action at a time."
              : "Night recap is ready."
        }
        action={
          <div className="flex flex-wrap gap-2">
            <VenueGuide compact />
            <VenueThemeToggle />
          </div>
        }
      />

      {notice ? <p className="rounded-[12px] border border-venue-soft bg-venue-card p-3 text-sm text-venue-muted">{notice}</p> : null}

      {state === "before" ? (
        <section className="grid gap-5">
          <ConsolePanel>
            <SectionLabel>Tonight&apos;s run sheet</SectionLabel>
            <h2 className="mt-2 font-serif text-4xl leading-none">{activeTemplate.eventTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-venue-muted">
              Choose recipe, review run sheet, print launch kit, then start Social Mode.
            </p>
            <div className="mt-5 grid gap-2">
              {[
                "Recipe selected",
                "Conversation tables generated",
                "Safety rules ready",
                launchKitPrinted ? "Launch kit printed" : "Print launch kit next"
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-[10px] border border-venue-soft bg-venue-raised px-3 py-2">
                  <CheckCircle2 className={index < 3 || launchKitPrinted ? "text-venue-olive" : "text-venue-dim"} size={17} />
                  <span className="text-sm text-venue-muted">{item}</span>
                </div>
              ))}
            </div>
            {launchKitPrinted ? (
              <PrimaryButton className="mt-5 w-full" onClick={() => setNightStatus("active")}>
                <Play size={16} />
                Start Social Mode
              </PrimaryButton>
            ) : (
              <PrimaryButton className="mt-5 w-full" onClick={() => {
                setLaunchKitPrinted(true);
                setNotice("Launch kit marked printed. Place QR signs, then start Social Mode.");
              }}>
                Print launch kit
              </PrimaryButton>
            )}
          </ConsolePanel>
          <div className="grid gap-2 md:grid-cols-2">
            <SecondaryLink href={`/venue/events/${activeEvent.id}/qr`}>Open guest link</SecondaryLink>
            <SecondaryLink href={`/venue/events/${activeEvent.id}/setup`}>Review run sheet</SecondaryLink>
          </div>
        </section>
      ) : null}

      {state === "live" ? (
        <section className="grid gap-5">
          <ConsolePanel>
            <SectionLabel>Host controls</SectionLabel>
            <h2 className="mt-2 font-serif text-4xl leading-none">{nextHostStep.title}</h2>
            <p className="mt-3 text-sm leading-6 text-venue-muted">{nextHostStep.body}</p>

            {hostStep === "nudge" ? (
              <>
                <label className="mt-5 block text-sm text-venue-muted">
                  Nudge text
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-2 min-h-20 w-full resize-none rounded-[10px] border border-venue-soft bg-venue-raised p-3 text-sm text-venue-cream outline-none focus:border-venue-blue/60"
                  />
                </label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hostNudges.slice(0, 3).map((nudge) => (
                    <button
                      key={nudge}
                      className="rounded-[999px] border border-venue-soft bg-venue-raised px-3 py-2 text-xs text-venue-muted"
                      onClick={() => setMessage(nudge)}
                      type="button"
                    >
                      {nudge.slice(0, 42)}...
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {hostStep === "feature" ? (
              <div className="mt-5 rounded-[10px] border border-venue-soft bg-venue-raised p-3">
                <p className="text-xs text-venue-dim">Currently featured</p>
                <p className="mt-1 font-medium text-venue-cream">{featuredTable?.name ?? "No table yet"}</p>
              </div>
            ) : null}

            {hostStep === "close" ? (
              <div className="mt-5 rounded-[10px] border border-venue-danger/20 bg-venue-danger/10 p-3 text-sm text-venue-danger">
                Closing hides the guest join window and opens the night recap.
              </div>
            ) : null}

            <PrimaryButton className="mt-5 w-full" onClick={runHostStep}>
              {hostStep === "nudge" ? <Megaphone size={16} /> : hostStep === "feature" ? <Star size={16} /> : hostStep === "close" ? <Square size={16} /> : <Megaphone size={16} />}
              {nextHostStep.label}
            </PrimaryButton>
          </ConsolePanel>

          <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <ConsolePanel>
              <SectionLabel>Live run sheet</SectionLabel>
              <div className="mt-4 grid gap-3">
                <p className="rounded-[10px] bg-venue-raised p-3 text-sm text-venue-muted">
                  Recent nudge: {recentAnnouncements[0]?.body ?? "No nudges sent yet."}
                </p>
                <p className="rounded-[10px] bg-venue-raised p-3 text-sm text-venue-muted">
                  Featured table: {featuredTable?.name ?? "None yet"}
                </p>
                <p className="rounded-[10px] bg-venue-raised p-3 text-sm text-venue-muted">
                  {activeTableCount} tables active. {guests.length} guests have checked in.
                </p>
              </div>
            </ConsolePanel>

            <SafetyPanel>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-venue-danger" size={20} />
                <div>
                  <SectionLabel>Safety</SectionLabel>
                  <h2 className="mt-1 text-xl font-medium">{reports.length ? "Needs review" : "No safety issues"}</h2>
                </div>
              </div>
              <p className="mt-4 rounded-[10px] bg-venue-card p-3 text-sm text-venue-muted">
                Hellos are table-scoped, mutual, rate limited, and reportable.
              </p>
            </SafetyPanel>
          </section>
        </section>
      ) : null}

      {state === "after" ? (
        <section className="grid gap-5">
          <ConsolePanel>
            <SectionLabel>Night recap</SectionLabel>
            <h2 className="mt-2 font-serif text-4xl leading-none">{recommendation}</h2>
            <p className="mt-3 text-sm leading-6 text-venue-muted">
              {feedback.length} feedback responses. Best table: {bestTable}.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              <UtilityPanel><p className="text-2xl font-medium">{metrics.qrScans}</p><p className="text-sm text-venue-muted">scans</p></UtilityPanel>
              <UtilityPanel><p className="text-2xl font-medium">{metrics.checkIns}</p><p className="text-sm text-venue-muted">joins</p></UtilityPanel>
              <UtilityPanel><p className="text-2xl font-medium">{metrics.tableJoins}</p><p className="text-sm text-venue-muted">table joins</p></UtilityPanel>
              <UtilityPanel><p className="text-2xl font-medium">{metrics.reports}</p><p className="text-sm text-venue-muted">reports</p></UtilityPanel>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <UtilityPanel><p className="text-2xl font-medium">{metrics.pingsSent}</p><p className="text-sm text-venue-muted">optional hellos</p></UtilityPanel>
              <UtilityPanel><p className="text-2xl font-medium">{metrics.chatsCreated}</p><p className="text-sm text-venue-muted">table chats</p></UtilityPanel>
            </div>
            <PrimaryLink className="mt-5 w-full" href="/venue/events/new">
              <RotateCcw size={16} />
              Run again
            </PrimaryLink>
          </ConsolePanel>
          <SecondaryButton>
            <Download size={16} />
            Download recap
          </SecondaryButton>
        </section>
      ) : null}
    </div>
  );
}
