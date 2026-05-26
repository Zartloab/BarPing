export type Vibe = "Chill" | "Social" | "Music" | "Deep Chat" | "New Here" | "Creative" | "Just Curious";
export type Mode = "Open to 1:1 chat" | "Join a table" | "With a friend";
export type PingStatus = "pending" | "accepted" | "ignored" | "blocked";
export type ReportStatus = "New" | "Reviewing" | "Actioned" | "Dismissed";
export type SocialWindowStatus = "scheduled" | "active" | "ended";
export type FindMeStatus = "requested" | "active" | "ended" | "expired" | "reported";

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
