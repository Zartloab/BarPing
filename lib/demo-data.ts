import type {
  ChatMessage,
  ContactExchange,
  Event,
  EventTable,
  FeedbackResponse,
  FindMeSession,
  Guest,
  HostAnnouncement,
  PilotMetrics,
  Ping,
  Report,
  SocialWindow,
  Venue
} from "@/lib/types";

const now = new Date();
const start = new Date(now);
start.setHours(19, 0, 0, 0);
const end = new Date(now);
end.setHours(23, 30, 0, 0);
if (end < now) {
  start.setDate(start.getDate() + 1);
  end.setDate(end.getDate() + 1);
}

export const demoVenue: Venue = {
  id: "venue-demo",
  name: "Demo Bar",
  slug: "demo-bar",
  suburb: "Surry Hills",
  city: "Sydney",
  country: "Australia",
  brandColor: "#D98F45",
  contactEmail: "support@barping.local"
};

export const demoEvent: Event = {
  id: "event-demo",
  venueId: demoVenue.id,
  title: "Thursday Social Mode",
  slug: "thursday-social-mode",
  eventType: "Social Night",
  startsAt: start.toISOString(),
  endsAt: end.toISOString(),
  houseRules:
    "Be normal. Be kind. No harassment, pressure, hate, explicit messages, or creepy behaviour. Staff and moderators can remove anyone.",
  isLive: true,
  isClosed: false,
  qrScans: 38
};

export const demoGuests: Guest[] = [
  {
    id: "guest-quiet-tiger",
    alias: "Quiet Tiger",
    vibe: "Chill",
    topics: ["Music", "Travel", "Food"],
    mode: "Open to 1:1 chat",
    note: "Here for the live set.",
    checkedInAt: new Date(now.getTime() - 18 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    sharedTopics: ["Music"]
  },
  {
    id: "guest-blue-vinyl",
    alias: "Blue Vinyl",
    vibe: "Music",
    topics: ["Music", "Film", "Random"],
    mode: "Join a table",
    note: "Always open to music recommendations.",
    checkedInAt: new Date(now.getTime() - 14 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    sharedTopics: ["Music", "Film"]
  },
  {
    id: "guest-amber-signal",
    alias: "Amber Signal",
    vibe: "New Here",
    topics: ["Art", "Design", "Books"],
    mode: "Open to 1:1 chat",
    note: "New here, trying to meet people.",
    checkedInAt: new Date(now.getTime() - 11 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    sharedTopics: ["Design"]
  },
  {
    id: "guest-olive-moon",
    alias: "Olive Moon",
    vibe: "Creative",
    topics: ["Art", "Startups", "Design"],
    mode: "With a friend",
    note: "Looking for art people.",
    checkedInAt: new Date(now.getTime() - 8 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    sharedTopics: ["Art"]
  },
  {
    id: "guest-soft-static",
    alias: "Soft Static",
    vibe: "Deep Chat",
    topics: ["Life", "Books", "Film"],
    mode: "Open to 1:1 chat",
    note: "Ask me about terrible movies.",
    checkedInAt: new Date(now.getTime() - 7 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString()
  },
  {
    id: "guest-velvet-echo",
    alias: "Velvet Echo",
    vibe: "Social",
    topics: ["Travel", "Food", "Random"],
    mode: "Join a table",
    note: "Came for one drink, stayed for the vibe.",
    checkedInAt: new Date(now.getTime() - 4 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString()
  },
  {
    id: "guest-neon-sparrow",
    alias: "Neon Sparrow",
    vibe: "Just Curious",
    topics: ["Games", "Music", "Life"],
    mode: "Open to 1:1 chat",
    note: "Trying the room before the next set.",
    checkedInAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString()
  }
];

export const demoTables: EventTable[] = [
  {
    id: "table-music",
    name: "Music Table",
    description: "Live set reactions and new recommendations.",
    maxMembers: 10,
    memberCount: 6,
    prompt: "What track should the room hear next?",
    suggestedTopics: ["Music", "Film"],
    isSpotlighted: true,
    isActive: true
  },
  {
    id: "table-new",
    name: "New to Sydney",
    description: "Fresh faces, local tips, easy hellos.",
    maxMembers: 8,
    memberCount: 4,
    prompt: "What is one place in Sydney worth knowing?",
    suggestedTopics: ["Travel", "Food", "Life"],
    isActive: true
  },
  {
    id: "table-makers",
    name: "Artists & Makers",
    description: "Art, projects, design, things in progress.",
    maxMembers: 12,
    memberCount: 7,
    prompt: "What are you making or trying to make?",
    suggestedTopics: ["Art", "Design", "Startups"],
    isActive: true
  },
  {
    id: "table-random",
    name: "Random Table",
    description: "No theme. Just a low-pressure chat.",
    maxMembers: 12,
    memberCount: 3,
    prompt: "What is your safest controversial opinion?",
    suggestedTopics: ["Random", "Games", "Life"],
    isActive: true
  }
];

export const demoPings: Ping[] = [
  {
    id: "ping-1",
    fromUserId: "guest-blue-vinyl",
    toUserId: "me",
    status: "pending",
    message: "You picked Music too. First time hearing this band?",
    createdAt: new Date(now.getTime() - 3 * 60 * 1000).toISOString(),
    expiresAt: new Date(now.getTime() + 12 * 60 * 1000).toISOString()
  }
];

export const demoMessages: ChatMessage[] = [
  { id: "system", sender: "system", body: "This chat is temporary. Be kind. You can end or report anytime.", createdAt: now.toISOString() },
  { id: "m1", sender: "them", body: "Hey, what brought you here tonight?", createdAt: new Date(now.getTime() - 7 * 60 * 1000).toISOString() },
  { id: "m2", sender: "me", body: "The live set mostly. Also trying BarPing for the first time.", createdAt: new Date(now.getTime() - 6 * 60 * 1000).toISOString() }
];

export const demoReports: Report[] = [
  {
    id: "report-1",
    reporterAlias: "Amber Signal",
    reportedAlias: "Soft Static",
    reason: "Felt unsafe",
    status: "Reviewing",
    createdAt: new Date(now.getTime() - 22 * 60 * 1000).toISOString()
  }
];

export const demoSocialWindows: SocialWindow[] = [
  {
    id: "window-demo-active",
    eventId: demoEvent.id,
    venueId: demoVenue.id,
    startsAt: start.toISOString(),
    endsAt: new Date(start.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    status: "active"
  }
];

export const demoFindMeSession: FindMeSession = {
  id: "find-me-demo",
  chatId: "demo-chat",
  eventId: demoEvent.id,
  venueId: demoVenue.id,
  requestedBy: "me",
  acceptedBy: "guest-blue-vinyl",
  status: "active",
  colorToken: "#F0B46A",
  colorName: "Warm Amber",
  expiresAt: new Date(now.getTime() + 90 * 1000).toISOString()
};

export const demoContactExchange: ContactExchange = {
  id: "contact-demo",
  chatId: "demo-chat",
  eventId: demoEvent.id,
  userAConsented: false,
  userBConsented: true,
  userBContact: "ask me in person"
};

export const demoAnnouncements: HostAnnouncement[] = [
  {
    id: "announcement-live",
    eventId: demoEvent.id,
    venueId: demoVenue.id,
    body: "Social Mode is live. Music Table and New to Sydney both have open seats.",
    kind: "announcement",
    expiresAt: end.toISOString(),
    createdAt: new Date(now.getTime() - 10 * 60 * 1000).toISOString()
  },
  {
    id: "announcement-find-me",
    eventId: demoEvent.id,
    venueId: demoVenue.id,
    body: "Accepted chats can use Find Me only if both people agree.",
    kind: "safety",
    expiresAt: end.toISOString(),
    createdAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString()
  }
];

export const demoFeedback: FeedbackResponse[] = [
  { id: "feedback-1", feltSafe: true, wouldUseAgain: true, metSomeone: true, tableFeltEasier: true, rating: 5, comment: "Tables made it easier to start." },
  { id: "feedback-2", feltSafe: true, wouldUseAgain: true, metSomeone: false, tableFeltEasier: true, rating: 4 },
  { id: "feedback-3", feltSafe: true, wouldUseAgain: false, metSomeone: false, tableFeltEasier: false, rating: 3 }
];

export const demoPilotMetrics: PilotMetrics = {
  qrScans: demoEvent.qrScans,
  checkIns: demoGuests.length + 1,
  scanToCheckin: 21,
  peakActiveGuests: 14,
  tableJoins: 18,
  pingsSent: 12,
  acceptedPings: 4,
  chatsCreated: 5,
  findMeRequested: 3,
  findMeAccepted: 2,
  findMeEnded: 1,
  reports: demoReports.length,
  blocks: 2,
  bans: 0,
  feltSafePercent: 100,
  wouldUseAgainPercent: 67
};

export function isDemoMode() {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function getEventBySlug(slug: string) {
  if (slug === demoEvent.slug || slug === "demo") {
    return { venue: demoVenue, event: demoEvent };
  }
  return { venue: demoVenue, event: demoEvent };
}
