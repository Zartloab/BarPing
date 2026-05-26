create extension if not exists pgcrypto;

create table if not exists public.users_profile (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  display_name text,
  is_platform_admin boolean default false,
  is_banned boolean default false,
  global_ban_reason text,
  global_banned_at timestamptz
);

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  slug text unique not null,
  address text,
  suburb text,
  city text,
  country text default 'Australia',
  logo_url text,
  brand_color text,
  contact_email text,
  is_active boolean default true
);

create table if not exists public.venue_admins (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('owner', 'admin', 'staff')),
  unique (venue_id, user_id)
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  title text not null,
  slug text unique not null,
  event_type text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  house_rules text,
  max_guests int,
  is_live boolean default false,
  is_closed boolean default false,
  qr_code_url text,
  check (ends_at > starts_at)
);

create table if not exists public.qr_scan_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  user_agent text,
  ip_hash text,
  referrer text
);

create table if not exists public.event_checkins (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  user_id uuid references auth.users(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  alias text not null,
  vibe text not null check (vibe in ('Chill', 'Social', 'Music', 'Deep Chat', 'New Here', 'Creative', 'Just Curious')),
  topics text[] default '{}',
  mode text not null check (mode in ('Open to 1:1 chat', 'Join a table', 'With a friend')),
  note text,
  is_active boolean default true,
  expires_at timestamptz not null,
  left_at timestamptz
);

create unique index if not exists event_checkins_one_active_user_per_event
  on public.event_checkins (event_id, user_id)
  where left_at is null and is_active is true;

create table if not exists public.event_tables (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  name text not null,
  description text,
  max_members int default 12,
  is_active boolean default true
);

create table if not exists public.table_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  table_id uuid references public.event_tables(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  checkin_id uuid references public.event_checkins(id) on delete cascade,
  left_at timestamptz
);

create unique index if not exists table_members_one_active_membership
  on public.table_members (table_id, user_id)
  where left_at is null;

create table if not exists public.pings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  from_user_id uuid references auth.users(id) on delete cascade,
  to_user_id uuid references auth.users(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  message text,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'ignored', 'expired', 'blocked')),
  expires_at timestamptz not null,
  responded_at timestamptz,
  check (from_user_id <> to_user_id)
);

create unique index if not exists pings_no_duplicate_pending
  on public.pings (event_id, from_user_id, to_user_id)
  where status = 'pending';

create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  ping_id uuid references public.pings(id),
  table_id uuid references public.event_tables(id),
  chat_type text not null check (chat_type in ('direct', 'table')),
  expires_at timestamptz not null,
  ended_at timestamptz
);

create table if not exists public.chat_members (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  chat_id uuid references public.chats(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  left_at timestamptz
);

create unique index if not exists chat_members_one_active_membership
  on public.chat_members (chat_id, user_id)
  where left_at is null;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  chat_id uuid references public.chats(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete cascade,
  body text not null,
  is_flagged boolean default false,
  deleted_by_admin boolean default false
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  reporter_user_id uuid references auth.users(id) on delete cascade,
  reported_user_id uuid references auth.users(id) on delete cascade,
  chat_id uuid references public.chats(id),
  message_id uuid references public.messages(id),
  reason text not null check (reason in ('Harassment', 'Hate or abuse', 'Sexual or explicit message', 'Spam', 'Impersonation', 'Felt unsafe', 'Other')),
  details text,
  status text not null default 'New' check (status in ('New', 'Reviewing', 'Actioned', 'Dismissed')),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

create table if not exists public.bans (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  banned_by uuid references auth.users(id),
  reason text,
  scope text not null check (scope in ('event', 'venue', 'global')),
  expires_at timestamptz,
  removed_at timestamptz
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  created_by uuid references auth.users(id),
  body text not null
);

create table if not exists public.feedback_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  would_use_again boolean,
  felt_safe boolean,
  comment text
);

create or replace function public.is_platform_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.users_profile
    where id = auth.uid() and is_platform_admin is true and is_banned is false
  );
$$;

create or replace function public.is_venue_admin(target_venue_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.venue_admins
    where venue_id = target_venue_id and user_id = auth.uid()
  ) or public.is_platform_admin();
$$;

create or replace function public.is_event_participant(target_event_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.event_checkins
    where event_id = target_event_id
      and user_id = auth.uid()
      and is_active is true
      and left_at is null
      and expires_at > now()
  );
$$;

create or replace function public.is_chat_member(target_chat_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.chat_members
    where chat_id = target_chat_id and user_id = auth.uid() and left_at is null
  );
$$;

create or replace function public.can_send_ping(target_event_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select count(*) < 5
  from public.pings
  where from_user_id = auth.uid()
    and event_id = target_event_id
    and created_at > now() - interval '10 minutes';
$$;

alter table public.users_profile enable row level security;
alter table public.venues enable row level security;
alter table public.venue_admins enable row level security;
alter table public.events enable row level security;
alter table public.qr_scan_events enable row level security;
alter table public.event_checkins enable row level security;
alter table public.event_tables enable row level security;
alter table public.table_members enable row level security;
alter table public.pings enable row level security;
alter table public.chats enable row level security;
alter table public.chat_members enable row level security;
alter table public.messages enable row level security;
alter table public.reports enable row level security;
alter table public.bans enable row level security;
alter table public.announcements enable row level security;
alter table public.feedback_responses enable row level security;

create policy "users see own profile" on public.users_profile for select using (id = auth.uid() or public.is_platform_admin());
create policy "users update own profile" on public.users_profile for update using (id = auth.uid()) with check (id = auth.uid());

create policy "active venues are public" on public.venues for select using (is_active is true or public.is_venue_admin(id));
create policy "venue admins manage venues" on public.venues for all using (public.is_venue_admin(id)) with check (public.is_venue_admin(id));

create policy "venue admins visible to same venue" on public.venue_admins for select using (public.is_venue_admin(venue_id));
create policy "platform admins manage venue admins" on public.venue_admins for all using (public.is_platform_admin()) with check (public.is_platform_admin());

create policy "live events are readable" on public.events for select using (is_live is true or public.is_venue_admin(venue_id));
create policy "venue admins manage events" on public.events for all using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));

create policy "scan events insertable" on public.qr_scan_events for insert with check (true);
create policy "venue admins read scans" on public.qr_scan_events for select using (public.is_venue_admin(venue_id));

create policy "participants see same event checkins" on public.event_checkins
  for select using (public.is_event_participant(event_id) or public.is_venue_admin(venue_id));
create policy "users create own checkin" on public.event_checkins
  for insert with check (user_id = auth.uid() and expires_at > now());
create policy "users update own checkin" on public.event_checkins
  for update using (user_id = auth.uid() or public.is_venue_admin(venue_id))
  with check (user_id = auth.uid() or public.is_venue_admin(venue_id));

create policy "participants see tables" on public.event_tables
  for select using (public.is_event_participant(event_id) or public.is_venue_admin(venue_id));
create policy "venue admins manage tables" on public.event_tables
  for all using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));

create policy "participants manage own table membership" on public.table_members
  for all using (user_id = auth.uid() or public.is_venue_admin((select venue_id from public.event_tables where id = table_id)))
  with check (user_id = auth.uid());

create policy "users see own pings" on public.pings
  for select using (from_user_id = auth.uid() or to_user_id = auth.uid() or public.is_venue_admin(venue_id));
create policy "participants insert pings" on public.pings
  for insert with check (
    from_user_id = auth.uid()
    and public.is_event_participant(event_id)
    and public.can_send_ping(event_id)
  );
create policy "users respond to own pings" on public.pings
  for update using (to_user_id = auth.uid() or public.is_venue_admin(venue_id))
  with check (to_user_id = auth.uid() or public.is_venue_admin(venue_id));

create policy "members see chats" on public.chats
  for select using (public.is_chat_member(id) or public.is_venue_admin(venue_id));
create policy "venue admins manage chats" on public.chats
  for all using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));

create policy "members see memberships" on public.chat_members
  for select using (user_id = auth.uid() or public.is_chat_member(chat_id));
create policy "members update own membership" on public.chat_members
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "members see messages" on public.messages
  for select using (public.is_chat_member(chat_id) or public.is_venue_admin((select venue_id from public.chats where id = chat_id)));
create policy "members send messages" on public.messages
  for insert with check (sender_id = auth.uid() and public.is_chat_member(chat_id));

create policy "users create reports" on public.reports
  for insert with check (reporter_user_id = auth.uid() and public.is_event_participant(event_id));
create policy "admins read reports" on public.reports
  for select using (reporter_user_id = auth.uid() or public.is_venue_admin(venue_id));
create policy "admins update reports" on public.reports
  for update using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));

create policy "admins read bans" on public.bans for select using (user_id = auth.uid() or public.is_venue_admin(venue_id) or public.is_platform_admin());
create policy "admins manage bans" on public.bans for all using (public.is_venue_admin(venue_id) or public.is_platform_admin()) with check (public.is_venue_admin(venue_id) or public.is_platform_admin());

create policy "participants read announcements" on public.announcements
  for select using (public.is_event_participant(event_id) or public.is_venue_admin(venue_id));
create policy "venue admins create announcements" on public.announcements
  for insert with check (public.is_venue_admin(venue_id));

create policy "users create feedback" on public.feedback_responses
  for insert with check (user_id = auth.uid());
create policy "venue admins read feedback" on public.feedback_responses
  for select using (public.is_venue_admin(venue_id) or public.is_platform_admin());
