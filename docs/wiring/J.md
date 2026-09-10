# Wiring for batch J: intelligence feeds and currency automation

Everything in this batch is static-export safe: a script under `scripts/` fetches a public source (no keys, no
secrets), writes a JSON snapshot under `public/`, and the pages read the snapshot at build time through
`readPublicJson()` in `src/lib/feed-meta.ts`. GitHub workflows run the scripts on a schedule and open pull
requests; nothing is merged automatically.

Three routes and several panels ship standalone and work today. The shared files below were not edited; the
exact lines to add are listed here for the main session.

## `src/lib/nav.ts`

Add to the `intel` group's `items`, after the `/regulatory/regions/` entry:

```ts
      { href: "/hta/", label: "HTA decisions", blurb: "NICE, SMC, G-BA and PBAC verdicts per product and country, with dates and links to the appraisal." },
      { href: "/survival/", label: "Survival statistics", blurb: "Five-year relative survival by cancer and stage from SEER, with the period and caveats." },
```

and after the `/audit/` entry:

```ts
      { href: "/status/", label: "Data currency", blurb: "When each automated feed last ran, what is stale, and the incident log." },
```

## `package.json`

Add script aliases (the workflows call `npx tsx scripts/<name>.ts` directly, so these are conveniences):

```json
    "fetch:fda": "tsx scripts/fetch-fda.ts",
    "fetch:ema": "tsx scripts/fetch-ema.ts",
    "fetch:abstracts": "tsx scripts/fetch-abstracts.ts",
    "fetch:hta": "tsx scripts/fetch-hta.ts",
    "fetch:pulse": "tsx scripts/fetch-pulse.ts",
    "fetch:citations": "tsx scripts/fetch-citations.ts",
    "fetch:survival": "tsx scripts/fetch-survival.ts",
    "propose": "tsx scripts/propose-updates.ts",
```

## `src/components/EntityDetail.tsx`

Optional, once the main session wants survival on cancer pages. In the cancer branch, near the burden or
prevalence block:

```tsx
import Link from "next/link";
import { SURVIVAL_SITES } from "@/data/survival-map";
// ...
{e.kind === "cancer" && SURVIVAL_SITES[e.id] && (
  <p className="text-sm text-muted">Five-year relative survival by stage for this cancer (US, SEER): <Link className="underline" href="/survival/">survival statistics</Link>.</p>
)}
```

Optional, on drug pages next to the coverage cards: `<Link href="/hta/">HTA decisions for this product</Link>`
filtered by product is not possible without a query string; the `/hta/` table has a product search box.

## `src/components/RegionMatrix.tsx`

`RegionalEntry` now carries `verifiedOn` (the `EPAR_CHECKED` date). To show it on the verified dot's tooltip,
change the title on line 63 from `"Verified against regulator page"` to:

```tsx
title={`Verified against the EMA register on ${e.verifiedOn ?? "an earlier check"}`}
```

## `CHANGELOG.md`

Under `## [Unreleased]`, `### Added`:

```md
- Intelligence feeds (batch J): FDA approvals feed on `/regulatory/` (OCE notifications and openFDA supplements, new-since-last-build and not-in-corpus panels); ClinicalTrials.gov change detection (`public/trials/changes.json`) listed on `/calendar/`; EMA register check for `regional-approvals.ts` with `EPAR_CHECKED` stamp; congress abstract harvest on `/digests/` (Crossref supplements); `/hta/` (NICE, SMC, G-BA, PBAC); automated stream on `/pulse/` (journal and news feeds, FDA OCE); most cited key papers on `/papers/` (OpenAlex); `/survival/` (SEER five-year relative survival by stage); `/status/` data-currency page with feed ages, schedules and an incident log; nightly change-proposal bot (`scripts/propose-updates.ts`, `bot-proposal` PRs). Five new workflows: `refresh-fda`, `refresh-regional`, `refresh-pulse`, `refresh-hta`, `propose`.
```

## `.github/workflows/factcheck.yml` (batch E owns CI; note only)

`propose.yml` reads `public/factcheck.json`, so it is most useful the morning after the fact-check run. No change
needed; if batch E reschedules the fact check, move `propose.yml`'s cron to follow it.

## Labels

`propose.yml` applies the labels `bot-proposal` and `automated`. Create `bot-proposal` in the repository (colour
of choice) or the first PR will fail to label (the PR is still created).

## After batch A merges

`/hta/` links to `/coverage/us/` for assistance programmes. When batch A's `/assistance/` route lands, change the
header button in `src/app/hta/page.tsx` to `href="/assistance/"` with label "Assistance navigator".

## Snapshots committed in this batch

First runs of every feed are committed so the pages render with data:

| Snapshot | Script | Notes |
|---|---|---|
| `public/fda/recent.json` | fetch-fda | 24 OCE notices since 2026-05-12, 1 not in corpus |
| `public/trials/*.json`, `public/trials/changes.json` | fetch-trials | full weekly refresh (snapshots now carry `hasResults`) plus the first diff against 2026-09-06: 14 status and primary-completion changes |
| `public/regional/candidates.json`, `public/regional/verified.json` | fetch-ema | EMA register 2026-09-09; `EPAR_CHECKED` not moved (disagreements listed) |
| `public/digests/candidates.json` | fetch-abstracts | ASCO 2026 (JCO 16_suppl), 400 of 1,530 matched abstracts kept |
| `public/hta/index.json` | fetch-hta | 128 NICE TA pages (4 name a different medicine, 21 superseded by newer guidance), 112 G-BA procedures, 6 PBAC meetings |
| `public/pulse/auto.json` | fetch-pulse | 7 feeds |
| `public/openalex/papers.json` | fetch-citations | 108 of 110 DOIs resolved |
| `public/survival/index.json` | fetch-survival | 31 SEER sites |
| `public/proposals/latest.json`, `docs/proposals/latest.md` | propose-updates | 104 proposals: 57 missing EU rows, 32 missing regulatory events, 10 EU status or year disagreements, 3 trial statuses, 1 approval, 1 new product |

## Known follow-ups surfaced by the first runs (for editors, not wiring)

- `/hta/` flags NICE TA numbers in `coverage-uk.ts` whose page names a different medicine (TA982 cited for enfortumab vedotin is a baricitinib appraisal, TA916 for tremelimumab is bimekizumab, TA647 for glasdegib is eculizumab; TA112 for letrozole is a genuine multi-drug appraisal) and 21 appraisals superseded by newer guidance whose replacement TA should be cited.
- `public/regional/candidates.json` lists EU rows recorded as under review that EMA shows as authorised (camizestrant, tarlatamab, lurbinectedin, vimseltinib), pralsetinib recorded approved but withdrawn in the EU, and products with an EPAR but no EU row.
- `docs/proposals/latest.md` drafts the regulatory events missing from product pages for the FDA approvals since May 2026.
