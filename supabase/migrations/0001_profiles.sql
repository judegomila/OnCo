-- OnCo cloud profiles, stage one.
--
-- Identity comes from WorkOS, storage from Supabase. Supabase never issues the token: the browser sends the
-- WorkOS access token (a JWT signed by WorkOS, user id in `sub`) as the Bearer token and the anon key as
-- `apikey`. For PostgREST to accept that token, the Supabase project must list WorkOS as a third-party JWT
-- provider (Authentication > Sign In / Providers > Third-Party Auth, JWKS URL
-- https://api.workos.com/sso/jwks/<client_id>, issuer https://api.workos.com/user_management/<client_id>) and
-- the WorkOS JWT template must add "role": "authenticated" so the request runs as the authenticated role.
-- The dashboard steps are written out in supabase/README.md. Without that configuration every request below
-- is rejected with 401 and the site falls back to "Saved on this device only".
--
-- The row policies compare `user_id` with the token's `sub` claim, so a person can only ever read or write
-- their own rows. `user_id` is text, not uuid, because WorkOS ids look like user_01H....

create table if not exists public.profiles (
  user_id     text primary key,
  role        text,
  cancer_id   text,
  country     text,
  view        text,
  language    text,
  theme       text,
  consent_at  timestamptz,
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is
  'One row per signed-in OnCo reader (WorkOS user id in user_id). Role, cancer choice and the four header preferences. Written by the browser with the WorkOS access token as Bearer; Supabase must accept WorkOS as a third-party JWT provider (see supabase/README.md).';

create table if not exists public.saved_items (
  user_id   text not null,
  kind      text not null,
  id        text not null,
  added_at  timestamptz not null default now(),
  primary key (user_id, kind, id)
);

comment on table public.saved_items is
  'Pages a signed-in OnCo reader pressed Watch on: entity kind and id per WorkOS user id. Same token rule as public.profiles.';

alter table public.profiles enable row level security;
alter table public.saved_items enable row level security;

-- profiles: a reader sees and changes only the row whose user_id equals their token's sub.
drop policy if exists "profiles select own" on public.profiles;
create policy "profiles select own" on public.profiles for select to authenticated
  using (user_id = (auth.jwt() ->> 'sub'));
drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own" on public.profiles for insert to authenticated
  with check (user_id = (auth.jwt() ->> 'sub'));
drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own" on public.profiles for update to authenticated
  using (user_id = (auth.jwt() ->> 'sub')) with check (user_id = (auth.jwt() ->> 'sub'));
drop policy if exists "profiles delete own" on public.profiles;
create policy "profiles delete own" on public.profiles for delete to authenticated
  using (user_id = (auth.jwt() ->> 'sub'));

-- saved_items: the same four rules.
drop policy if exists "saved_items select own" on public.saved_items;
create policy "saved_items select own" on public.saved_items for select to authenticated
  using (user_id = (auth.jwt() ->> 'sub'));
drop policy if exists "saved_items insert own" on public.saved_items;
create policy "saved_items insert own" on public.saved_items for insert to authenticated
  with check (user_id = (auth.jwt() ->> 'sub'));
drop policy if exists "saved_items update own" on public.saved_items;
create policy "saved_items update own" on public.saved_items for update to authenticated
  using (user_id = (auth.jwt() ->> 'sub')) with check (user_id = (auth.jwt() ->> 'sub'));
drop policy if exists "saved_items delete own" on public.saved_items;
create policy "saved_items delete own" on public.saved_items for delete to authenticated
  using (user_id = (auth.jwt() ->> 'sub'));

-- The anon role gets nothing: no grants beyond what the policies allow to authenticated.
grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.saved_items to authenticated;
revoke all on public.profiles from anon;
revoke all on public.saved_items from anon;
