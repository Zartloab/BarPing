create table if not exists public.event_templates (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  venue_id uuid references public.venues(id) on delete cascade,
  name text not null,
  event_title text not null,
  event_type text not null,
  description text,
  recommended_duration_minutes int not null default 120,
  social_window_offset_minutes int not null default 20,
  social_window_duration_minutes int not null default 100,
  default_vibe_level text not null default 'Social' check (default_vibe_level in ('Calm', 'Social', 'Mixer')),
  find_me_default boolean default true,
  is_platform_template boolean default false,
  staff_script text,
  table_qr_copy text,
  entrance_poster_copy text,
  bar_counter_copy text,
  instagram_story_copy text,
  safety_card_copy text,
  run_of_show text
);

create table if not exists public.event_template_tables (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  template_id uuid references public.event_templates(id) on delete cascade,
  name text not null,
  description text,
  prompt text,
  suggested_topics text[] default '{}',
  max_members int default 12,
  energy_level text not null default 'Warming up' check (energy_level in ('Quiet', 'Warming up', 'Active')),
  sort_order int default 0
);

create table if not exists public.event_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  kind text not null check (kind in ('table_qr', 'entrance_poster', 'bar_counter', 'instagram_story', 'safety_card', 'run_sheet')),
  title text not null,
  copy text not null
);

create table if not exists public.event_recommendations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  event_id uuid references public.events(id) on delete cascade,
  venue_id uuid references public.venues(id) on delete cascade,
  recommendation text not null check (recommendation in (
    'Good pilot signal',
    'Run again with stronger signage',
    'Try table-first format',
    'Needs host announcement',
    'Safety review needed'
  )),
  rationale text
);

alter table public.events
  add column if not exists template_id uuid references public.event_templates(id),
  add column if not exists vibe_level text default 'Social' check (vibe_level in ('Calm', 'Social', 'Mixer')),
  add column if not exists find_me_enabled boolean default true;

alter table public.event_tables
  add column if not exists energy_level text default 'Warming up' check (energy_level in ('Quiet', 'Warming up', 'Active')),
  add column if not exists host_prompt text,
  add column if not exists is_template_generated boolean default false;

alter table public.event_templates enable row level security;
alter table public.event_template_tables enable row level security;
alter table public.event_assets enable row level security;
alter table public.event_recommendations enable row level security;

create policy "public can read platform templates" on public.event_templates
  for select using (is_platform_template is true or public.is_venue_admin(venue_id));

create policy "venue admins manage venue templates" on public.event_templates
  for all using (public.is_venue_admin(venue_id) or public.is_platform_admin())
  with check (public.is_venue_admin(venue_id) or public.is_platform_admin());

create policy "public can read platform template tables" on public.event_template_tables
  for select using (
    exists (
      select 1 from public.event_templates
      where id = template_id and (is_platform_template is true or public.is_venue_admin(venue_id))
    )
  );

create policy "venue admins manage template tables" on public.event_template_tables
  for all using (
    exists (
      select 1 from public.event_templates
      where id = template_id and (public.is_venue_admin(venue_id) or public.is_platform_admin())
    )
  )
  with check (
    exists (
      select 1 from public.event_templates
      where id = template_id and (public.is_venue_admin(venue_id) or public.is_platform_admin())
    )
  );

create policy "venue admins manage event assets" on public.event_assets
  for all using (public.is_venue_admin(venue_id)) with check (public.is_venue_admin(venue_id));

create policy "live event assets are readable" on public.event_assets
  for select using (
    public.is_venue_admin(venue_id)
    or exists (
      select 1 from public.events
      where id = event_id and is_live is true and is_closed is false
    )
  );

create policy "venue admins read recommendations" on public.event_recommendations
  for select using (public.is_venue_admin(venue_id) or public.is_platform_admin());

create policy "venue admins manage recommendations" on public.event_recommendations
  for all using (public.is_venue_admin(venue_id) or public.is_platform_admin())
  with check (public.is_venue_admin(venue_id) or public.is_platform_admin());
