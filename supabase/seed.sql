insert into public.venues (id, name, slug, suburb, city, country, brand_color, contact_email)
values ('00000000-0000-0000-0000-000000000101', 'Demo Bar', 'demo-bar', 'Surry Hills', 'Sydney', 'Australia', '#D98F45', 'support@barping.local')
on conflict (slug) do nothing;

insert into public.events (id, venue_id, title, slug, event_type, starts_at, ends_at, house_rules, is_live)
values (
  '00000000-0000-0000-0000-000000000201',
  '00000000-0000-0000-0000-000000000101',
  'Thursday Social Mode',
  'thursday-social-mode',
  'Social Night',
  now() - interval '30 minutes',
  now() + interval '4 hours',
  'Be normal. Be kind. No harassment, pressure, hate, explicit messages, or creepy behaviour. Staff and moderators can remove anyone.',
  true
)
on conflict (slug) do nothing;

insert into public.event_tables (event_id, venue_id, name, description, max_members)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'Music Table', 'Live set reactions and new recommendations.', 10),
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'New to Sydney', 'Fresh faces, local tips, easy hellos.', 8),
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'Artists & Makers', 'Art, projects, design, things in progress.', 12);

insert into public.social_windows (event_id, venue_id, starts_at, ends_at, status)
values (
  '00000000-0000-0000-0000-000000000201',
  '00000000-0000-0000-0000-000000000101',
  now() - interval '15 minutes',
  now() + interval '2 hours',
  'active'
);

insert into public.host_announcements (event_id, venue_id, kind, body, expires_at)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'announcement', 'Social Mode is live. Music Table and New to Sydney both have open seats.', now() + interval '2 hours'),
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'safety', 'Accepted chats can use Find Me only if both people agree.', now() + interval '2 hours');
