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

insert into public.event_templates (
  id,
  name,
  event_title,
  event_type,
  description,
  recommended_duration_minutes,
  social_window_offset_minutes,
  social_window_duration_minutes,
  default_vibe_level,
  find_me_default,
  is_platform_template,
  staff_script,
  table_qr_copy,
  entrance_poster_copy,
  bar_counter_copy,
  instagram_story_copy,
  safety_card_copy,
  run_of_show
)
values (
  '00000000-0000-0000-0000-000000000301',
  'Live Music Social',
  'Thursday Social Mode',
  'Live Music',
  'Turns a live set into a low-pressure shared conversation.',
  150,
  30,
  120,
  'Social',
  true,
  true,
  'Social Mode is live now. Scan the QR, choose a vibe, and join a table or send a low-pressure ping. No photos, no real names.',
  'Open to meeting people tonight?\n\nScan to join BarPing.\nNo names. No photos. No pressure.',
  'Social Mode is live tonight.\n\nMeet people already here.\nScan the QR at the bar.',
  'Ask the bar about Social Mode.\nScan in, choose a vibe, join a table.',
  'Tonight: Social Mode is live.\n\nScan in at the bar from 7 PM.\nNo swiping. No photos. No pressure.',
  'Respect the room.\nNo pressure, harassment, hate, or creepy behaviour.\nYou can ignore, block, or report anytime.',
  '7:00 PM: QR signs visible, staff briefed.\n7:30 PM: Social Mode starts.\n7:45 PM: First table prompt.\n8:15 PM: Host nudge.\n8:45 PM: Accepted chats may use Find Me if both agree.\n9:15 PM: Final prompt.\n9:30 PM: Feedback opens.'
)
on conflict (id) do nothing;

insert into public.event_template_tables (template_id, name, description, prompt, suggested_topics, max_members, energy_level, sort_order)
values
  ('00000000-0000-0000-0000-000000000301', 'Music Table', 'Live set reactions and recommendations.', 'What track should the room hear next?', '{Music,Film}', 10, 'Active', 1),
  ('00000000-0000-0000-0000-000000000301', 'First Time Here', 'For anyone new to the venue or band.', 'What made you come out tonight?', '{Music,Life,Random}', 8, 'Warming up', 2),
  ('00000000-0000-0000-0000-000000000301', 'After The Set', 'Keep the chat going after the last song.', 'What was the best moment of the set?', '{Music,Travel}', 12, 'Quiet', 3);
