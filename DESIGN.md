---
version: v4
name: BarPing-design-system
description: "A premium, mobile-first venue social-night design system for BarPing V4. The system blends cinematic low-lit venue atmosphere with precise operational controls. It is built for a QR-based social night tool where bars can create, print, launch, manage, and repeat a live Social Mode event in minutes. The design avoids dating-app tropes, generic SaaS dashboards, fake QR visuals, neon nightclub styling, and vague 'premium dark mode' clichés. It treats BarPing as a venue pass, host console, launch kit generator, and guest social room."
product_tagline: "Run a social night in 5 minutes."
visual_thesis: "A warm, low-lit digital venue pass system: amber bar-light, charcoal surfaces, cream typography, quiet status indicators, tactile QR launch assets, and host controls that feel operational rather than analytical."
keywords:
  - venue social mode
  - QR launch kit
  - low-pressure social night
  - dark premium UI
  - warm nightlife
  - host console
  - no swiping
  - no photos
  - no GPS
  - operational simplicity
colors:
  canvas: "#080807"
  canvas_warm: "#0D0B08"
  surface_1: "#11100D"
  surface_2: "#171510"
  surface_3: "#1F1C15"
  surface_4: "#282318"
  surface_glass: "rgba(23,21,16,0.78)"
  hairline: "rgba(255,244,220,0.08)"
  hairline_strong: "rgba(255,244,220,0.16)"
  hairline_hot: "rgba(217,143,69,0.36)"
  ink: "#F7F0E3"
  ink_muted: "#B8AA92"
  ink_subtle: "#8E806C"
  ink_tertiary: "#6E6354"
  ink_disabled: "#50483C"
  accent: "#D98F45"
  accent_soft: "#F0B46A"
  accent_deep: "#9E5E27"
  olive: "#7C8061"
  olive_soft: "#A4A77D"
  cobalt: "#4D6AAA"
  cobalt_soft: "#7893D6"
  success: "#83A66A"
  warning: "#E0A84F"
  danger: "#D96B5F"
  danger_soft: "#F0A79E"
  qr_dark: "#14110D"
  qr_light: "#F7F0E3"
  overlay: "rgba(0,0,0,0.72)"
  glow_amber: "rgba(217,143,69,0.22)"
  glow_amber_strong: "rgba(217,143,69,0.34)"
  glow_blue: "rgba(77,106,170,0.18)"
  glow_olive: "rgba(124,128,97,0.16)"
typography:
  display_family: "Instrument Serif, Playfair Display, Georgia, serif"
  ui_family: "Geist Sans, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  mono_family: "Geist Mono, JetBrains Mono, SFMono-Regular, Consolas, ui-monospace, monospace"
  display_xl:
    fontSize: "64px"
    lineHeight: "0.94"
    fontWeight: 500
    letterSpacing: "-1.8px"
  display_lg:
    fontSize: "48px"
    lineHeight: "0.98"
    fontWeight: 500
    letterSpacing: "-1.2px"
  display_md:
    fontSize: "36px"
    lineHeight: "1.04"
    fontWeight: 500
    letterSpacing: "-0.8px"
  headline:
    fontSize: "28px"
    lineHeight: "1.12"
    fontWeight: 600
    letterSpacing: "-0.6px"
  card_title:
    fontSize: "22px"
    lineHeight: "1.18"
    fontWeight: 600
    letterSpacing: "-0.35px"
  body_lg:
    fontSize: "18px"
    lineHeight: "1.5"
    fontWeight: 400
    letterSpacing: "-0.1px"
  body:
    fontSize: "16px"
    lineHeight: "1.5"
    fontWeight: 400
    letterSpacing: "-0.05px"
  body_sm:
    fontSize: "14px"
    lineHeight: "1.45"
    fontWeight: 400
    letterSpacing: "0px"
  caption:
    fontSize: "12px"
    lineHeight: "1.35"
    fontWeight: 500
    letterSpacing: "0.02em"
  micro:
    fontSize: "10px"
    lineHeight: "1.2"
    fontWeight: 600
    letterSpacing: "0.12em"
spacing:
  base: "4px"
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  xxl: "32px"
  xxxl: "48px"
  section: "72px"
radius:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "20px"
  xl: "28px"
  xxl: "36px"
  pill: "999px"
  full: "9999px"
layout:
  mobile_max_width: "430px"
  desktop_admin_max_width: "1180px"
  page_padding_mobile: "20px"
  page_padding_desktop: "32px"
  touch_target_min: "44px"
motion:
  duration_fast: "120ms"
  duration_base: "180ms"
  duration_slow: "280ms"
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
---

# BarPing V4 DESIGN.md

This file is the design source of truth for BarPing V4.

Before changing any UI, read this file. Do not invent visual style, colours, spacing, component behaviour, copy tone, or layout rules outside this document unless the user explicitly asks for a new design direction.

BarPing V4 is not a generic social app. It is not a dating app. It is not a dashboard-first SaaS product. It is a venue pilot tool that helps a bar run a real social night in minutes.

The design must make the product feel real enough for a venue owner to print the launch kit, start Social Mode, and trust guests to use it safely.

---

## 1. Product Understanding

### 1.1 What BarPing V4 is

BarPing V4 is a QR-based venue social-night platform. A venue admin logs in, chooses a night template, reviews the generated event, prints/shares the launch kit, starts Social Mode, manages live room nudges, and views a simple after-report.

The whole product promise is:

> Run a social night in 5 minutes.

The venue flow is:

1. Log in.
2. Choose a night template.
3. Review generated night.
4. Print/share launch assets.
5. Start Social Mode.
6. Manage the room.
7. Close the night.
8. View after-report.
9. Run it again.

The guest flow is:

1. Scan QR.
2. Land on `/e/[eventSlug]`.
3. See venue/event state.
4. Join only when Social Mode is live.
5. Choose one of three simple modes:
   - Join a table
   - Open to pings
   - Just browsing
6. Use the live room without photos, swiping, GPS, or pressure.

### 1.2 What BarPing V4 is not

BarPing is not:

- a dating app
- a swipe app
- an anonymous global chat app
- a nightlife discovery app
- a map/location product
- a heavy analytics SaaS dashboard
- a gamified flirting app
- a neon club visual system
- a fake QR demo UI
- a crypto-like dark dashboard
- a product with profile photos
- a product that exposes precise user location

If a UI decision makes BarPing feel like Tinder, Bumble, Snapchat, Discord, or a generic SaaS template, reject it.

---

## 2. Design Thesis

BarPing should feel like a premium digital venue pass combined with a calm host console.

Guest-facing screens should feel like:

- a low-lit bar menu
- a members-only event pass
- a warm printed ticket
- a small social signal inside a venue
- something temporary, safe, and live

Venue-facing screens should feel like:

- a host control panel
- a launch checklist
- a print kit studio
- an event run sheet
- a simple operations surface

The overall mood is:

```txt
warm / low-lit / precise / social / temporary / safe / printed / tactile / live
```

The design should create trust by reducing ambiguity. Every screen should answer:

- What night is this?
- Is Social Mode live?
- What can I do right now?
- Is this safe?
- What happens next?

---

## 3. Brand Personality

### 3.1 Voice

BarPing speaks like a calm host, not a marketer.

Use copy that is:

- short
- warm
- direct
- low-pressure
- venue-aware
- safety-conscious
- human

Avoid copy that is:

- thirsty
- romantic by default
- overly playful
- hypey
- corporate
- vague
- technical

### 3.2 Example voice

Good:

```txt
Social Mode is live.
Meet people already here.
No swiping. No photos. No pressure.
Join a table, open to pings, or just browse.
You can leave anytime.
```

Bad:

```txt
Find your perfect match tonight!
Discover hot singles near you!
Unlock premium social analytics!
Your venue engagement solution powered by AI!
```

### 3.3 Emotional promise

For guests:

> It is safe to be a little more open tonight.

For venues:

> You can run a better social night without becoming an event producer.

---

## 4. Visual System Overview

### 4.1 Core visual metaphor

The core visual metaphor is **a digital venue pass under warm bar light**.

Use:

- dark warm backgrounds
- cream type
- amber accent lighting
- charcoal cards
- printed-ticket surfaces
- QR-forward layouts
- subtle status dots
- tactile chips
- operational buttons

Do not use:

- bright neon gradients
- rainbow social app colours
- glassmorphism everywhere
- stock avatars
- hearts/flames/kiss icons
- large emoji-based UI
- dating app card stacks
- fake QR illustrations
- random grey dashboards

### 4.2 Visual formula

```txt
Guest screens = cinematic warmth + digital pass cards + safety clarity
Venue screens = operational precision + launch checklist + premium print studio
Assets = event poster design + scannable QR clarity + venue-safe copy
```

---

## 5. Colour System

### 5.1 Colour tokens

Use the frontmatter colour tokens exactly. Do not introduce new brand colours unless explicitly requested.

Primary surfaces:

| Token | Value | Use |
|---|---:|---|
| `canvas` | `#080807` | Main app background |
| `canvas_warm` | `#0D0B08` | Warm alternate background |
| `surface_1` | `#11100D` | Elevated page panels |
| `surface_2` | `#171510` | Default cards |
| `surface_3` | `#1F1C15` | Stronger cards / selected states |
| `surface_4` | `#282318` | High emphasis inner panels |

Text:

| Token | Value | Use |
|---|---:|---|
| `ink` | `#F7F0E3` | Primary text |
| `ink_muted` | `#B8AA92` | Secondary text |
| `ink_subtle` | `#8E806C` | Metadata, helper text |
| `ink_tertiary` | `#6E6354` | Low emphasis labels |
| `ink_disabled` | `#50483C` | Disabled controls |

Accents:

| Token | Value | Use |
|---|---:|---|
| `accent` | `#D98F45` | Primary action, live warmth |
| `accent_soft` | `#F0B46A` | Hover, active glow, QR asset highlights |
| `accent_deep` | `#9E5E27` | Pressed state, deep amber |
| `olive` | `#7C8061` | Safety, calm, tables, secondary accents |
| `cobalt` | `#4D6AAA` | System/host status, links, selected secondary states |
| `danger` | `#D96B5F` | Reports, blocks, destructive actions |

### 5.2 Colour usage rules

- Amber is the primary action colour. Use it for “Enter tonight,” “Create night,” “Start Social Mode,” and active states.
- Amber should feel like warm light, not a warning label.
- Olive is the safety/calm colour. Use it for community rules, safety notices, and table states.
- Cobalt is for operational/system emphasis, not guest romance.
- Danger is used only for destructive or safety actions: report, block, ban, close permanently.
- Do not use bright red for normal errors. Use `danger` on dark with calm copy.
- Do not use pure white backgrounds in app UI. Print assets may use cream backgrounds.
- QR codes must always have high contrast. Use `qr_dark` on `qr_light` or black on white when required for scan reliability.

### 5.3 Background glows

Use radial glows sparingly:

```css
background:
  radial-gradient(circle at 50% 0%, rgba(217,143,69,0.22), transparent 34%),
  radial-gradient(circle at 85% 18%, rgba(77,106,170,0.14), transparent 28%),
  #080807;
```

Rules:

- Landing pages may use one amber glow and one soft cobalt glow.
- Live room screens should use less glow; preserve readability.
- Dashboard screens should use almost no glow.
- Print assets should not rely on glows behind QR codes.

---

## 6. Typography

### 6.1 Font families

Use:

```css
--font-display: "Instrument Serif", "Playfair Display", Georgia, serif;
--font-ui: "Geist Sans", Inter, ui-sans-serif, system-ui, sans-serif;
--font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
```

If custom fonts are unavailable, use the fallback stack. Do not block UI rendering waiting on fonts.

### 6.2 Typography roles

Display serif:

- landing headlines
- event poster headlines
- launch kit previews
- hero statements
- emotional guest-facing copy

UI sans:

- buttons
- forms
- cards
- dashboard
- tables
- settings
- body text

Mono:

- status labels
- event slugs
- QR labels
- timestamps
- tiny operational metadata
- `LIVE`, `SETUP`, `CLOSED`, `SOCIAL MODE`

### 6.3 Text hierarchy

Use these practical mobile defaults:

| Role | Size | Weight | Family | Use |
|---|---:|---:|---|---|
| Display XL | 56–64px | 500 | Serif | Landing hero only |
| Display LG | 42–48px | 500 | Serif | Asset headlines |
| Display MD | 32–36px | 500 | Serif | Guest section headings |
| Headline | 26–28px | 600 | Sans | Dashboard titles |
| Card title | 20–22px | 600 | Sans | Cards and panels |
| Body | 16px | 400 | Sans | Main readable text |
| Body SM | 14px | 400 | Sans | Helper text |
| Caption | 12px | 500 | Sans/Mono | Metadata |
| Micro | 10px | 600 | Mono | Status labels |

### 6.4 Typography rules

- Avoid huge blocks of centered body copy.
- Guest-facing landing pages can center hero text.
- Dashboard copy should be left-aligned.
- Use sentence case, not title case, for buttons and labels.
- Use short line lengths on mobile.
- Do not use all-caps except mono status labels.
- Use display serif only where it adds atmosphere. Do not use it for admin tables or form labels.

---

## 7. Layout System

### 7.1 Mobile-first rule

The guest experience is mobile-first. The app should look best at 390–430px wide.

Use:

```txt
Max guest app width: 430px
Mobile page padding: 20px
Card padding: 20px
Section gap: 20–32px
Touch target minimum: 44px
```

Desktop should center the mobile guest app in a warm canvas. Do not stretch guest screens awkwardly across desktop.

### 7.2 Venue dashboard layout

Venue admin can use wider screens.

Use:

```txt
Max admin width: 1180px
Desktop padding: 32px
Dashboard cards: 2–3 column max
Primary action row: always visible near top
Advanced analytics: hidden until After mode
```

The dashboard should not feel like a BI product. It should feel like an event console.

### 7.3 Vertical rhythm

Use this order:

1. Status / venue context
2. Main action
3. Supporting checklist/cards
4. Details
5. Secondary actions

Do not put analytics above the next action.

For example, on the venue dashboard:

Good order:

1. “Next night: New Faces Night”
2. “Print launch kit” / “Start Social Mode”
3. Setup checklist
4. Live status
5. Recent reports

Bad order:

1. Charts
2. KPIs
3. Tables
4. Tiny start button

---

## 8. Elevation and Depth

BarPing uses surface layering, hairlines, and warm glows. It does not rely on heavy shadows.

### 8.1 Elevation levels

| Level | Treatment | Use |
|---|---|---|
| 0 | Canvas only | Page background |
| 1 | `surface_1` + hairline | Main containers |
| 2 | `surface_2` + hairline | Cards |
| 3 | `surface_3` + strong hairline | Selected cards, modals |
| 4 | Amber/blue glow + border | Live states, primary selected state |

### 8.2 Shadow rules

Use shadows only as soft ambient separation:

```css
box-shadow: 0 18px 70px rgba(0,0,0,0.34);
```

For amber live elements:

```css
box-shadow: 0 0 0 1px rgba(217,143,69,0.28), 0 18px 60px rgba(217,143,69,0.10);
```

Do not use bright, coloured shadows around every component.

---

## 9. Shape System

### 9.1 Radius scale

Use:

| Token | Value | Use |
|---|---:|---|
| `xs` | 6px | tiny labels, internal chips |
| `sm` | 10px | small controls |
| `md` | 14px | inputs |
| `lg` | 20px | dashboard cards |
| `xl` | 28px | guest cards, launch kit cards |
| `xxl` | 36px | hero panels, poster previews |
| `pill` | 999px | buttons, chips, tabs |

### 9.2 Shape rules

- Guest cards use `xl` radius.
- Primary buttons are pills.
- Dashboard cards use `lg` or `xl` radius.
- Print asset previews can use sharper corners if simulating real paper.
- Do not use inconsistent radius values like 7px, 17px, 22px.
- Do not mix square admin tables with round guest cards without reason.

---

## 10. Motion

Motion should feel like a calm host moving the night along.

Use Framer Motion sparingly.

### 10.1 Motion rules

Allowed:

- page fade + 8px upward slide
- card enter stagger
- selected chip scale from 0.98 to 1
- live dot pulse
- modal fade/scale from 0.98
- success glow after starting Social Mode
- QR asset preview fade-in

Avoid:

- bouncy spring chaos
- confetti
- spinning QR codes
- dating-app card swipes
- looping background animations
- huge parallax sections

### 10.2 Timing

Use:

```txt
Fast: 120ms
Base: 180ms
Slow: 280ms
Ease: cubic-bezier(0.22, 1, 0.36, 1)
```

---

## 11. Iconography

Use `lucide-react` sparingly.

Good icons:

- `QrCode`
- `Radio`
- `Users`
- `MessageCircle`
- `Megaphone`
- `ShieldCheck`
- `Clock`
- `Printer`
- `Download`
- `Copy`
- `Play`
- `Pause`
- `Square`
- `Sparkles` only when very subtle
- `AlertTriangle` for safety states

Avoid:

- heart icons
- flame icons
- kiss/love icons
- excessive smileys
- map pins for guests
- target/crosshair icons
- anything that implies tracking a person physically

Icons should support labels, not replace them.

---

## 12. QR Design Rules

V4 must remove all fake QR visuals. Every QR displayed in the product must be a real scannable QR generated from the actual event URL using the shared QR component.

### 12.1 QR component rules

Shared component name:

```tsx
<RealQRCode value={url} size={...} variant={...} />
```

Required behaviours:

- Use the `qrcode` package or a reliable QR renderer.
- Encode the exact guest event URL.
- Use high contrast.
- Do not place gradients inside QR modules.
- Do not put glow under QR code if it reduces scan reliability.
- Do not distort aspect ratio.
- Add quiet zone around QR.
- Test QR with actual phone camera.

### 12.2 QR visual variants

Use these variants:

| Variant | Use | Style |
|---|---|---|
| `screen` | dashboard / setup screen | cream background, dark QR |
| `print` | printable assets | black/dark QR on cream/white |
| `story` | Instagram story | QR in strong cream card |
| `compact` | safety card / bar sign | simple, high contrast |

### 12.3 QR placement

QR should always be paired with:

- clear CTA: “Scan to join tonight”
- event title
- venue name
- short trust line: “No photos · No swiping · Temporary”

Do not show a QR with no explanation.

---

## 13. Core Components

### 13.1 AppShell

Purpose:

Frames guest-facing mobile UI.

Structure:

- full-height warm dark background
- centered max-width mobile container
- safe area support
- radial glows on landing only
- bottom padding for mobile browsers

Rules:

- Do not stretch guest UI beyond 430px.
- On desktop, center the mobile app and allow ambient background.
- Use `min-h-dvh` rather than brittle `100vh`.

### 13.2 VenueAdminShell

Purpose:

Frames venue/admin UI.

Structure:

- dark canvas
- top bar with venue identity and status
- max-width 1180px
- primary action area near top
- cards for setup, launch kit, host controls, reports

Rules:

- Avoid generic sidebars unless the app genuinely needs one.
- V4 should feel like a guided launch path, not enterprise software.
- On mobile, venue admin should still be usable for staff behind the bar.

### 13.3 StatusPill

Purpose:

Shows `Set up`, `Live`, `Paused`, `Closed`, `After mode`.

Variants:

- Setup: charcoal + muted text
- Live: amber glow + pulsing dot
- Paused: cobalt/olive subdued
- Closed: muted/danger-subtle
- After: olive/cobalt

Copy:

```txt
SET UP
LIVE
PAUSED
CLOSED
AFTER MODE
```

Use mono micro labels.

### 13.4 PrimaryButton

Purpose:

Main action.

Style:

```txt
background: accent
text: #14110D
radius: pill
height: 48–54px
padding: 0 20px
font-weight: 650
soft amber shadow
```

Use for:

- Enter tonight
- Create night
- Print launch kit
- Start Social Mode
- Send nudge
- Run this again

Do not use for destructive actions.

### 13.5 SecondaryButton

Purpose:

Secondary action.

Style:

```txt
background: transparent or surface_2
border: hairline_strong
text: ink
radius: pill
height: 44–48px
```

Use for:

- Copy link
- Preview guest page
- Pause
- Download PNG
- Edit template

### 13.6 DangerButton

Purpose:

Safety/destructive action.

Style:

```txt
background: transparent
border: rgba(217,107,95,0.34)
text: danger_soft
radius: pill
```

Use for:

- Block
- Report
- Ban from event
- Close night permanently

Never make danger buttons more visually dominant than the main safe action unless it is an emergency screen.

### 13.7 SurfaceCard

Purpose:

Default app card.

Style:

```txt
background: surface_2
border: 1px solid hairline
radius: xl for guest, lg/xl for admin
padding: 20–24px
```

Hover on desktop:

```txt
border: hairline_strong
background: surface_3
```

### 13.8 VenuePassCard

Purpose:

The core guest profile/social signal card. This is the most important guest component.

It should feel like a temporary pass, not a dating profile.

Content:

- top micro label: `LIVE AT [VENUE]`
- time remaining
- alias
- mode/vibe
- topic chips
- optional note
- shared topics
- action button
- abstract signal mark, not avatar

Example structure:

```txt
┌──────────────────────────────┐
│ LIVE AT BUTTON BAR       42m │
│                              │
│        Quiet Tiger           │
│   Social · Music · Art       │
│                              │
│ “Here for the live set.”     │
│                              │
│ Shared: Music, Art           │
│                     Ping →   │
└──────────────────────────────┘
```

Visual rules:

- Use no profile photos.
- Use no gender-coded styling.
- Use no attractiveness cues.
- Use an abstract signal mark: dot cluster, waveform, ring, or small pass stamp.
- Use amber only for active/pingable state.
- Use muted state for browsing-only guests.

### 13.9 VibeSelector

Purpose:

Lets user/admin choose vibe level or guest signal.

Style:

- tactile cards/chips
- selected card has amber border and faint glow
- selected chip has amber fill or amber-tinted surface
- disabled options are visibly muted

Guest vibes:

```txt
Chill
Social
Music
Deep Chat
New Here
Creative
Just Curious
```

Venue vibe levels:

```txt
Quiet
Balanced
Social
High-energy
```

Do not use “flirty” as a default vibe. If a singles template exists, keep it low-pressure.

### 13.10 TopicChips

Purpose:

Selectable topics and table tags.

Topics:

```txt
Music
Travel
Art
Food
Startups
Games
Life
Random
```

Style:

- pill shape
- small but tappable
- selected: amber/olive-tinted
- unselected: warm border, muted text

### 13.11 TemplateCard

Purpose:

Venue chooses a reusable night recipe.

Content:

- template title
- one-line outcome
- best for
- estimated social window
- generated tables count
- vibe level
- Find Me/Open to Pings support indicator

Example:

```txt
New Faces Night
A low-pressure night for people open to meeting someone new.
Best for: mid-week bars · 7–10 PM
Creates: 4 tables · 6 prompts · launch kit
```

Visual rules:

- Template cards should feel like event recipes.
- The selected template should feel confidently chosen.
- Do not overload with analytics.

### 13.12 LaunchKitAssetCard

Purpose:

Preview, print, download, and copy launch assets.

Content:

- asset name
- usage note
- preview
- Print button
- Download PNG button
- Copy text button

Assets:

- Table QR card
- Entrance poster
- Bar counter sign
- Instagram story
- Safety card
- Staff run sheet

Rules:

- QR assets must show real QR.
- Staff run sheet does not show guest QR.
- Each asset type must preview in its correct aspect ratio.
- Print/download controls should be obvious.
- Do not make every preview the same card with different text.

### 13.13 HostControlPanel

Purpose:

Live operational controls for venue staff.

The host should never need to interpret a dashboard.

Main controls:

1. Start Social Mode
2. Pause
3. Send nudge
4. Spotlight table
5. Final call
6. Close night

Rules:

- Use large buttons.
- Show current live state at the top.
- Show “guest page currently says…” preview.
- Put reports/safety alerts in a visible but not panic-inducing panel.

### 13.14 AnnouncementComposer

Purpose:

Host sends live announcements.

Presets:

```txt
Welcome in. Pick a table or open yourself to pings.
Tonight’s icebreaker: What song would instantly improve this room?
A few tables are warming up. Join one if you’re browsing.
Final call: Social Mode wraps soon. Say hello while it’s live.
```

Rules:

- Presets first, custom text second.
- Avoid blank text boxes that require staff creativity.
- Keep messages under 140 characters where possible.

### 13.15 SafetyNotice

Purpose:

Reassure users without making the product feel dangerous.

Example:

```txt
You control your night. Ignore, block, report, or leave anytime.
```

Rules:

- Safety copy should be calm.
- Do not use threatening language unless explaining rules.
- Make report/block visible but not the dominant vibe.

### 13.16 EmptyRoomState

Purpose:

Make low-density moments feel hosted rather than broken.

Bad:

```txt
No users found.
```

Good:

```txt
You’re early.
Social Mode has started, but the room is still warming up.
Join a table or check back in a few minutes.
```

Include tonight’s icebreaker when possible.

### 13.17 AfterReportCard

Purpose:

After mode should help the venue decide to run it again.

Content:

- check-ins
- QR scans
- active guests
- pings sent
- chats created
- tables joined
- reports
- peak time
- best-performing prompt/table
- suggested next template
- `Run this again` button

Rules:

- Hide advanced analytics until after-report.
- Keep metrics useful and human.
- Do not show vanity charts before the venue has any data.

---

## 14. Screen Specifications

## 14.1 Public Event Landing `/e/[eventSlug]`

Purpose:

Guest scans QR and immediately understands the event.

State: Before live

```txt
[BARPING / SOCIAL MODE]
[Venue Name]

Social Mode starts at 7:00 PM.

No swiping. No photos. No pressure.

[Notify me / Check again] or [Join when live disabled]
```

State: Live

```txt
[BARPING / SOCIAL MODE]

Meet people already here.
No swiping. No photos. No pressure.

Live at Button Bar
7:00 PM — 10:00 PM

[Enter tonight]

18+ · Venue-only · Temporary
```

State: Closed

```txt
Social Mode has closed for tonight.
Thanks for being part of it.
```

Visual rules:

- Cinematic poster feel.
- Large serif headline.
- Venue card with status.
- Primary CTA dominates.
- Trust row visible.
- No feature overload.

## 14.2 Join / Rules Screen

Purpose:

Establish consent and safety.

Required cards:

1. Be kind
2. No pressure
3. Report anything weird

Required confirmations:

- I am 18+.
- I am physically at this venue/event.
- I agree to the community rules.

CTA:

```txt
I’m in the venue
```

Visual rules:

- Rules should feel human, not legal.
- Use `ShieldCheck` subtly.
- Do not use scary warning blocks unless user tries to bypass.

## 14.3 Guest Mode Choice

Purpose:

Keep the guest flow simple.

Three cards:

### Join a table

```txt
Pick a group topic and join the room softly.
```

### Open to pings

```txt
Let people send a mutual chat request. Your exact spot is never shown.
```

### Just browsing

```txt
See what’s happening without being pinged.
```

Rules:

- “Open to pings” replaces “Find Me” where possible.
- If `find_me_enabled` is false, hide or disable open-to-pings with clear copy.
- Browsing should not feel shameful.

## 14.4 Create Guest Signal

Purpose:

Create temporary event profile.

Sections:

1. Choose vibe
2. Choose topics
3. Optional note
4. Preview how you appear

CTA:

```txt
Enter Social Mode
```

Preview card must use `VenuePassCard`.

## 14.5 Guest Room

Purpose:

The live social surface.

Top:

```txt
Button Bar
Social Mode Live
18 people open tonight
```

Tabs:

```txt
Tables | People | Pings
```

Tables tab:

- table cards
- spotlighted table first
- prompts
- join button

People tab:

- venue pass cards
- no photos
- no exact distance

Pings tab:

- received pings
- sent pings
- accepted chats

Live announcements:

- appear as warm host notes
- not as intrusive alerts

## 14.6 Ping Received Modal

Purpose:

Make a ping feel safe and low-pressure.

Copy:

```txt
You got a ping
Quiet Tiger wants to say hi.

Shared topics: Music · Art
“Also here for the live set?”
```

Actions:

```txt
Accept
Ignore
Block
```

Rules:

- Ignore is normal and safe.
- Block is visible but not dominant.
- Do not use “Match.”

## 14.7 Temporary Chat

Purpose:

One-night event chat.

Header:

```txt
Quiet Tiger
Temporary chat · expires at 10:30 PM
```

Safety note:

```txt
Be kind. You can end or report this chat anytime.
```

Suggested opener chips:

```txt
What brought you here?
First time here?
What music are you into?
```

Rules:

- Chat should not look like a dating messenger.
- Keep it warm, minimal, and temporary.
- Show expiry clearly.

## 14.8 Venue Login `/venue/login`

Purpose:

Magic link login.

Layout:

- simple centered panel
- venue/admin language
- email input
- `Send magic link` primary CTA
- small reassurance: “For venue staff running Social Mode.”

Do not overbrand this screen.

## 14.9 Venue Dashboard `/venue/dashboard`

Purpose:

Show current/next event and one primary action.

Priority order:

1. Current/next event card
2. One primary CTA
3. Setup/live state
4. Secondary actions
5. Small recent activity

Example states:

No event:

```txt
No night scheduled.
Create a social night from a template.
[Create night]
```

Event setup:

```txt
New Faces Night is almost ready.
Next step: print the launch kit.
[Print launch kit]
```

Live:

```txt
Social Mode is live.
18 guests active · 4 pings sent
[Open Host Mode]
```

Closed:

```txt
Last night is ready to review.
[View after-report]
[Run this again]
```

Rules:

- Do not lead with analytics.
- Do not show a complex table as the first screen.
- Main actions are: Create night, Print launch kit, Start Social Mode, Send nudge, Close night, Run this again.

## 14.10 New Event Flow `/venue/events/new`

Purpose:

Template picker → review → create real event.

Step 1: Template picker

- Template cards
- short descriptions
- best for
- generated assets/tables count

Step 2: Review generated night

- event title
- social window
- vibe level
- Open to Pings toggle
- tables preview
- prompts preview
- safety copy preview

Step 3: Create night

- save event row
- save event tables
- save event assets
- save social window
- route to setup page

Visual rules:

- This should feel like choosing a recipe, not configuring software.
- Use a progress indicator with three labels: Template, Review, Create.
- Keep advanced edits hidden behind “Adjust details.”

## 14.11 Setup Page `/venue/events/[eventId]/setup`

Purpose:

Three-step operational launch path.

Steps:

1. Template
2. Assets
3. Ready to launch

Each step must have:

- status
- next action
- clear CTA

Example:

```txt
1. Template selected
New Faces Night · Balanced vibe

2. Assets ready
6 launch assets generated
[Open launch kit]

3. Ready to launch
Start when the room is ready.
[Start Social Mode]
```

Rules:

- Do not send users to old QR-only page.
- Setup page should clearly show what remains before launch.

## 14.12 Launch Kit Page `/venue/events/[eventId]/launch-kit`

Purpose:

Replace old QR-only page.

Tabs/cards:

- Table QR card
- Entrance poster
- Bar counter sign
- Instagram story
- Safety card
- Staff run sheet

Each asset card includes:

- preview
- print
- download PNG
- copy text

Rules:

- QR must be real and scannable.
- Staff run sheet has no guest QR.
- Each asset has correct aspect ratio.
- The page should feel like a print studio, not a code demo.

## 14.13 Host Mode `/venue/events/[eventId]/host`

Purpose:

Operational live controls.

Top card:

```txt
Social Mode is Live
Guests currently see: “Join a table, open to pings, or browse.”
```

Controls:

- Start/Pause/End
- Send announcement
- Spotlight table
- Final call
- Safety reports

Rules:

- Host controls must work on mobile.
- Put high-risk actions behind confirmation.
- Show immediate feedback after actions.

## 14.14 After Report `/venue/events/[eventId]/report`

Purpose:

Turn the night into a repeatable product.

Sections:

1. Summary
2. What happened
3. What worked
4. Safety
5. Suggested next night
6. Run this again

Example copy:

```txt
Social Mode ran for 2h 45m.
The Music Table was the most active.
Best prompt: “What song would instantly improve this room?”
Suggested next template: Music Table Night.
```

Rules:

- This is where metrics belong.
- Keep it owner-friendly, not data-scientist-heavy.
- End with action.

---

## 15. Launch Kit Asset Specifications

The launch kit is part of the product. If it looks cheap, venues will not print it.

### 15.1 Shared asset rules

Every guest-facing asset must include:

- event title
- venue name
- short CTA
- real QR code if relevant
- trust line
- short safety line when needed

Trust line examples:

```txt
No photos · No swiping · Temporary
18+ · Venue-only · Leave anytime
```

Do not include long paragraphs on printed assets.

### 15.2 Table QR Card

Use:

- compact vertical card
- table-friendly size
- QR dominates
- simple CTA

Suggested copy:

```txt
Social Mode is live.
Scan to join tonight.
No swiping. No photos. No pressure.
```

Aspect ratio:

```txt
4:5 or A6-style compact print
```

### 15.3 Entrance Poster

Use:

- portrait layout
- large serif headline
- strong venue/event identity
- QR below headline or lower third

Suggested copy:

```txt
Meet people already here.
Social Mode is live tonight.
Scan to join.
```

Aspect ratio:

```txt
A4 portrait / 1080x1350 preview
```

### 15.4 Bar Counter Sign

Use:

- landscape layout
- readable from short distance
- QR on right or center
- big CTA

Suggested copy:

```txt
Open to meeting people tonight?
Scan to join BarPing.
```

Aspect ratio:

```txt
landscape 16:9 / counter card
```

### 15.5 Instagram Story

Use:

- 9:16 layout
- strong atmosphere
- QR in cream card
- event time and venue

Suggested copy:

```txt
Tonight at [Venue]
Social Mode is live from 7 PM.
Scan in when you arrive.
```

Aspect ratio:

```txt
1080x1920
```

### 15.6 Safety Card

Use:

- compact print layout
- calm safety language
- no QR unless linking to rules/report flow

Suggested copy:

```txt
Respect the room.
No harassment, pressure, hate, explicit messages, or creepy behaviour.
Ignore, block, report, or speak to staff anytime.
```

Aspect ratio:

```txt
A6 / compact card
```

### 15.7 Staff Run Sheet

Internal only. No guest QR required.

Sections:

1. Before doors
2. At launch
3. During the night
4. If the room is quiet
5. If there is a report
6. Final call
7. Close night

Suggested structure:

```txt
Before doors
- Place table QR cards.
- Put counter sign near bar.
- Test QR with phone camera.

Launch
- Open Host Mode.
- Press Start Social Mode.
- Announce: “Social Mode is live tonight...”

During
- Send one nudge every 30–45 minutes.
- Spotlight one table if needed.

Safety
- Check reports immediately.
- Speak to staff/manager if a guest feels unsafe.

Close
- Send Final Call.
- End Social Mode.
- View after-report.
```

---

## 16. Template Design

Templates are the product. They create the social reason, not just the visual theme.

### 16.1 Template object should generate

Each template generates:

- event title
- short event description
- default social window
- vibe level
- Open to Pings default setting
- table list
- table prompts
- host announcements
- final call message
- table QR copy
- entrance poster copy
- bar sign copy
- Instagram story copy
- safety copy
- staff run sheet

### 16.2 Template examples

#### New Faces Night

Purpose:

Low-pressure night for people open to meeting someone new.

Tables:

- New in town
- Music and gigs
- Food spots
- Random good questions

Prompts:

- What brought you here tonight?
- What is one underrated place in Sydney?
- What song would instantly improve this room?

#### Music Table Night

Purpose:

For live music venues or music-heavy bars.

Tables:

- Live set chat
- Guitar people
- Albums and artists
- Gig recommendations

Prompts:

- What was the first album you loved?
- What song changed your taste?
- Who should play here next?

#### Creative Mixer

Purpose:

Artists, designers, founders, photographers, musicians, writers.

Tables:

- Artists
- Builders
- Freelancers
- Ideas and projects

Prompts:

- What are you making lately?
- What project are you avoiding?
- What tool changed your workflow?

#### After-Work Social

Purpose:

CBD bars and casual post-work crowds.

Tables:

- New job / new city
- Work stories
- Weekend plans
- Easy questions

Prompts:

- What is the best part of your week so far?
- What is your low-effort weekend plan?
- What is one place nearby worth trying?

#### Low-Pressure Singles

Purpose:

Singles night without dating-app energy.

Rules:

- No profile photos.
- No ratings.
- No “matches” language.
- No pressure copy.

Use terms:

```txt
Open to conversation
Say hi if mutual
Easy social night
```

Avoid terms:

```txt
Find your match
Hot singles
Flirt mode
Crush
Swipe
```

---

## 17. Safety Design

Safety must be visible, but the app should not feel unsafe by default.

### 17.1 Required guest safety controls

Every guest must be able to:

- ignore ping
- block user
- report user
- leave event
- end chat
- see chat expiry

### 17.2 Required venue safety controls

Venue admin/host must be able to:

- view reports
- ban user from event
- pause Social Mode
- close Social Mode
- see report timestamps
- see relevant reported message context

### 17.3 Safety copy style

Good:

```txt
You control your night. Ignore, block, report, or leave anytime.
```

Good:

```txt
Respect the room. No pressure, harassment, hate, or explicit messages.
```

Bad:

```txt
WARNING: dangerous users may be present.
```

Bad:

```txt
By using this app, you waive all responsibility...
```

Legal copy can exist in Terms. UI copy should be human.

### 17.4 Staff Alert

If implemented, Staff Alert is separate from Report.

Report:

- moderation record
- can be reviewed after event

Staff Alert:

- immediate venue concern
- visible in host mode
- should trigger a clear staff response flow

If Staff Alert is not fully implemented, do not fake emergency support. Use honest wording.

---

## 18. UX Copy Library

### 18.1 Landing headlines

```txt
Meet people already here.
Social Mode is live tonight.
A softer way to say hello.
Join the room without the pressure.
```

### 18.2 Subcopy

```txt
No swiping. No photos. No pressure.
Join a table, open to pings, or just browse.
Your exact spot is never shown.
Chats are temporary for tonight.
```

### 18.3 Venue admin CTAs

```txt
Create night
Review night
Open launch kit
Print launch kit
Start Social Mode
Pause Social Mode
Send nudge
Spotlight table
Final call
Close night
View after-report
Run this again
```

### 18.4 Guest CTAs

```txt
Enter tonight
I’m in the venue
Join a table
Open to pings
Just browsing
Send ping
Accept
Ignore
Block
Report
Leave Social Mode
```

### 18.5 Empty states

No venue event:

```txt
No night scheduled.
Create a social night from a template.
```

Room quiet:

```txt
You’re early.
Social Mode has started, but the room is still warming up.
```

No pings:

```txt
No pings yet.
Join a table or keep browsing.
```

No reports:

```txt
No reports so far.
Keep an eye on the room while Social Mode is live.
```

### 18.6 Error states

Do not show raw Supabase or JavaScript errors to guests.

Guest-friendly:

```txt
Something didn’t load.
Try again in a moment, or ask staff if the QR still looks right.
```

Venue-friendly:

```txt
We couldn’t save this night.
Check your connection and try again.
```

Developer detail may be logged in console, but not displayed as the main UI.

---

## 19. Implementation Rules for Codex

### 19.1 Non-negotiables

Codex must not:

- create fake QR components
- use default grey cards
- use dating app language
- add profile photos
- add GPS/map UI
- add swiping UI
- lead dashboards with analytics
- use hard white backgrounds in app UI
- use random colours outside tokens
- generate unstyled tables
- hide safety actions
- create five different button styles
- make guest screens desktop-first
- create generic SaaS layouts

### 19.2 Required file structure recommendation

```txt
/src/design/
  tokens.ts
  copy.ts
  templates.ts

/src/components/shell/
  AppShell.tsx
  VenueAdminShell.tsx

/src/components/ui/
  PrimaryButton.tsx
  SecondaryButton.tsx
  DangerButton.tsx
  StatusPill.tsx
  SurfaceCard.tsx
  SafetyNotice.tsx

/src/components/qr/
  RealQRCode.tsx

/src/components/guest/
  VenuePassCard.tsx
  VibeSelector.tsx
  TopicChips.tsx
  GuestModeChoice.tsx
  PingModal.tsx
  EmptyRoomState.tsx

/src/components/venue/
  TemplateCard.tsx
  LaunchKitAssetCard.tsx
  HostControlPanel.tsx
  AnnouncementComposer.tsx
  AfterReportCard.tsx

/src/components/assets/
  TableQrCardPreview.tsx
  EntrancePosterPreview.tsx
  BarCounterSignPreview.tsx
  InstagramStoryPreview.tsx
  SafetyCardPreview.tsx
  StaffRunSheetPreview.tsx
```

### 19.3 Tailwind token implementation

Create CSS variables in global CSS:

```css
:root {
  --bp-canvas: #080807;
  --bp-canvas-warm: #0D0B08;
  --bp-surface-1: #11100D;
  --bp-surface-2: #171510;
  --bp-surface-3: #1F1C15;
  --bp-surface-4: #282318;
  --bp-hairline: rgba(255,244,220,0.08);
  --bp-hairline-strong: rgba(255,244,220,0.16);
  --bp-ink: #F7F0E3;
  --bp-ink-muted: #B8AA92;
  --bp-ink-subtle: #8E806C;
  --bp-accent: #D98F45;
  --bp-accent-soft: #F0B46A;
  --bp-olive: #7C8061;
  --bp-cobalt: #4D6AAA;
  --bp-danger: #D96B5F;
}
```

Do not scatter hex values across components. Use tokens.

### 19.4 Responsive implementation

Guest screens:

```tsx
<div className="min-h-dvh bg-[var(--bp-canvas)] text-[var(--bp-ink)]">
  <main className="mx-auto min-h-dvh w-full max-w-[430px] px-5 py-6">
    ...
  </main>
</div>
```

Admin screens:

```tsx
<div className="min-h-dvh bg-[var(--bp-canvas)] text-[var(--bp-ink)]">
  <main className="mx-auto w-full max-w-[1180px] px-5 py-6 md:px-8 md:py-8">
    ...
  </main>
</div>
```

---

## 20. Accessibility

### 20.1 Minimum requirements

- Touch targets minimum 44px.
- Use semantic buttons, not clickable divs.
- Inputs require labels.
- Modals trap focus.
- Escape closes modals where appropriate.
- Colour cannot be the only status indicator.
- QR actions require text labels.
- Focus rings must be visible.
- Text contrast must be readable on dark surfaces.

### 20.2 Focus style

Use:

```css
outline: 2px solid rgba(240,180,106,0.72);
outline-offset: 2px;
```

Do not remove focus rings.

---

## 21. Quality Audit Checklist

Before accepting any UI change, check every screen against this list.

### 21.1 Product fit

- Does this screen support “Run a social night in 5 minutes”?
- Is the next action obvious?
- Is this venue-first, not social-app-first?
- Does it avoid dating app cues?
- Does it avoid generic SaaS clutter?

### 21.2 Visual quality

- Are colours from tokens only?
- Is spacing consistent?
- Are cards using the right radius?
- Are buttons visually consistent?
- Are typography roles correct?
- Are status states clear?
- Does it look good on 390px mobile?
- Would a venue owner screenshot this and take it seriously?

### 21.3 QR quality

- Is every QR real?
- Does the QR encode the correct URL?
- Is contrast high enough?
- Is the quiet zone preserved?
- Can it scan from a phone?
- Does every QR have CTA/context?

### 21.4 Safety quality

- Can guest ignore/block/report?
- Can host see reports?
- Is dangerous copy avoided?
- Does “Open to Pings” avoid implying physical tracking?
- Are exact locations hidden?
- Are photos absent?

### 21.5 Operational quality

- Can venue create a night from template?
- Can venue print/share assets?
- Can venue start/pause/end Social Mode?
- Can venue send announcement?
- Can venue spotlight table?
- Can venue view after-report?
- Are advanced analytics hidden until after mode?

---

## 22. Codex Instruction Block

Use this exact instruction when asking Codex to improve BarPing UI:

```txt
Before making UI changes, read DESIGN.md fully and treat it as the source of truth.

Your job is not to invent a new visual style. Your job is to implement the BarPing V4 design system exactly.

The product must feel like a premium digital venue pass and operational host console, not a generic SaaS dashboard and not a dating app.

Non-negotiables:
- Every QR must be real and scannable using the shared QR component.
- Use only the DESIGN.md colour tokens.
- Guest screens are mobile-first and max-width 430px.
- Venue admin screens are operational and action-first.
- Do not add swiping, photos, GPS, map UI, matches, hearts, flames, or dating-app copy.
- Do not lead the dashboard with analytics.
- Launch Kit assets must preview in distinct correct aspect ratios.
- Staff run sheet must not show a guest QR.
- Use warm, calm, short copy.
- Keep safety visible but not frightening.

After changes, audit the implementation against the DESIGN.md Quality Audit Checklist and fix any violations before finishing.
```

---

## 23. UI Repair Prompts

Use these when Codex produces ugly UI.

### 23.1 Generic SaaS cleanup

```txt
The UI currently looks like a generic SaaS dashboard. Redesign it according to DESIGN.md.

Remove generic grey cards, default tables, random icons, and analytics-first layout.
Make the screen action-first for venue staff. The next action must be visually obvious.
Use BarPing tokens, warm dark surfaces, premium spacing, and operational copy.
Do not add new colours or new component styles.
```

### 23.2 Dating app cleanup

```txt
The UI is drifting toward dating-app language and visuals. Fix it using DESIGN.md.

Remove any references to matches, swiping, hot, crush, flirting, hearts, flames, profile photos, attractiveness, or dating-card stacks.
Use low-pressure venue language: open to pings, join a table, just browsing, temporary chat.
Make the guest cards feel like digital venue passes, not dating profiles.
```

### 23.3 QR cleanup

```txt
The QR visuals are not acceptable. Replace all decorative/fake QR visuals with the shared RealQRCode component using the qrcode package.
Every QR must encode the actual event URL and be scannable.
Preserve quiet zone, high contrast, and clear CTA text.
Update the launch kit, dashboard, asset previews, print/download flows, and event page anywhere QR appears.
```

### 23.4 Launch kit cleanup

```txt
The launch kit assets look too similar or too generic. Redesign them according to DESIGN.md.
Each asset must have a distinct layout and correct aspect ratio:
- Table QR card: compact print card
- Entrance poster: portrait poster
- Bar counter sign: landscape counter sign
- Instagram story: 9:16 story
- Safety card: compact rules card
- Staff run sheet: internal checklist with no guest QR
Use real QR codes where relevant and make the assets look good enough for a real bar to print.
```

### 23.5 Mobile polish cleanup

```txt
The mobile UI feels cramped or inconsistent. Polish it according to DESIGN.md.
Use max-width 430px, 20px page padding, 20–24px card padding, large touch targets, consistent rounded corners, and clear vertical rhythm.
Make the primary action obvious without overcrowding the screen.
```

---

## 24. Final Design Standard

BarPing V4 is acceptable only if it passes this standard:

> A real venue owner could open the dashboard, understand the next action in five seconds, print the launch kit without embarrassment, start Social Mode confidently, and see guests understand the QR landing page without explanation.

If the UI does not meet that standard, it is not done.

