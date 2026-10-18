-- Run this once in Supabase: SQL Editor > New query > paste > Run

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null default auth.uid(),
  company text not null,
  role text not null,
  status text not null default 'applied'
    check (status in ('applied', 'interview', 'offer', 'rejected')),
  job_url text,
  location text,
  salary text,
  notes text,
  applied_date date not null default current_date,
  created_at timestamptz not null default now()
);

-- Row Level Security: each user can only touch their own rows
alter table applications enable row level security;

create policy "Users manage own applications"
on applications for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
