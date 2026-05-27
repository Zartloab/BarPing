import type { Event, Guest, SocialWindow } from "@/lib/types";
import { shortTime } from "@/lib/time";

export type VenueDashboardState = "before" | "live" | "after";

export function getVenueDashboardState(event: Event, windows: SocialWindow[]): VenueDashboardState {
  if (event.isClosed) return "after";
  if (event.isLive || windows.some((windowItem) => windowItem.status === "active")) return "live";
  return "before";
}

export function formatVisibleUntil(expiresAt: string) {
  const end = new Date(expiresAt);
  if (Number.isNaN(end.getTime())) return "Tonight only";
  if (end.getTime() - Date.now() > 8 * 60 * 60 * 1000) return "Tonight only";
  return `Visible until ${shortTime(expiresAt).toLowerCase()}`;
}

export function isOpenToPingsGuest(guest: Guest) {
  return guest.entryChoice === "Open to pings" || guest.mode === "Open to 1:1 chat";
}
