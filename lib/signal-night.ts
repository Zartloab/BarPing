import type { DropResponse, EventDrop, EventTable } from "@/lib/types";

export type SignalIdentity = {
  name: string;
  symbol: string;
  vibe: string;
  suggestedCircles: string[];
  helloTemplates: string[];
  redrawUsed: boolean;
};

export type CircleMessage = {
  signal: string;
  body: string;
};

export const responseKeys: DropResponse[] = ["option_a", "option_b", "option_c"];

export const signalDeck: Omit<SignalIdentity, "redrawUsed">[] = [
  {
    name: "The Cassette",
    symbol: "///",
    vibe: "B-side memory. Loud enough when it counts.",
    suggestedCircles: ["The B-Side", "Last Round", "The Regulars"],
    helloTemplates: ["What song saves this room?", "Trade one local secret?", "What should play next?"]
  },
  {
    name: "The Matchbook",
    symbol: "##",
    vibe: "Back-pocket story. Quiet energy.",
    suggestedCircles: ["Last Round", "Lost & Found", "The Regulars"],
    helloTemplates: ["Trade one local secret?", "What brought you here tonight?", "You seem like someone with a good story."]
  },
  {
    name: "The Moth",
    symbol: "--",
    vibe: "Drawn to the loud bit. Stays for the weird part.",
    suggestedCircles: ["The B-Side", "Exit Interview", "Lost & Found"],
    helloTemplates: ["Also here for the music?", "What genuinely surprised you?", "I need your worst taxi story."]
  },
  {
    name: "The Broken Amp",
    symbol: "++",
    vibe: "Strong opinions. Friendly volume.",
    suggestedCircles: ["The B-Side", "Exit Interview", "Last Round"],
    helloTemplates: ["Pick a hill to die on?", "Help settle the Drop?", "Fake band name. Go."]
  },
  {
    name: "The Back Booth",
    symbol: "[]",
    vibe: "Sees everything. Says less.",
    suggestedCircles: ["The Regulars", "Lost & Found", "Last Round"],
    helloTemplates: ["What's the move after this?", "Trade one place you rate?", "First time here?"]
  },
  {
    name: "The Last Song",
    symbol: "~~",
    vibe: "Here until the lights come up.",
    suggestedCircles: ["The B-Side", "Last Round", "Exit Interview"],
    helloTemplates: ["What song only works now?", "One easy Hello?", "What saved your week?"]
  }
];

export const demoDrops: EventDrop[] = [
  {
    id: "drop-song-save-room",
    text: "What song would save this room right now?",
    responseOptions: ["Something loud", "Something sad", "Something embarrassing"],
    responseCounts: { option_a: 7, option_b: 5, option_c: 6 },
    status: "active",
    relatedCircleId: "table-music"
  },
  {
    id: "drop-local-venues",
    text: "Pick a hill to die on: local venues edition.",
    responseOptions: ["I have one", "Strong opinions", "No hills here"],
    responseCounts: { option_a: 6, option_b: 8, option_c: 3 },
    status: "upcoming",
    relatedCircleId: "table-regulars"
  },
  {
    id: "drop-good-idea",
    text: "Someone here has a story that starts with 'so we thought it was a good idea to...'",
    responseOptions: ["That's me", "I need to find them", "I'm listening"],
    responseCounts: { option_a: 4, option_b: 9, option_c: 5 },
    status: "upcoming",
    relatedCircleId: "table-lost-found"
  },
  {
    id: "drop-secret-song",
    text: "What's a song people pretend not to like but absolutely do?",
    responseOptions: ["I have one", "Too many", "Judging no one"],
    responseCounts: { option_a: 8, option_b: 6, option_c: 4 },
    status: "upcoming",
    relatedCircleId: "table-music"
  },
  {
    id: "drop-bad-starter",
    text: "Best bad conversation starter: worst taxi story, fake band name, or regrettable drink?",
    responseOptions: ["I've got one", "All three", "Please no"],
    responseCounts: { option_a: 5, option_b: 7, option_c: 3 },
    status: "upcoming",
    relatedCircleId: "table-exit-interview"
  },
  {
    id: "drop-defend-place",
    text: "Name one place you would actually defend.",
    responseOptions: ["Easy", "It's complicated", "I'm from somewhere embarrassing"],
    responseCounts: { option_a: 9, option_b: 5, option_c: 2 },
    status: "upcoming",
    relatedCircleId: "table-regulars"
  },
  {
    id: "drop-exact-moment",
    text: "What's a song that only works at the exact right moment?",
    responseOptions: ["I know it", "It's playing right now", "Still searching"],
    responseCounts: { option_a: 6, option_b: 4, option_c: 7 },
    status: "upcoming",
    relatedCircleId: "table-music"
  },
  {
    id: "drop-final",
    text: "Final Drop: send one easy Hello before the room closes.",
    responseOptions: ["I already did", "I'm working up to it", "Maybe not tonight"],
    responseCounts: { option_a: 5, option_b: 8, option_c: 6 },
    status: "closed"
  }
];

export const activityFeedItems = [
  "The Moth joined The B-Side",
  "A Hello was accepted in Last Round",
  "The Broken Amp responded to tonight's Drop",
  "The Back Booth is in Exit Interview",
  "New Drop in 11 minutes",
  "The Cassette opened a chat tonight",
  "Lost & Found has 2 new Signals",
  "The Matchbook joined The Regulars",
  "The Last Song peeked into The B-Side",
  "A Hello was sent from Lost & Found",
  "Exit Interview is warming up",
  "The room is still awake"
];

export const helloStarters: Record<string, [string, string, string, string]> = {
  "The Cassette": ["What song saves this room?", "What brought you here tonight?", "You seem like someone with a good story.", "What's the last thing that genuinely surprised you?"],
  "The Matchbook": ["Trade one local secret?", "What brought you here tonight?", "You seem like someone with a good story.", "What's the last thing that genuinely surprised you?"],
  "The Moth": ["Also here for the music?", "What brought you here tonight?", "You seem like someone with a good story.", "What's the last thing that genuinely surprised you?"],
  "The Broken Amp": ["Pick a hill to die on?", "What brought you here tonight?", "You seem like someone with a good story.", "What's the last thing that genuinely surprised you?"],
  "The Back Booth": ["What's the move after this?", "What brought you here tonight?", "You seem like someone with a good story.", "What's the last thing that genuinely surprised you?"],
  "The Last Song": ["What song only works now?", "What brought you here tonight?", "You seem like someone with a good story.", "What's the last thing that genuinely surprised you?"]
};

export const demoCircleMessages: Record<string, CircleMessage[]> = {
  "table-music": [
    { signal: "The Cassette", body: "A song that should not work this late, but does." },
    { signal: "The Moth", body: "There is always one track that fixes the room." },
    { signal: "The Broken Amp", body: "I will defend the bad chorus if needed." }
  ],
  "table-last-round": [
    { signal: "The Matchbook", body: "The impressive order is confidence, sadly." },
    { signal: "The Last Song", body: "Anything with a lime looks intentional." },
    { signal: "The Back Booth", body: "Water first. Then the lie." }
  ],
  "table-exit-interview": [
    { signal: "The Broken Amp", body: "Best thing this week: someone cancelled a meeting." },
    { signal: "The Moth", body: "I found twenty bucks in an old jacket." },
    { signal: "The Cassette", body: "A song came on exactly when it should." }
  ],
  "table-regulars": [
    { signal: "The Back Booth", body: "The move after this is not telling everyone the move." },
    { signal: "The Matchbook", body: "There is a place nearby that still gets it right." },
    { signal: "The Last Song", body: "Never leave before the second-last song." }
  ],
  "table-lost-found": [
    { signal: "The Moth", body: "Lost: keys, nerve, one jacket. Found: the jacket." },
    { signal: "The Broken Amp", body: "Lost my voice at the worst possible karaoke." },
    { signal: "The Back Booth", body: "Found a note in a book once. Kept it." }
  ]
};

export function drawSignal(redrawUsed = false) {
  const item = signalDeck[Math.floor(Math.random() * signalDeck.length)];
  return { ...item, redrawUsed };
}

export function circleName(circle: Pick<EventTable, "name">) {
  return circle.name.replace(/\bTable\b/g, "Circle");
}

export function circleStatus(circle: EventTable) {
  if (circle.isSpotlighted) return "Hot";
  if (circle.energyLevel === "Active") return "Hot";
  if (circle.energyLevel === "Quiet") return "Quiet";
  return "Open";
}

export function selectedResponseLabel(drop: EventDrop, response: DropResponse | null) {
  if (!response) return "";
  const index = responseKeys.indexOf(response);
  return drop.responseOptions[index] ?? "";
}

export function responseCount(drop: EventDrop) {
  return responseKeys.reduce((total, key) => total + drop.responseCounts[key], 0);
}

export function signalStorageKey(eventSlug: string) {
  return `barping_signal_${eventSlug}`;
}

export function oldSignalStorageKey(eventSlug: string) {
  return `barping:signal:${eventSlug}`;
}

export function dropResponseStorageKey(eventSlug: string) {
  return `barping_drop_response_${eventSlug}`;
}

export function circlesStorageKey(eventSlug: string) {
  return `barping_circles_${eventSlug}`;
}

export function helloUnlockStorageKey(eventSlug: string) {
  return `barping_hello_unlock_${eventSlug}`;
}

export function readJsonStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}
