# Supabase: cloud storage for OnCo accounts

OnCo signs readers in through WorkOS AuthKit (browser-only PKCE flow, `src/lib/account.ts`). Their profile (role,
cancer choice, country, data view, language, theme, consent time) and their watched pages are stored in Supabase
tables and written straight from the browser with `fetch` against the Supabase REST endpoint
(`src/lib/cloud-profile.ts`). No Supabase client library, no server of ours.

Supabase does not issue the token. The browser sends the WorkOS access token (a JWT signed by WorkOS, the user id
in `sub`) as the `Authorization: Bearer` header and the project's anon key as `apikey`. Supabase has to be told to
trust WorkOS as a third-party JWT provider, otherwise every request is refused with 401 and the site shows "Saved
on this device only" in the account menu.

## One-time setup (owner)

1. Create a Supabase project (or use the existing one). Note the project URL (`https://<ref>.supabase.co`) and the
   anon public key from Project Settings, API.
2. SQL editor: paste and run `supabase/migrations/0001_profiles.sql`. It creates `public.profiles` and
   `public.saved_items`, switches on row-level security and adds the eight policies that compare `user_id` with
   the token's `sub` claim.
3. Authentication, Sign In / Providers, Third-Party Auth: **Add provider**, choose **WorkOS** (if the list has no
   WorkOS entry, choose the generic JWT / custom provider). Fill in:
   - Client ID: the WorkOS client id (`client_01M2R9QXNGMK8909W2V1FG3DFG` in production, the default in
     `src/lib/account.ts`, or whatever `NEXT_PUBLIC_WORKOS_CLIENT_ID` is set to)
   - Issuer: `https://api.workos.com/user_management/<client_id>`
   - JWKS URL: `https://api.workos.com/sso/jwks/<client_id>`
   Save.
4. WorkOS dashboard, Authentication, Sessions, JWT Template: add the claim
   `"role": "authenticated"` (keep any existing claims). Supabase runs a request as the role named in the token's
   `role` claim; without it the token is treated as anonymous and the policies refuse every row.
   Example template body: `{ "role": "authenticated" }`.
5. Vercel, project settings, Environment Variables: set
   - `NEXT_PUBLIC_SUPABASE_URL` = the project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon public key
   then redeploy. Both are public by design: the row policies, not the key, protect the data. With either missing
   the cloud code is a no-op and everything stays in the browser as before.
6. Check: sign in on the live site, open the account menu, the status line should read "Synced". Open the
   `profiles` table in the Supabase table editor and one row with your WorkOS user id should be there.

## How the requests look

```
GET  {URL}/rest/v1/profiles?select=...&user_id=eq.<sub>
POST {URL}/rest/v1/profiles          Prefer: resolution=merge-duplicates,return=minimal   body: [{ user_id, role, ... }]
GET  {URL}/rest/v1/saved_items?select=kind,id,added_at&user_id=eq.<sub>
POST {URL}/rest/v1/saved_items       Prefer: resolution=merge-duplicates,return=minimal   body: [{ user_id, kind, id, added_at }]
DELETE {URL}/rest/v1/saved_items?user_id=eq.<sub>&id=not.in.(...)
headers on every call: apikey: <anon key>, Authorization: Bearer <WorkOS access token>
```

On a 401 the browser refreshes the WorkOS token once (refresh token grant) and retries; a second 401 is reported
as "Saved on this device only".

## What is stored, and deleting it

`profiles`: role, cancer id, country code, data view, language, theme, consent time, updated time.
`saved_items`: entity kind and id of each watched page and when it was added. No names, notes or free text.
"Delete my account data" in the account menu deletes both rows sets for the signed-in user and clears the
browser copies. The WorkOS user record (email, name) is separate and is removed on request, see /privacy/.

## Older path

`src/lib/account.ts` still carries the Supabase magic-link sign-in and the `watchlists` table from before WorkOS
(docs/LAUNCH.md). It only runs when `NEXT_PUBLIC_WORKOS_CLIENT_ID` is empty and is not the target of this setup.
