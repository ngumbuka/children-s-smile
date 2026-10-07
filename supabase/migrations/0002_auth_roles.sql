-- Children's Smile — role-gated writes for the backoffice.
--
-- 0001 left anonymous writes enabled behind the `allow_public_writes` flag so
-- the app could ship before authentication. This migration ties the write
-- path to real roles: an authenticated user may only modify the shared
-- `documents` store when their auth token carries an allowed role in
-- app_metadata (`super_admin`, `antenna_admin`, `editor`). The role is set by
-- the `manage-users` edge function when the coordinator creates or edits an
-- account, so app_metadata and the `users` collection cannot drift apart.
--
-- `auditor` (read-only) is therefore enforced at the database, not just in
-- the browser. The demo bootstrap path still works: flip
-- `allow_public_writes` to `false` in `_app_settings` the day all real
-- editors have accounts, and anonymous writes are refused.

create or replace function public.app_can_write()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '')
      in ('super_admin', 'antenna_admin', 'editor')
$$;

drop policy if exists "documents authenticated write" on public.documents;
drop policy if exists "documents authenticated update" on public.documents;
drop policy if exists "documents authenticated delete" on public.documents;

create policy "documents authenticated write"
  on public.documents for insert
  to authenticated
  with check (public.app_can_write());

create policy "documents authenticated update"
  on public.documents for update
  to authenticated
  using (public.app_can_write());

create policy "documents authenticated delete"
  on public.documents for delete
  to authenticated
  using (public.app_can_write());

-- The realtime feed is read by the public site, which signs in as `anon`:
-- leave the publication and its reads to the 0001 policies.