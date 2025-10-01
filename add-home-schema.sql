-- Home page editable content
create table if not exists home_settings (
  id text primary key default 'global',
  updated_at timestamp with time zone default now(),
  hero_image text,
  hero_title text,
  hero_subtitle text,
  hero_buttons jsonb default '[]'::jsonb -- [{label, url, variant}]
);

create or replace function update_home_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'update_home_settings_updated_at_trg') then
    create trigger update_home_settings_updated_at_trg
    before update on home_settings for each row execute procedure update_home_updated_at();
  end if;
end $$;

create table if not exists home_slides (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  order_num integer default 0,
  layout_type text not null check (layout_type in ('one','two','three','four')),
  items jsonb default '[]'::jsonb, -- array of {image, title, excerpt, url}
  status text default 'active' check (status in ('active','inactive'))
);

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'update_home_slides_updated_at_trg') then
    create trigger update_home_slides_updated_at_trg
    before update on home_slides for each row execute procedure update_home_updated_at();
  end if;
end $$;

alter table home_settings enable row level security;
alter table home_slides enable row level security;
create policy if not exists "Public can view home" on home_settings for select using (true);
create policy if not exists "Public can view slides" on home_slides for select using (status = 'active');

