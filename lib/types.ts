export type Vibe = "Chill" | "Social" | "Music" | "Deep Chat" | "New Here" | "Creative" | "Just Curious";
export type Mode = "Open to 1:1 chat" | "Join a table" | "With a friend";
export type PingStatus = "pending" | "accepted" | "ignored" | "blocked";
export type ReportStatus = "New" | "Reviewing" | "Actioned" | "Dismissed";
export type SocialWindowStatus = "scheduled" | "active" | "ended";
export type FindMeStatus = "requested" | "active" | "ended" | "expired" | "reported";
export type VenueVibeLevel = "Calm" | "Social" | "Mixer";
export type GuestEntryChoice = "Join a table" | "Open to pings" | "Just browse";
export type TableEnergy = "Quiet" | "Warming up" | "Active";
export type DropResponse = "option_a" | "option_b" | "option_c";
export type EventRecommendation =
  | "Good pilot signal"
  | "Run again with stronger signage"
  | "Try table-first format"
  | "Needs host announcement"
  | "Safety review needed";

export type Venue = {
  id: string;
  name: string;
  slug: string;
  suburb: string;
  city: string;
  country: string;
  brandColor: string;
  contactEmail: string;
};

export type Event = {
  id: string;
  venueId: string;
  title: string;
  slug: string;
  eventType: string;
  startsAt: string;
  endsAt: string;
  houseRules: string;
  isLive: boolean;
  isClosed: boolean;
  qrScans: number;
  templateId?: string;
  vibeLevel?: VenueVibeLevel;
  findMeEnabled?: boolean;
};

export type Guest = {
  id: string;
  alias: string;
  vibe: Vibe;
  topics: string[];
  mode: Mode;
  note: string;
  checkedInAt: string;
  expiresAt: string;
  sharedTopics?: string[];
  entryChoice?: GuestEntryChoice;
};

export type EventTable = {
  id: string;
  name: string;
  description: string;
  maxMembers: number;
  memberCount: number;
  prompt: string;
  suggestedTopics: string[];
  isSpotlighted?: boolean;
  isActive?: boolean;
  energyLevel?: TableEnergy;
  hostPrompt?: string;
  isTemplateGenerated?: boolean;
};

export type EventSignal = {
  id: string;
  eventId: string;
  userId: string;
  signalName: string;
  signalSlug: string;
  symbol: string;
  vibe: string;
  suggestedCircles: string[];
  suggestedHelloTemplates: string[];
  redrawUsed: boolean;
  createdAt: string;
  expiresAt: string;
};

export type DropStatus = "upcoming" | "active" | "closed";

export type EventDrop = {
  id: string;
  eventId?: string;
  text: string;
  responseOptions: [string, string, string];
  responseCounts: { option_a: number; option_b: number; option_c: number };
  status: DropStatus;
  title?: string;
  body?: string;
  actionLabels?: string[];
  relatedCircleId?: string;
  startsAt?: string;
  expiresAt?: string;
  createdAt?: string;
};

export type HelloStatus = "pending" | "accepted" | "declined" | "blocked" | "expired";

export type EventHello = {
  id: string;
  eventId: string;
  fromUserId: string;
  toUserId?: string;
  toCircleId?: string;
  contextType: "circle" | "drop" | "open_hello";
  contextId?: string;
  templateText: string;
  customLine?: string;
  status: HelloStatus;
  createdAt: string;
  expiresAt: string;
};

export type Ping = {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: PingStatus;
  message?: string;
  createdAt: string;
  expiresAt: string;
};

export type ChatMessage = {
  id: string;
  sender: "me" | "them" | "system";
  body: string;
  createdAt: string;
};

export type Report = {
  id: string;
  reporterAlias: string;
  reportedAlias: string;
  reason: string;
  status: ReportStatus;
  createdAt: string;
};

export type SocialWindow = {
  id: string;
  eventId: string;
  venueId: string;
  startsAt: string;
  endsAt: string;
  status: SocialWindowStatus;
};

export type FindMeSession = {
  id: string;
  chatId: string;
  eventId: string;
  venueId: string;
  requestedBy: string;
  acceptedBy?: string;
  status: FindMeStatus;
  colorToken: string;
  colorName: string;
  expiresAt: string;
  endedAt?: string;
};

export type ContactExchange = {
  id: string;
  chatId: string;
  eventId: string;
  userAConsented: boolean;
  userBConsented: boolean;
  userAContact?: string;
  userBContact?: string;
};

export type HostAnnouncement = {
  id: string;
  eventId: string;
  venueId: string;
  body: string;
  kind: "announcement" | "table_prompt" | "last_call" | "safety";
  expiresAt: string;
  createdAt: string;
};

export type FeedbackResponse = {
  id: string;
  feltSafe: boolean;
  wouldUseAgain: boolean;
  metSomeone: boolean;
  tableFeltEasier: boolean;
  rating: number;
  comment?: string;
};

export type PilotMetrics = {
  qrScans: number;
  checkIns: number;
  scanToCheckin: number;
  peakActiveGuests: number;
  tableJoins: number;
  pingsSent: number;
  acceptedPings: number;
  chatsCreated: number;
  findMeRequested: number;
  findMeAccepted: number;
  findMeEnded: number;
  reports: number;
  blocks: number;
  bans: number;
  feltSafePercent: number;
  wouldUseAgainPercent: number;
};

export type TemplateAssetCopy = {
  tableQr: string;
  entrancePoster: string;
  barCounter: string;
  instagramStory: string;
  safetyCard: string;
  staffScript: string;
  runOfShow: string;
};

export type TemplateTable = {
  name: string;
  description: string;
  prompt: string;
  suggestedTopics: string[];
  maxMembers: number;
  energyLevel: TableEnergy;
};

export type EventTemplate = {
  id: string;
  name: string;
  eventTitle: string;
  eventType: string;
  description: string;
  recommendedDurationMinutes: number;
  socialWindowOffsetMinutes: number;
  socialWindowDurationMinutes: number;
  defaultVibeLevel: VenueVibeLevel;
  findMeDefault: boolean;
  tables: TemplateTable[];
  hostNudges: string[];
  assets: TemplateAssetCopy;
};

export type EventAssetKind = "table_qr" | "entrance_poster" | "bar_counter" | "instagram_story" | "safety_card" | "run_sheet" | "signal_sheet";

export type EventAsset = {
  id: string;
  eventId: string;
  kind: EventAssetKind;
  title: string;
  copy: string;
};
