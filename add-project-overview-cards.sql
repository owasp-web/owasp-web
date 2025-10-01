-- Add overview cards row for projects to show configurable boxes in overview
alter table projects
  add column if not exists overview_cards jsonb default '[]'::jsonb;

comment on column projects.overview_cards is 'Array of boxes shown in overview: [{id,title,type,items}] where type in (links, bullets, text, title_subtitle)';

