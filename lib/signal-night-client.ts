"use client";

import { createClient } from "@/lib/supabase/client";
import type { DropResponse } from "@/lib/types";

export function isRealSupabaseMode() {
  return createClient() !== null;
}

async function safeInsert(table: string, payload: Record<string, unknown>) {
  const supabase = createClient();
  if (!supabase) return { mode: "demo" as const };
  try {
    const { error } = await supabase.from(table).insert(payload);
    return { mode: "supabase" as const, error: error?.message };
  } catch (error) {
    return { mode: "supabase" as const, error: error instanceof Error ? error.message : "Supabase write failed" };
  }
}

export function persistDropResponse(payload: {
  eventId: string;
  eventSlug: string;
  dropId: string;
  response: DropResponse;
  signalName?: string;
}) {
  return safeInsert("drop_responses", {
    event_id: payload.eventId,
    drop_id: payload.dropId,
    response_label: payload.response,
    signal_name: payload.signalName ?? null,
    created_at: new Date().toISOString()
  });
}

export function persistCircleJoin(payload: {
  eventId: string;
  circleId: string;
  signalName?: string;
}) {
  return safeInsert("circle_members", {
    event_id: payload.eventId,
    circle_id: payload.circleId,
    signal_name: payload.signalName ?? null,
    joined_at: new Date().toISOString()
  });
}

export function persistHelloSend(payload: {
  eventId: string;
  circleId: string;
  templateText: string;
  signalName?: string;
}) {
  return safeInsert("hellos", {
    event_id: payload.eventId,
    to_circle_id: payload.circleId,
    context_type: "circle",
    context_id: payload.circleId,
    template_text: payload.templateText,
    signal_name: payload.signalName ?? null,
    status: "pending",
    created_at: new Date().toISOString()
  });
}

export function persistHelloDecision(payload: {
  eventId: string;
  helloId: string;
  status: "accepted" | "declined" | "blocked";
}) {
  return safeInsert("hello_decisions", {
    event_id: payload.eventId,
    hello_id: payload.helloId,
    status: payload.status,
    created_at: new Date().toISOString()
  });
}

export function persistTemporaryChatStart(payload: {
  eventId: string;
  helloId: string;
  otherSignal: string;
}) {
  return safeInsert("temporary_chats", {
    event_id: payload.eventId,
    hello_id: payload.helloId,
    other_signal: payload.otherSignal,
    status: "active",
    starts_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
  });
}
