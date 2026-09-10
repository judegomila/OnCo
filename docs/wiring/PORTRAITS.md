# Wiring for portraits: Wikimedia Commons photos of people

Standalone pieces that ship with this batch and need no shared-file edits:

- `scripts/fetch-portraits.ts` — resolves each person to a Wikidata human, takes P18, keeps only CC0 / CC BY /
  CC BY-SA / public-domain files, downloads a 320px thumbnail to `public/portraits/<id>.jpg|png` and writes
  `public/portraits/index.json` (portraits, unresolved ids with reasons, rejected candidates for review).
- `src/lib/portraits.ts` — `portraitFor(id)`, `portraitSrc(id)`, `portraitInitial(name)`, `portraitCoverage()`.
- `src/components/Portrait.tsx` — `<Portrait id name size? className?>` (circle, `alt` = name, `title` =
  attribution and licence; surname-initial avatar when there is no portrait) and `<PortraitCredit id />`.
- `public/portraits/` — the fetched files and index (committed).
- `LICENSE-DATA` — paragraph on portraits.

The shared files below were deliberately not edited. Paste the lines as shown.

## `package.json`

```json
    "fetch:portraits": "tsx scripts/fetch-portraits.ts",
```

Re-run monthly (entries under 30 days old are skipped; `-- --force` re-checks everything;
`-- --only=<id>,<id>` for specific people). Add `public/portraits/` next to `public/logos/` in any
CI job that verifies fetched assets.

## Person page header (`src/components/EntityDetail.tsx`)

Import, next to `import { Logo } from "./Logo";`:

```tsx
import { Portrait, PortraitCredit } from "./Portrait";
```

In the `<PageHeader ... logo={...}>` expression, add a `person` branch before the `"website" in e` branch:

```tsx
        logo={e.kind === "cancer" ? <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent"><CancerIcon cancerId={e.id} className="h-10 w-10" /></span>
          : e.kind === "section" ? <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent"><FrontIcon id={e.id} className="h-9 w-9" /></span>
          : e.kind === "person" ? <Portrait id={e.id} name={e.name} size={64} />
          : "website" in e ? <Logo id={e.id} website={e.website} name={e.name} size={64} />
          : "url" in e && e.kind === "collection" ? <Logo id={e.id} website={e.url} name={e.name} size={64} />
          : undefined}
```

Credit line: in the right-hand `<aside>` card (the one that starts with the Wikipedia block), add as the first child
so the licence is visible on every person page that shows a photo (`PortraitCredit` renders nothing otherwise):

```tsx
              {e.kind === "person" && <PortraitCredit id={e.id} />}
```

## People index table rows (`src/app/[kind]/page.tsx`)

Import, next to `import { logoSrc } from "@/lib/logos";`:

```tsx
import { portraitSrc } from "@/lib/portraits";
```

In `case "person":`, add `logo` and `round` to the row object (the rest of the row is unchanged):

```tsx
      rows: g.kind("person").map((p) => { const inst = p.institutionId ? g.get(p.institutionId) : undefined; return { ...base(p), logo: portraitSrc(p.id), round: true, sub: `${p.role}${inst ? ` · ${inst.name}` : ""}`, /* ...facets, cols, sortKeys as before */ }; }),
```

`src/components/EntityBrowser.tsx` renders `logo` in a small rounded square with `object-contain`; portraits want a
circle with `object-cover`. Add `round?: boolean` to `BrowserRow` (after `logo?: string;`) and change the name
column's logo span to:

```tsx
        {r.logo && !r.molecule && (
          <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center border border-border bg-white overflow-hidden ${r.round ? "rounded-full" : "rounded-md"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element -- self-hosted or hotlinked icon, never optimised */}
            <img src={r.logo} alt="" className={r.round ? "h-full w-full object-cover" : "h-[70%] w-[70%] object-contain"} loading="lazy" referrerPolicy="no-referrer" />
          </span>
        )}
```

If `EntityBrowser` must stay untouched, the alternative is to leave `logo` off person rows and show portraits only
on the person page, heroes cards and institution People tab.

## Heroes cards (`src/app/heroes/page.tsx`)

Import:

```tsx
import { Portrait } from "@/components/Portrait";
```

In `HeroCard`, replace the initial span

```tsx
      <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent text-2xl font-semibold tracking-tight">{initial}</span>
```

with

```tsx
      <Portrait id={p.id} name={p.name} size={56} />
```

and drop the now-unused `const initial = surname(p.name).charAt(0).toUpperCase();` (keep `surname` if it is used
elsewhere on the page). The fallback inside `Portrait` reproduces the same `h-14 w-14 rounded-full bg-accent-soft
text-accent text-2xl` initial, so cards without a photo look exactly as before.

## Institution People tab (`src/components/EntityDetail.tsx`, `peopleTab`)

Replace the card body so the portrait sits left of the name and role:

```tsx
      <Link key={p.id} href={routeFor(p)} className="card p-3 hover:shadow-md transition">
        <div className="flex items-start gap-3">
          <Portrait id={p.id} name={p.name} size={40} className="mt-0.5" />
          <div className="min-w-0">
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-muted">{p.role}</div>
          </div>
        </div>
        <div className="mt-1 flex flex-wrap gap-1">{p.specialisms.slice(0, 3).map((s) => <span key={s} className="chip bg-foreground/5">{s}</span>)}</div>
        <p className="text-sm text-muted mt-1 line-clamp-2">{p.tldr}</p>
      </Link>
```

## Attribution rules

- Every rendered portrait carries `title="Photo: <author>, <licence>, via Wikimedia Commons"` and `alt` = the
  person's name; the person page additionally shows `<PortraitCredit>` with the licence URL and the Commons file page.
- Only files whose Commons `LicenseShortName` is CC0, CC BY 1.0 to 4.0, CC BY-SA 1.0 to 4.0 or public domain are
  kept. Non-commercial, no-derivatives, GFDL-only and fair-use files are skipped and listed under `unresolved`.
- Identity: a Wikidata item is accepted when the record's `wikipedia` link points at it, or when a name / `aka`
  search returns a human (P31 = Q5) whose description, occupations (P106) or employer (P108) match medicine,
  science, advocacy or the record's own role text. Rejected candidates are kept in `index.json` under `rejected`
  for review; wrong matches can be pinned or blocked in the `OVERRIDE` map at the top of the script.
- To remove a photo: delete the file and its `portraits` entry, add `"<id>": null` to `OVERRIDE`, and re-run.
