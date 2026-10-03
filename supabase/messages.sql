-- Run this file in Supabase Dashboard > SQL Editor after creating the project.
-- The administrator account must use ilontemgoua@gmail.com.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('question', 'partnership')),
  name text not null check (char_length(name) between 1 and 160),
  email text not null check (char_length(email) between 3 and 254),
  subject text check (subject is null or char_length(subject) <= 160),
  phone text check (phone is null or char_length(phone) <= 40),
  company text check (company is null or char_length(company) <= 160),
  sector text check (sector is null or char_length(sector) <= 120),
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'archived')),
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

alter table public.messages enable row level security;

revoke all on table public.messages from anon, authenticated;
grant insert (kind, name, email, subject, phone, company, sector, message)
  on table public.messages to anon, authenticated;
grant select on table public.messages to authenticated;
grant update (status, archived_at) on table public.messages to authenticated;

-- Public visitors can only submit new messages. They cannot read or modify records.
drop policy if exists "Anyone can submit a message" on public.messages;
create policy "Anyone can submit a message"
  on public.messages for insert
  to anon, authenticated
  with check (status = 'new' and archived_at is null);

-- Only the configured administrator can read or archive messages.
drop policy if exists "Admin can view messages" on public.messages;
create policy "Admin can view messages"
  on public.messages for select
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'ilontemgoua@gmail.com');

drop policy if exists "Admin can archive messages" on public.messages;
create policy "Admin can archive messages"
  on public.messages for update
  to authenticated
  using ((select auth.jwt() ->> 'email') = 'ilontemgoua@gmail.com')
  with check (
    (select auth.jwt() ->> 'email') = 'ilontemgoua@gmail.com'
    and status in ('new', 'archived')
  );

drop policy if exists "Admin cannot delete messages" on public.messages;
create policy "Admin cannot delete messages"
  on public.messages for delete
  to authenticated
  using (false);

create index if not exists messages_status_created_at_idx
  on public.messages (status, created_at desc);