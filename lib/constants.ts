import type { GuestEntryChoice, Mode, VenueVibeLevel, Vibe } from "@/lib/types";

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

export const modes: { label: Mode; description: string }[] = [
  { label: "Open to 1:1 chat", description: "For casual one-to-one conversation." },
  { label: "Join a table", description: "Group conversation, lower pressure." },
  { label: "With a friend", description: "Two of us are open to another pair or group." }
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
  entrancePoster: "Social Mode is live tonight.\n\nMeet people already here.\nScan the QR at the bar.",
  staffScript:
    "We're running BarPing tonight. It's an opt-in social tool. Guests scan the QR, choose a vibe, and can chat with others here. No photos or real names.",
  safetyCard:
    "Respect the room.\nNo pressure, harassment, hate, or creepy behaviour.\nYou can ignore, block, or report anytime.",
  instagramStory: "Tonight: Social Mode is live.\n\nScan in at the bar from 7 PM.\nNo swiping. No photos. No pressure.",
  runOfShow:
    "7:00 PM: QR signs visible, staff briefed.\n7:30 PM: Host announces Social Mode is live.\n7:45 PM: First table prompt.\n8:15 PM: Nudge New Here and Music Table.\n8:45 PM: Accepted chats can use Find Me if both agree.\n9:15 PM: Final social prompt.\n9:30 PM: Social Mode winds down and feedback opens.",
  staffIntro:
    "Social Mode is live now. Scan the QR, choose a vibe, and join a table or send a low-pressure ping. No photos, no real names.",
  midwayPrompt:
    "If you're new here, try the New Here table. If you're here for the set, Music Table is warming up.",
  finalCall:
    "Social Mode wraps soon. If you had a good chat, you can share contact only if both people agree.",
  findMeSafety:
    "Only use Find Me if both people agree. Both phones light up the same color for a short time. You can end it anytime.",
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
  { token: "#F0B46A", name: "Warm Amber" },
  { token: "#4D6AAA", name: "Signal Blue" },
  { token: "#7C8061", name: "Olive Light" },
  { token: "#D96B5F", name: "Coral Signal" },
  { token: "#F7F0E3", name: "Cream Light" }
];

export const hostNudges = [
  "Social Mode is live. Join a table or send a low-pressure ping.",
  "New Here and Music Table both have open seats.",
  "Last 30 minutes. Keep it kind, temporary, and mutual.",
  "If an accepted chat feels right, use Find Me only if both people agree."
];

export const guestEntryChoices: { label: GuestEntryChoice; description: string; defaultMode: Mode }[] = [
  {
    label: "Join a table",
    description: "Start with a group prompt and a few open seats.",
    defaultMode: "Join a table"
  },
  {
    label: "Open to pings",
    description: "Browse people and allow low-pressure 1:1 pings.",
    defaultMode: "Open to 1:1 chat"
  },
  {
    label: "Just browsing",
    description: "Look around first. You can opt into pings later.",
    defaultMode: "Join a table"
  }
];

export const vibeLevelDescriptions: Record<VenueVibeLevel, string> = {
  Calm: "More tables, fewer 1:1 prompts, Find Me off by default.",
  Social: "Balanced tables and pings, Find Me on.",
  Mixer: "More host nudges and table prompts, Find Me on."
};
