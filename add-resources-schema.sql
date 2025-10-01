-- Resources catalog for the Resources page
create table if not exists resources (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  title text not null,
  description text,
  category text, -- e.g., Security Tools, Documentation, Training Materials, Guidelines, Code Libraries
  type text,     -- e.g., Tool, Guide, Platform, Standard, Reference
  image text,
  downloads text,
  url text,
  download_url text,
  is_featured boolean default false,
  order_num integer default 0,
  status text default 'active' check (status in ('active','inactive'))
);

-- Trigger to keep updated_at fresh
create or replace function update_resources_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'update_resources_updated_at_trg'
  ) then
    create trigger update_resources_updated_at_trg
    before update on resources
    for each row execute procedure update_resources_updated_at();
  end if;
end $$;

-- Optional RLS policy similar to projects/events if you use RLS
alter table resources enable row level security;
create policy if not exists "Public can view active resources" on resources
  for select using (status = 'active');

