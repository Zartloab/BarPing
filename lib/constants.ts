import type { VenueVibeLevel, Vibe } from "@/lib/types";

export const communityRules =
  "Be easy. Be kind. No pressure, harassment, hate, explicit messages, threats, or creepy behaviour. Anyone can ignore, block, or report. The room is temporary. Respect it.";

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
  tableQr: "The room has a hidden layer tonight.\n\nScan the QR. Draw a Signal. Join a Circle.",
  entrancePoster: "The room is live tonight.\n\nDraw a Signal. Follow the Drop. Everything fades tonight.",
  staffScript:
    "We're running BarPing tonight. Guests scan the QR, draw a temporary Signal, follow the Drop, and join a Circle. No photos or real names.",
  safetyCard:
    "Respect the room.\nNo pressure, harassment, hate, or creepy behaviour.\nYou can ignore, block, or report anytime.",
  instagramStory: "Tonight: the room is live.\n\nScan in at the bar.\nNo swiping. No photos. Everything fades tonight.",
  runOfShow:
    "7:00 PM: QR signs visible, staff briefed.\n7:30 PM: Start room.\n7:45 PM: First Drop.\n8:15 PM: Feature a Circle.\n8:45 PM: Optional Hellos stay contextual and mutual.\n9:15 PM: Final Drop.\n9:30 PM: Close room and open recap.",
  staffIntro:
    "The room is live now. Scan the QR, draw a Signal, and join a Circle when you're ready.",
  midwayPrompt:
    "Local Secrets is open. Music Circle is heating up. Follow the Drop if you want an easy start.",
  finalCall:
    "Final Drop soon. If you had a good chat, keep it easy and mutual.",
  findMeSafety:
    "Only send a Hello if it feels right. They can ignore it. No pressure.",
  eventNames: [
    "Thursday Signal Night",
    "New Faces Night",
    "Open Chat Hour",
    "Before Midnight",
    "Creative Social Night",
    "After Work Mixer",
    "Live Music Social",
    "New to Sydney Night",
    "Local Secrets Night"
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
  "The room is live. Draw a Signal and follow the Drop.",
  "Music Circle is heating up. Defend the next song.",
  "Local Secrets needs one good Sydney spot.",
  "Final Drop: send one easy Hello if it feels right."
];

export const vibeLevelDescriptions: Record<VenueVibeLevel, string> = {
  Calm: "More Drops and Circles, Hellos off by default.",
  Social: "Balanced Drops with optional Circle-scoped Hellos.",
  Mixer: "More live Drops, featured Circles, and optional Hellos."
};
