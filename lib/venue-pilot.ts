import { createClient } from "@/lib/supabase/client";
import { demoEvent, demoEventAssets, demoTables, demoVenue } from "@/lib/demo-data";
import type { Event, EventAsset, EventTemplate, EventTable, SocialWindow, VenueVibeLevel } from "@/lib/types";

const localEventKey = "barping:v4:event";
const localTablesKey = "barping:v4:tables";
const localAssetsKey = "barping:v4:assets";
const localWindowKey = "barping:v4:social-window";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function createAssetsFromTemplate(template: EventTemplate, eventId: string): EventAsset[] {
  return [
    { id: `${eventId}-asset-table`, eventId, kind: "table_qr", title: "Signal Night QR card", copy: template.assets.tableQr },
    { id: `${eventId}-asset-poster`, eventId, kind: "entrance_poster", title: "Entrance poster", copy: template.assets.entrancePoster },
    { id: `${eventId}-asset-counter`, eventId, kind: "bar_counter", title: "Bar counter sign", copy: template.assets.barCounter },
    { id: `${eventId}-asset-story`, eventId, kind: "instagram_story", title: "Instagram story", copy: template.assets.instagramStory },
    { id: `${eventId}-asset-safety`, eventId, kind: "safety_card", title: "Safety card", copy: template.assets.safetyCard },
    { id: `${eventId}-asset-run`, eventId, kind: "run_sheet", title: "Staff run sheet", copy: template.assets.runOfShow },
    { id: `${eventId}-asset-signals`, eventId, kind: "signal_sheet", title: "Signal coaster sheet", copy: "Optional Signal marks for the bar. Guests can grab one only if they want people to know they are open to Hellos." }
  ];
}

export function createTablesFromTemplate(template: EventTemplate): EventTable[] {
  return template.tables.map((table, index) => ({
    id: `${slugify(table.name)}-${index + 1}`,
    name: table.name,
    description: table.description,
    maxMembers: table.maxMembers,
    memberCount: 0,
    prompt: table.prompt,
    suggestedTopics: table.suggestedTopics,
    isActive: true,
    isSpotlighted: index === 0,
    energyLevel: table.energyLevel,
    hostPrompt: table.prompt,
    isTemplateGenerated: true
  }));
}

export function createDraftEvent(template: EventTemplate, vibeLevel: VenueVibeLevel, findMeEnabled: boolean): Event {
  const now = new Date();
  const startsAt = addMinutes(now, 30);
  const endsAt = addMinutes(startsAt, template.recommendedDurationMinutes);
  const suffix = now.toISOString().slice(0, 10);

  return {
    ...demoEvent,
    id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `event-${Date.now()}`,
    venueId: demoVenue.id,
    title: template.eventTitle,
    slug: `${slugify(template.eventTitle)}-${suffix}`,
    eventType: template.eventType,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    houseRules: demoEvent.houseRules,
    isLive: false,
    isClosed: false,
    qrScans: 0,
    templateId: template.id,
    vibeLevel,
    findMeEnabled
  };
}

export function createSocialWindowFromTemplate(event: Event, template: EventTemplate): SocialWindow {
  const eventStart = new Date(event.startsAt);
  const startsAt = addMinutes(eventStart, template.socialWindowOffsetMinutes);
  const endsAt = addMinutes(startsAt, template.socialWindowDurationMinutes);

  return {
    id: `${event.id}-window`,
    eventId: event.id,
    venueId: event.venueId,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    status: "scheduled"
  };
}

export function loadLocalPilotEvent() {
  if (typeof window === "undefined") {
    return { event: demoEvent, tables: demoTables, assets: demoEventAssets, socialWindow: null as SocialWindow | null };
  }

  const event = JSON.parse(window.localStorage.getItem(localEventKey) ?? "null") as Event | null;
  const tables = JSON.parse(window.localStorage.getItem(localTablesKey) ?? "null") as EventTable[] | null;
  const assets = JSON.parse(window.localStorage.getItem(localAssetsKey) ?? "null") as EventAsset[] | null;
  const socialWindow = JSON.parse(window.localStorage.getItem(localWindowKey) ?? "null") as SocialWindow | null;

  return {
    event: event ?? demoEvent,
    tables: tables ?? demoTables,
    assets: assets ?? demoEventAssets,
    socialWindow
  };
}

export function saveLocalPilotEvent(event: Event, tables: EventTable[], assets: EventAsset[], socialWindow: SocialWindow) {
  window.localStorage.setItem(localEventKey, JSON.stringify(event));
  window.localStorage.setItem(localTablesKey, JSON.stringify(tables));
  window.localStorage.setItem(localAssetsKey, JSON.stringify(assets));
  window.localStorage.setItem(localWindowKey, JSON.stringify(socialWindow));
}

export async function createPilotEvent(template: EventTemplate, vibeLevel: VenueVibeLevel, findMeEnabled: boolean) {
  let event = createDraftEvent(template, vibeLevel, findMeEnabled);
  const tables = createTablesFromTemplate(template);
  const supabase = createClient();

  if (!supabase) {
    event = { ...event, slug: demoEvent.slug };
    const assets = createAssetsFromTemplate(template, event.id);
    const socialWindow = createSocialWindowFromTemplate(event, template);
    saveLocalPilotEvent(event, tables, assets, socialWindow);
    return { event, tables, assets, socialWindow, mode: "demo" as const };
  }

  const assets = createAssetsFromTemplate(template, event.id);
  const socialWindow = createSocialWindowFromTemplate(event, template);

  const { error: eventError } = await supabase.from("events").insert({
    id: event.id,
    venue_id: event.venueId,
    title: event.title,
    slug: event.slug,
    event_type: event.eventType,
    starts_at: event.startsAt,
    ends_at: event.endsAt,
    house_rules: event.houseRules,
    is_live: false,
    is_closed: false,
    template_id: event.templateId,
    vibe_level: event.vibeLevel,
    find_me_enabled: event.findMeEnabled
  });
  if (eventError) throw eventError;

  const { error: tablesError } = await supabase.from("event_tables").insert(
    tables.map((table) => ({
      event_id: event.id,
      venue_id: event.venueId,
      name: table.name,
      description: table.description,
      max_members: table.maxMembers,
      prompt: table.prompt,
      suggested_topics: table.suggestedTopics,
      is_spotlighted: table.isSpotlighted,
      is_active: table.isActive,
      energy_level: table.energyLevel,
      host_prompt: table.hostPrompt,
      is_template_generated: true
    }))
  );
  if (tablesError) throw tablesError;

  const { error: assetsError } = await supabase.from("event_assets").insert(
    assets.map((asset) => ({
      event_id: event.id,
      venue_id: event.venueId,
      kind: asset.kind,
      title: asset.title,
      copy: asset.copy
    }))
  );
  if (assetsError) throw assetsError;

  const { error: windowError } = await supabase.from("social_windows").insert({
    id: socialWindow.id,
    event_id: event.id,
    venue_id: event.venueId,
    starts_at: socialWindow.startsAt,
    ends_at: socialWindow.endsAt,
    status: socialWindow.status
  });
  if (windowError) throw windowError;

  saveLocalPilotEvent(event, tables, assets, socialWindow);
  return { event, tables, assets, socialWindow, mode: "supabase" as const };
}

export async function updatePilotLiveStatus(event: Event, status: "scheduled" | "active" | "ended" | "closed") {
  const nextEvent = { ...event, isLive: status === "active", isClosed: status === "closed" };
  const local = loadLocalPilotEvent();
  const nextWindow = local.socialWindow ? { ...local.socialWindow, status: status === "closed" ? "ended" : status } : null;

  if (nextWindow) {
    saveLocalPilotEvent(nextEvent, local.tables, local.assets, nextWindow);
  }

  const supabase = createClient();
  if (!supabase) return { event: nextEvent, socialWindow: nextWindow };

  await supabase.from("events").update({ is_live: nextEvent.isLive, is_closed: nextEvent.isClosed }).eq("id", event.id);
  if (nextWindow) {
    await supabase.from("social_windows").update({ status: nextWindow.status }).eq("id", nextWindow.id);
  }

  return { event: nextEvent, socialWindow: nextWindow };
}
