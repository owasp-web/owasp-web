-- Finance documents table and RLS

-- Create table
create table if not exists public.finance_documents (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  category text not null check (category in (
    'Annual Budget',
    'Tax Return',
    'Audited Financial Statement',
    'Other'
  )),
  year int,
  file_url text not null,
  storage_path text,
  display_order int default 0
);

-- Updated at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_finance_documents_updated_at on public.finance_documents;
create trigger trg_finance_documents_updated_at
before update on public.finance_documents
for each row execute function public.set_updated_at();

-- Enable RLS
alter table public.finance_documents enable row level security;

-- Policies:
-- 1) Public read access
drop policy if exists finance_docs_public_read on public.finance_documents;
create policy finance_docs_public_read on public.finance_documents
for select using (true);

-- 2) Only super admins can insert/update/delete
-- Super admins defined in table public.global_admins with columns (id, user_id, email,...)

drop policy if exists finance_docs_admin_write on public.finance_documents;
create policy finance_docs_admin_write on public.finance_documents
for all
to authenticated
using (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
)
with check (
  exists (
    select 1 from public.global_admins ga
    where (ga.user_id = auth.uid())
       or (ga.email = auth.jwt() ->> 'email')
  )
);

comment on table public.finance_documents is 'Finance page downloadable documents (budgets, 990 tax returns, audits).';
comment on column public.finance_documents.category is 'Annual Budget | Tax Return | Audited Financial Statement | Other';


