-- Claude Code Academy — database schema
-- Run this once in the Supabase SQL editor for your project.

-- 1. Profiles -----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Profiles are insertable by owner"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    new.email
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Module progress ------------------------------------------------------
create table if not exists public.module_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  module_slug text not null,
  quiz_score numeric,
  quiz_passed boolean not null default false,
  quiz_attempts integer not null default 0,
  practicum_submission text,
  practicum_verified boolean not null default false,
  practicum_checks jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, module_slug)
);

alter table public.module_progress enable row level security;

create policy "Progress is viewable by owner"
  on public.module_progress for select
  using (auth.uid() = user_id);

create policy "Progress is insertable by owner"
  on public.module_progress for insert
  with check (auth.uid() = user_id);

create policy "Progress is updatable by owner"
  on public.module_progress for update
  using (auth.uid() = user_id);

-- 3. Certificates ---------------------------------------------------------
-- Stores the stable record (number, name, issue date) for a completed
-- course. The PDF itself is rendered on demand from this record by
-- /api/certificate, so no binary storage bucket is needed.
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  full_name text not null,
  certificate_number text not null unique,
  issued_at timestamptz not null default now()
);

alter table public.certificates enable row level security;

create policy "Certificates are viewable by owner"
  on public.certificates for select
  using (auth.uid() = user_id);

create policy "Certificates are insertable by owner"
  on public.certificates for insert
  with check (auth.uid() = user_id);
