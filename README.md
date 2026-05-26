# BarPing

BarPing is a QR-based Social Mode for Venues MVP. It is built as a mobile-first Next.js app with demo mode, venue admin screens, platform admin screens, and a Supabase schema foundation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

If `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing, the app runs in local demo mode with Demo Bar, Thursday Social Mode, demo guests, pings, chats, tables, reports, and venue dashboard data.

## Key routes

- `/` demo entry
- `/e/thursday-social-mode` QR landing page
- `/e/thursday-social-mode/join` rules and profile creation
- `/e/thursday-social-mode/room` live room
- `/e/thursday-social-mode/chat/demo-chat` temporary chat
- `/venue/dashboard` venue dashboard and launch kit
- `/admin` platform admin

## Supabase

The first migration lives at `supabase/migrations/202605260001_barping_mvp.sql` and includes:

- MVP tables
- RLS enabled on every table
- venue/platform admin helpers
- event participant and chat membership checks
- pending ping duplication prevention
- ping rate-limit helper
- report, ban, announcement, and feedback foundations

`supabase/seed.sql` adds a demo venue, event, and group tables.
