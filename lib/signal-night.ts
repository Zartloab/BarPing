import type { EventTable } from "@/lib/types";

export type SignalIdentity = {
  name: string;
  symbol: string;
  vibe: string;
  suggestedCircles: string[];
  helloTemplates: string[];
  redrawUsed: boolean;
};

export type Drop = {
  id: string;
  title: string;
  body: string;
  actions: string[];
  relatedCircleId?: string;
  status: "live" | "final";
};

export const signalDeck: Omit<SignalIdentity, "redrawUsed">[] = [
  {
    name: "The Cassette",
    symbol: "///",
    vibe: "Music witness",
    suggestedCircles: ["Music Circle", "Local Secrets", "Before Midnight"],
    helloTemplates: ["Also here for the music?", "What song should play next?", "Help settle the Drop?"]
  },
  {
    name: "The Matchbook",
    symbol: "##",
    vibe: "Back-pocket story",
    suggestedCircles: ["Wild Card", "Back Booth", "Local Secrets"],
    helloTemplates: ["Trade one local secret?", "Want to join this Circle?", "First time here?"]
  },
  {
    name: "The Moth",
    symbol: "--",
    vibe: "Drawn to the loud bit",
    suggestedCircles: ["Music Circle", "Weird Questions", "Before Midnight"],
    helloTemplates: ["Also here for the music?", "You seem like a Wild Card person.", "What fake band name would you start?"]
  },
  {
    name: "The Broken Amp",
    symbol: "++",
    vibe: "Opinionated but friendly",
    suggestedCircles: ["Bad Opinions", "Music Circle", "Artists & Makers"],
    helloTemplates: ["Help settle the Drop?", "Defend the next song?", "Want to join this Circle?"]
  },
  {
    name: "The Back Booth",
    symbol: "[]",
    vibe: "Low-key observer",
    suggestedCircles: ["Local Secrets", "Wild Card", "Smoke Break Stories"],
    helloTemplates: ["Trade one local secret?", "First time here?", "Ask me one easy thing."]
  },
  {
    name: "The Last Song",
    symbol: "~~",
    vibe: "Here until the end",
    suggestedCircles: ["Before Midnight", "Music Circle", "Local Secrets"],
    helloTemplates: ["What song should end the night?", "Also staying for the last one?", "Help settle the Drop?"]
  }
];

export const demoDrops: Drop[] = [
  {
    id: "drop-hidden-spot",
    title: "Tonight's Drop",
    body: "Find someone who knows a hidden Sydney spot.",
    actions: ["I know one", "Ask me", "Join this Circle"],
    relatedCircleId: "table-new",
    status: "live"
  },
  {
    id: "drop-music",
    title: "Music Circle",
    body: "Defend the next song.",
    actions: ["I have a take", "Join this Circle", "Skip"],
    relatedCircleId: "table-music",
    status: "live"
  },
  {
    id: "drop-final",
    title: "Final Drop",
    body: "Final 20 minutes: send one easy Hello.",
    actions: ["Send a Hello", "Not tonight"],
    status: "final"
  }
];

export function drawSignal(redrawUsed = false) {
  const item = signalDeck[Math.floor(Math.random() * signalDeck.length)];
  return { ...item, redrawUsed };
}

export function circleName(table: Pick<EventTable, "name">) {
  return table.name.replace(/\bTable\b/g, "Circle");
}

export function circleStatus(table: EventTable) {
  if (table.isSpotlighted) return "Featured Circle tonight";
  if (table.energyLevel === "Active") return `${circleName(table)} is heating up`;
  if (table.energyLevel === "Quiet") return `${circleName(table)} is quiet. Start it?`;
  return `${circleName(table)} needs ${Math.max(1, table.maxMembers - table.memberCount)} more`;
}

export function signalStorageKey(eventSlug: string) {
  return `barping:signal:${eventSlug}`;
}
