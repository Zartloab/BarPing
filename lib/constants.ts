import type { VenueVibeLevel, Vibe } from "@/lib/types";

export const communityRules =
  "Be normal. Be kind. No harassment, pressure, hate, explicit messages, or creepy behaviour. Staff and moderators can remove anyone.";

export const safetyNotice =
  "No names, no photos, no exact location. You choose when to respond, ignore, block, or report.";

export const vibeDescriptions: Record<Vibe, string> = {
  Chill: "Low pressure, easy conversation.",
  Social: "Open to meeting new people tonight.",
  Music: "Here for the sound, open to talking about it.",
  "Deep Chat": "More than small talk.",
  "New Here": "New to the venue, city, or scene.",
  Creative: "Art, music, ideas, projects.",
  "Just Curious": "Browsing the room, no pressure."
};

export const vibes = Object.keys(vibeDescriptions) as Vibe[];

export const topics = [
  "Music",
  "Travel",
  "Art",
  "Food",
  "Startups",
  "Games",
  "Life",
  "Books",
  "Film",
  "Fitness",
  "Design",
  "Random"
];

export const reportReasons = [
  "Harassment",
  "Hate or abuse",
  "Sexual or explicit message",
  "Spam",
  "Impersonation",
  "Felt unsafe",
  "Other"
];

export const openerChips = [
  "What brought you here?",
  "First time here?",
  "What music are you into?",
  "What should I order here?",
  "What's your read on this place?",
  "Are you here for the event?"
];

export const launchKit = {
  tableQr: "Open to meeting people tonight?\n\nScan to join BarPing.\nNo names. No photos. No pressure.",
  entrancePoster: "Conversation tables are live tonight.\n\nScan the QR, pick a table, and join when you're ready.",
  staffScript:
    "We're running BarPing tonight. Guests scan the QR, see tonight's conversation tables, and join when they're ready. No photos or real names.",
  safetyCard:
    "Respect the room.\nNo pressure, harassment, hate, or creepy behaviour.\nYou can ignore, block, or report anytime.",
  instagramStory: "Tonight: conversation tables are live.\n\nScan in at the bar from 7 PM.\nNo swiping. No photos. No pressure.",
  runOfShow:
    "7:00 PM: QR signs visible, staff briefed.\n7:30 PM: Host announces conversation tables are live.\n7:45 PM: First table prompt.\n8:15 PM: Nudge New Here and Music Table.\n8:45 PM: Optional table hellos stay table-scoped and mutual.\n9:15 PM: Final table prompt.\n9:30 PM: Night closes and feedback opens.",
  staffIntro:
    "Conversation tables are live now. Scan the QR, pick a table, and join when you're ready. No photos, no real names.",
  midwayPrompt:
    "If you're new here, try the New Here table. If you're here for the set, Music Table is warming up.",
  finalCall:
    "Conversation tables wrap soon. If you had a good chat, you can share contact only if both people agree.",
  findMeSafety:
    "Only use table hellos if both people agree. Keep them inside the same table, rate limited, and easy to end anytime.",
  eventNames: [
    "Thursday Social Mode",
    "New Faces Night",
    "Open Chat Hour",
    "Singles Without Swiping",
    "Creative Social Night",
    "After Work Mixer",
    "Live Music Social",
    "New to Sydney Night",
    "TableTalk Thursday"
  ]
};

export const beaconPalette = [
  { token: "#7CFFCB", name: "Mint Live" },
  { token: "#8EA7FF", name: "Blue Signal" },
  { token: "#FF7A6B", name: "Coral Hello" },
  { token: "#FFD166", name: "Final Call" },
  { token: "#FFF3E8", name: "Warm Light" }
];

export const hostNudges = [
  "Conversation tables are live. Pick a table and join when you're ready.",
  "New Here and Music Table both have open seats.",
  "Last 30 minutes. Keep it kind, temporary, and mutual.",
  "Optional hellos stay inside the table and only work when both people allow them."
];

export const vibeLevelDescriptions: Record<VenueVibeLevel, string> = {
  Calm: "More table prompts, hellos off by default.",
  Social: "Balanced table prompts with optional table-scoped hellos.",
  Mixer: "More host nudges and table prompts, optional hellos available."
};
