create table if not exists public.social_windows (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'active', 'ended')),
  check (ends_at > starts_at)
);

create table if not exists public.find_me_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  chat_id uuid references public.chats(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  requested_by uuid references auth.users(id) on delete cascade,
  accepted_by uuid references auth.users(id) on delete set null,
  status text not null default 'requested' check (status in ('requested', 'active', 'ended', 'expired', 'reported')),
  color_token text not null,
  expires_at timestamptz not null,
  ended_at timestamptz,
  check (requested_by <> accepted_by)
);

create table if not exists public.contact_exchanges (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  chat_id uuid references public.chats(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  user_a_id uuid references auth.users(id) on delete cascade,
  user_b_id uuid references auth.users(id) on delete cascade,
  user_a_consented boolean default false,
  user_b_consented boolean default false,
  user_a_contact text,
  user_b_contact text,
  check (user_a_id <> user_b_id)
);

create table if not exists public.host_announcements (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  created_by uuid references auth.users(id) on delete set null,
  kind text not null default 'announcement' check (kind in ('announcement', 'table_prompt', 'last_call', 'safety')),
  body text not null,
  expires_at timestamptz
);

alter table public.event_tables
  add column if not exists prompt text,
  add column if not exists suggested_topics text[] default '{}',
  add column if not exists is_spotlighted boolean default false;

alter table public.feedback_responses
  add column if not exists met_someone boolean,
  add column if not exists table_felt_easier boolean,
  add column if not exists rating int check (rating between 1 and 5);

alter table public.social_windows enable row level security;
alter table public.find_me_sessions enable row level security;
alter table public.contact_exchanges enable row level security;
alter table public.host_announcements enable row level security;

create or replace function public.has_active_social_window(target_event_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.social_windows
    where event_id = target_event_id
      and status = 'active'
      and starts_at <= now()
      and ends_at >= now()
  );
$$;

create or replace function public.is_direct_chat_member(target_chat_id uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.chats
    where id = target_chat_id
      and chat_type = 'direct'
      and ended_at is null
      and expires_at > now()
      and public.is_chat_member(id)
  );
$$;

drop policy if exists "users create own checkin" on public.event_checkins;
create policy "users create own checkin during social window" on public.event_checkins
  for insert with check (
    user_id = auth.uid()
    and expires_at > now()
    and public.has_active_social_window(event_id)
    and not exists (
      select 1 from public.bans
      where user_id = auth.uid()
        and removed_at is null
        and (event_id = event_checkins.event_id or venue_id = event_checkins.venue_id or scope = 'global')
    )
  );

create policy "participants read social windows" on public.social_windows
  for select using (public.is_event_participant(event_id) or public.is_venue_admin(venue_id));
create policy "venue admins manage social windows" on public.social_windows
  for all using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));

create policy "chat members see find me sessions" on public.find_me_sessions
  for select using (public.is_chat_member(chat_id) or public.is_venue_admin(venue_id));
create policy "members request find me" on public.find_me_sessions
  for insert with check (
    requested_by = auth.uid()
    and public.is_direct_chat_member(chat_id)
    and public.is_event_participant(event_id)
  );
create policy "other member accepts or ends find me" on public.find_me_sessions
  for update using (public.is_chat_member(chat_id))
  with check (public.is_chat_member(chat_id));

create policy "mutual members read contact exchange" on public.contact_exchanges
  for select using (
    public.is_chat_member(chat_id)
    and (
      user_a_id = auth.uid()
      or user_b_id = auth.uid()
      or (user_a_consented is true and user_b_consented is true)
    )
  );
create policy "chat members create contact exchange" on public.contact_exchanges
  for insert with check (
    (user_a_id = auth.uid() or user_b_id = auth.uid())
    and public.is_direct_chat_member(chat_id)
  );
create policy "chat members update own contact consent" on public.contact_exchanges
  for update using (user_a_id = auth.uid() or user_b_id = auth.uid())
  with check (user_a_id = auth.uid() or user_b_id = auth.uid());

create policy "participants read host announcements" on public.host_announcements
  for select using (public.is_event_participant(event_id) or public.is_venue_admin(venue_id));
create policy "venue admins manage host announcements" on public.host_announcements
  for all using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));
