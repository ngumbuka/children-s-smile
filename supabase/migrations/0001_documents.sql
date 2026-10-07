-- Children's Smile — production store for the mock database.
--
-- The client treats one table as the whole data set: a row per document,
-- keyed by collection + id, payload in JSONB. This mirrors the in-memory
-- store of `src/lib/db.ts` (Map<collectionName, Map<id, Doc>>) exactly, so
-- the adapter is a straight read/upsert/delete.
--
-- RLS posture: the public site reads as `anon`, backoffice writes go through
-- the authenticated role once Supabase Auth is wired. Until that migration
-- lands the app keeps working against the bootstrap flag below: anonymous
-- writes are allowed while `allow_public_writes` is `true` in _app_settings,
-- and the flag can be flipped off (or the policies dropped) the moment real
-- authentication guards the write path.

create table if not exists public.documents (
  collection text not null,
  id         text not null,
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (collection, id)
);

create index if not exists documents_collection_idx
  on public.documents (collection, updated_at desc);

create table if not exists public._app_settings (
  name  text primary key,
  value jsonb not null
);

insert into public._app_settings (name, value)
values ('allow_public_writes', 'true'::jsonb)
on conflict (name) do nothing;

create or replace function public.app_setting(key text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select value from public._app_settings where name = key
$$;

alter table public.documents enable row level security;
alter table public._app_settings enable row level security;

create policy "documents public read"
  on public.documents for select
  to anon, authenticated
  using (true);

create policy "documents settings read"
  on public._app_settings for select
  to anon, authenticated
  using (true);

create policy "documents authenticated write"
  on public.documents for insert
  to authenticated
  with check (true);

create policy "documents authenticated update"
  on public.documents for update
  to authenticated
  using (true);

create policy "documents authenticated delete"
  on public.documents for delete
  to authenticated
  using (true);

create policy "documents bootstrap write"
  on public.documents for insert
  to anon
  with check (coalesce((public.app_setting('allow_public_writes'))::boolean, false));

create policy "documents bootstrap update"
  on public.documents for update
  to anon
  using (coalesce((public.app_setting('allow_public_writes'))::boolean, false));

create policy "documents bootstrap delete"
  on public.documents for delete
  to anon
  using (coalesce((public.app_setting('allow_public_writes'))::boolean, false));

alter publication supabase_realtime add table public.documents;

alter table public.documents replica identity full;