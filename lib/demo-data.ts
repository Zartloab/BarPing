import type {
  ChatMessage,
  ContactExchange,
  Event,
  EventAsset,
  EventRecommendation,
  EventTemplate,
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
  brandColor: "#FF7A6B",
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
  qrScans: 38,
  templateId: "live-music-social",
  vibeLevel: "Social",
  findMeEnabled: true
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
    sharedTopics: ["Music"],
    entryChoice: "Open to pings"
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
    sharedTopics: ["Music", "Film"],
    entryChoice: "Join a table"
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
    sharedTopics: ["Design"],
    entryChoice: "Join a table"
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
    sharedTopics: ["Art"],
    entryChoice: "Join a table"
  },
  {
    id: "guest-soft-static",
    alias: "Soft Static",
    vibe: "Deep Chat",
    topics: ["Life", "Books", "Film"],
    mode: "Open to 1:1 chat",
    note: "Ask me about terrible movies.",
    checkedInAt: new Date(now.getTime() - 7 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    entryChoice: "Open to pings"
  },
  {
    id: "guest-velvet-echo",
    alias: "Velvet Echo",
    vibe: "Social",
    topics: ["Travel", "Food", "Random"],
    mode: "Join a table",
    note: "Came for one drink, stayed for the vibe.",
    checkedInAt: new Date(now.getTime() - 4 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    entryChoice: "Join a table"
  },
  {
    id: "guest-neon-sparrow",
    alias: "Neon Sparrow",
    vibe: "Just Curious",
    topics: ["Games", "Music", "Life"],
    mode: "Open to 1:1 chat",
    note: "Trying the room before the next set.",
    checkedInAt: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
    expiresAt: end.toISOString(),
    entryChoice: "Just browse"
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
    isActive: true,
    energyLevel: "Active",
    hostPrompt: "The set just shifted. What should play after this?",
    isTemplateGenerated: true
  },
  {
    id: "table-new",
    name: "New to Sydney",
    description: "Fresh faces, local tips, easy hellos.",
    maxMembers: 8,
    memberCount: 4,
    prompt: "What is one place in Sydney worth knowing?",
    suggestedTopics: ["Travel", "Food", "Life"],
    isActive: true,
    energyLevel: "Warming up",
    hostPrompt: "Share one local tip you wish you knew earlier.",
    isTemplateGenerated: true
  },
  {
    id: "table-makers",
    name: "Artists & Makers",
    description: "Art, projects, design, things in progress.",
    maxMembers: 12,
    memberCount: 7,
    prompt: "What are you making or trying to make?",
    suggestedTopics: ["Art", "Design", "Startups"],
    isActive: true,
    energyLevel: "Active",
    hostPrompt: "Pitch the project you have not started yet.",
    isTemplateGenerated: true
  },
  {
    id: "table-random",
    name: "Random Table",
    description: "No theme. Just a low-pressure chat.",
    maxMembers: 12,
    memberCount: 3,
    prompt: "What is your safest controversial opinion?",
    suggestedTopics: ["Random", "Games", "Life"],
    isActive: true,
    energyLevel: "Quiet",
    hostPrompt: "Use this table when you do not know what table you want.",
    isTemplateGenerated: true
  }
];

const sharedAssetCopy = {
  tableQr: "Open to meeting people tonight?\n\nScan to join BarPing.\nNo names. No photos. No pressure.",
  entrancePoster: "Conversation tables are live tonight.\n\nScan the QR, pick a table, and join when you're ready.",
  barCounter: "Ask the bar about tonight's tables.\nScan in, read the table prompts, and join when ready.",
  instagramStory: "Tonight: conversation tables are live.\n\nScan in at the bar from 7 PM.\nNo swiping. No photos. No pressure.",
  safetyCard: "Respect the room.\nNo pressure, harassment, hate, or creepy behaviour.\nYou can ignore, block, or report anytime.",
  staffScript:
    "We're running BarPing tonight. Guests scan the QR, see tonight's conversation tables, and join when they're ready. No photos or real names.",
  runOfShow:
    "7:00 PM: QR signs visible, staff briefed.\n7:30 PM: Conversation tables open.\n7:45 PM: First table prompt.\n8:15 PM: Host nudge.\n8:45 PM: Optional table hellos stay table-scoped and mutual.\n9:15 PM: Final prompt.\n9:30 PM: Feedback opens."
};

export const demoEventTemplates: EventTemplate[] = [
  {
    id: "after-work-mixer",
    name: "After Work Mixer",
    eventTitle: "After Work Social",
    eventType: "Coworking Mixer",
    description: "A simple social hour for people arriving in ones and twos.",
    recommendedDurationMinutes: 120,
    socialWindowOffsetMinutes: 30,
    socialWindowDurationMinutes: 105,
    defaultVibeLevel: "Social",
    findMeDefault: true,
    tables: [
      { name: "First Drink", description: "Easy openings and venue recommendations.", prompt: "What should someone order here first?", suggestedTopics: ["Food", "Travel", "Random"], maxMembers: 10, energyLevel: "Warming up" },
      { name: "Work Stories", description: "Low-stakes chat after the laptop closes.", prompt: "What was the least boring part of your week?", suggestedTopics: ["Life", "Startups"], maxMembers: 10, energyLevel: "Quiet" }
    ],
    hostNudges: ["After Work Social is live. Join First Drink if you want an easy start.", "Last call for new table joins in 30 minutes."],
    assets: sharedAssetCopy
  },
  {
    id: "new-to-town-night",
    name: "New to Town Night",
    eventTitle: "New to Sydney Night",
    eventType: "Social Night",
    description: "For people new to the city, scene, or venue.",
    recommendedDurationMinutes: 120,
    socialWindowOffsetMinutes: 20,
    socialWindowDurationMinutes: 110,
    defaultVibeLevel: "Calm",
    findMeDefault: false,
    tables: [
      { name: "New Here", description: "Fresh faces and easy introductions.", prompt: "What brought you to this part of town?", suggestedTopics: ["Travel", "Life", "Food"], maxMembers: 12, energyLevel: "Active" },
      { name: "Local Tips", description: "Recommendations from people who know the area.", prompt: "What place should everyone try once?", suggestedTopics: ["Food", "Music", "Random"], maxMembers: 10, energyLevel: "Warming up" }
    ],
    hostNudges: ["New Here has open seats. Perfect if you just arrived.", "Ask someone for one local tip before the next round."],
    assets: sharedAssetCopy
  },
  {
    id: "live-music-social",
    name: "Live Music Social",
    eventTitle: "Thursday Social Mode",
    eventType: "Live Music",
    description: "Turns a live set into a low-pressure shared conversation.",
    recommendedDurationMinutes: 150,
    socialWindowOffsetMinutes: 30,
    socialWindowDurationMinutes: 120,
    defaultVibeLevel: "Social",
    findMeDefault: true,
    tables: [
      { name: "Music Table", description: "Live set reactions and recommendations.", prompt: "What track should the room hear next?", suggestedTopics: ["Music", "Film"], maxMembers: 10, energyLevel: "Active" },
      { name: "First Time Here", description: "For anyone new to the venue or band.", prompt: "What made you come out tonight?", suggestedTopics: ["Music", "Life", "Random"], maxMembers: 8, energyLevel: "Warming up" },
      { name: "After The Set", description: "Keep the chat going after the last song.", prompt: "What was the best moment of the set?", suggestedTopics: ["Music", "Travel"], maxMembers: 12, energyLevel: "Quiet" }
    ],
    hostNudges: ["Music Table is active. Share your read on the set.", "First Time Here is the easiest place to start.", "Optional hellos stay inside the table and only work if both people allow them."],
    assets: sharedAssetCopy
  },
  {
    id: "singles-without-swiping",
    name: "Singles Without Swiping",
    eventTitle: "Singles Without Swiping",
    eventType: "Singles Social",
    description: "A safer singles night where tables lead and hellos stay mutual.",
    recommendedDurationMinutes: 120,
    socialWindowOffsetMinutes: 20,
    socialWindowDurationMinutes: 100,
    defaultVibeLevel: "Calm",
    findMeDefault: false,
    tables: [
      { name: "No Pressure Table", description: "Group chat before any 1:1.", prompt: "What is your ideal low-pressure night out?", suggestedTopics: ["Life", "Food", "Travel"], maxMembers: 10, energyLevel: "Active" },
      { name: "Conversation Starters", description: "Prompts that are not dating-app coded.", prompt: "What topic can you talk about for too long?", suggestedTopics: ["Books", "Film", "Music"], maxMembers: 10, energyLevel: "Warming up" }
    ],
    hostNudges: ["Start with tables. Hellos are optional, table-scoped, and mutual.", "No pressure is the rule tonight."],
    assets: sharedAssetCopy
  },
  {
    id: "creative-table-night",
    name: "Creative Table Night",
    eventTitle: "Artists & Makers Social",
    eventType: "Creative Meetup",
    description: "For artists, designers, musicians, and project people.",
    recommendedDurationMinutes: 150,
    socialWindowOffsetMinutes: 20,
    socialWindowDurationMinutes: 120,
    defaultVibeLevel: "Mixer",
    findMeDefault: true,
    tables: [
      { name: "Artists & Makers", description: "Projects, ideas, and almost-finished things.", prompt: "What are you making right now?", suggestedTopics: ["Art", "Design", "Music"], maxMembers: 12, energyLevel: "Active" },
      { name: "Collab Corner", description: "Find people for projects without pitching hard.", prompt: "What skill would you love to trade?", suggestedTopics: ["Startups", "Design", "Art"], maxMembers: 8, energyLevel: "Warming up" }
    ],
    hostNudges: ["Artists & Makers is active. Bring a project, not a pitch.", "Collab Corner has open seats."],
    assets: sharedAssetCopy
  },
  {
    id: "uni-backpacker-night",
    name: "Uni / Backpacker Night",
    eventTitle: "New Faces Night",
    eventType: "Uni Event",
    description: "Fast, casual, group-first social energy.",
    recommendedDurationMinutes: 120,
    socialWindowOffsetMinutes: 15,
    socialWindowDurationMinutes: 105,
    defaultVibeLevel: "Mixer",
    findMeDefault: true,
    tables: [
      { name: "Travel Stories", description: "Where people have been and where they are going.", prompt: "What city surprised you most?", suggestedTopics: ["Travel", "Food", "Life"], maxMembers: 12, energyLevel: "Active" },
      { name: "Games Table", description: "Light conversation and silly questions.", prompt: "What game should this table play verbally?", suggestedTopics: ["Games", "Random"], maxMembers: 10, energyLevel: "Warming up" }
    ],
    hostNudges: ["Travel Stories is filling up.", "Games Table is the easiest start if you came alone."],
    assets: sharedAssetCopy
  },
  {
    id: "quiet-tuesday-social",
    name: "Quiet Tuesday Social",
    eventTitle: "Quiet Tuesday Social",
    eventType: "Social Night",
    description: "Gentle density for slower nights.",
    recommendedDurationMinutes: 90,
    socialWindowOffsetMinutes: 15,
    socialWindowDurationMinutes: 75,
    defaultVibeLevel: "Calm",
    findMeDefault: false,
    tables: [
      { name: "Slow Chat", description: "No rush, no performance.", prompt: "What made today decent?", suggestedTopics: ["Life", "Books", "Food"], maxMembers: 8, energyLevel: "Quiet" },
      { name: "Regulars & New Faces", description: "A soft landing for first-timers.", prompt: "What should someone know about this venue?", suggestedTopics: ["Random", "Music"], maxMembers: 10, energyLevel: "Warming up" }
    ],
    hostNudges: ["Slow Chat is open if you want a gentle start.", "No pressure tonight. Tables first."],
    assets: sharedAssetCopy
  },
  {
    id: "private-function-mixer",
    name: "Private Function Mixer",
    eventTitle: "Private Mixer",
    eventType: "Private Event",
    description: "For brand activations, team nights, and private socials.",
    recommendedDurationMinutes: 120,
    socialWindowOffsetMinutes: 20,
    socialWindowDurationMinutes: 100,
    defaultVibeLevel: "Social",
    findMeDefault: true,
    tables: [
      { name: "Introductions", description: "Easy names-free starts for the group.", prompt: "What brought you into the room tonight?", suggestedTopics: ["Life", "Startups", "Random"], maxMembers: 12, energyLevel: "Active" },
      { name: "Topic Table", description: "A flexible table for the event theme.", prompt: "What question should this event answer?", suggestedTopics: ["Design", "Startups", "Art"], maxMembers: 12, energyLevel: "Warming up" }
    ],
    hostNudges: ["Introductions is open for anyone arriving solo.", "Topic Table is live now."],
    assets: sharedAssetCopy
  }
];

export const selectedDemoTemplate = demoEventTemplates.find((template) => template.id === demoEvent.templateId) ?? demoEventTemplates[2];

export const demoEventAssets: EventAsset[] = [
  { id: "asset-table", eventId: demoEvent.id, kind: "table_qr", title: "Table QR card", copy: selectedDemoTemplate.assets.tableQr },
  { id: "asset-poster", eventId: demoEvent.id, kind: "entrance_poster", title: "Entrance poster", copy: selectedDemoTemplate.assets.entrancePoster },
  { id: "asset-counter", eventId: demoEvent.id, kind: "bar_counter", title: "Bar counter sign", copy: selectedDemoTemplate.assets.barCounter },
  { id: "asset-story", eventId: demoEvent.id, kind: "instagram_story", title: "Instagram story", copy: selectedDemoTemplate.assets.instagramStory },
  { id: "asset-safety", eventId: demoEvent.id, kind: "safety_card", title: "Safety card", copy: selectedDemoTemplate.assets.safetyCard },
  { id: "asset-run", eventId: demoEvent.id, kind: "run_sheet", title: "Staff run sheet", copy: selectedDemoTemplate.assets.runOfShow }
];

export const demoRecommendation: EventRecommendation = "Good pilot signal";

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
  colorToken: "#7CFFCB",
  colorName: "Mint Live",
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
    body: "Optional table hellos only work inside the same table when both people agree.",
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
