# Wiring for batch D: Builders and investors

Everything in this batch ships as standalone routes, side data and components, testable before wiring. The
lines below are the only edits needed in the shared files, which batch D did not touch.

## Routes added (all static, already picked up by the sitemap walker)

| Route | Page | Group |
|---|---|---|
| `/catalysts/` | Catalyst calendar with company and quarter filters, `.ics` download of the filtered rows | News & evidence |
| `/catalysts/feed.ics` | iCalendar feed (route handler, `force-static`) | |
| `/scorecards/` | Company scorecards with the disclosed formula and financial snapshots | Institutions & people |
| `/deals/` | Deal and licensing map with the region chord and year filter | News & evidence |
| `/exclusivity/` | Patent and exclusivity expiry timeline 2026 to 2040 | News & evidence |
| `/manufacturing/` | Manufacturing capacity map on `WorldMap` | Institutions & people |
| `/pipeline/` | Pipeline funnel and crowding index | News & evidence |
| `/market/` | Addressable population estimator | News & evidence |
| `/sponsors/` | Trial sponsor leaderboard | Institutions & people |
| `/build/` | Builder cookbook, OpenAPI spec, types, embeds, licence | Learn & contribute |

## 1. `src/lib/nav.ts`

Add inside the `intel` group's `items` (suggested position: after the `/regulatory/regions/` entry):

```ts
      { href: "/catalysts/", label: "Catalyst calendar", blurb: "Regulatory decisions, expected readouts, filings and deal closings by company, with a calendar feed." },
      { href: "/deals/", label: "Deals and licences", blurb: "Who bought or licensed what, for how much, and where assets flow between regions." },
      { href: "/exclusivity/", label: "Exclusivity expiry", blurb: "When each product loses patent or regulatory exclusivity, and the biosimilars and generics coming." },
      { href: "/pipeline/", label: "Pipeline funnel", blurb: "Assets by phase for any target, modality or cancer, and how crowded each target is." },
      { href: "/market/", label: "Addressable population", blurb: "Incidence times prevalence times setting share, every input linked, as a range." },
```

Add inside the `who` group's `items` (suggested position: after `/companies/`):

```ts
      { href: "/scorecards/", label: "Company scorecards", blurb: "Every company ranked by one disclosed formula, with financial snapshots from annual reports." },
      { href: "/sponsors/", label: "Trial sponsors", blurb: "Who runs the most phase 2 and 3 trials, by cancer, from the registry and the corpus." },
      { href: "/manufacturing/", label: "Manufacturing map", blurb: "Where ADCs are conjugated, cell therapies made and isotopes produced." },
```

Add inside the `learn` group's `items` (suggested position: after `/api/`):

```ts
      { href: "/build/", label: "Build on OnCo", blurb: "Recipes, OpenAPI spec, TypeScript types, embeddable cards and the MCP server." },
```

## 2. `src/components/EntityDetail.tsx`

Import:

```tsx
import { CatalystsPanel, CompanyScorePanel, DealsPanel, ExclusivityPanel, ManufacturingPanel } from "@/components/InvestorPanels";
```

Each panel renders `null` when the entity has nothing to show, so they can be dropped in unconditionally. Suggested
placement is after the existing relationship sections and before the neighbours block.

Company pages:

```tsx
{e.kind === "company" && (<>
  <CompanyScorePanel id={e.id} />
  <DealsPanel id={e.id} />
  <CatalystsPanel id={e.id} />
  <ManufacturingPanel companyId={e.id} />
</>)}
```

Product pages:

```tsx
{e.kind === "drug" && (<>
  <ExclusivityPanel drugId={e.id} />
  <DealsPanel id={e.id} />
  <CatalystsPanel id={e.id} />
</>)}
```

Cancer and target pages (catalysts that name them):

```tsx
{(e.kind === "cancer" || e.kind === "target") && <CatalystsPanel id={e.id} />}
```

## 3. `src/app/api/page.tsx` (optional, not a shared file but owned by another batch)

Add a row pointing at the spec and the cookbook:

```tsx
<tr><td><a className="underline font-mono text-sm" href="/openapi.yaml">/openapi.yaml</a></td><td>OpenAPI 3.1 description of every endpoint. Recipes and types at <Link href="/build/">/build/</Link>.</td></tr>
```

## 4. `src/components/Tip.tsx` `COLUMN_TIPS` (optional)

The new tables pass explicit `tip` props, so no shared edit is required. If the main session wants the labels
available globally:

```ts
  "Crowding index": "Active assets per 100,000 addressable patients per year for the target. Higher means more programmes chasing each patient.",
  "Registry studies": "Phase 2 and 3 studies on ClinicalTrials.gov naming the product, refreshed weekly.",
  Upfront: "Cash paid at signing plus stated non-contingent payments, as announced.",
  "Total": "Headline up-to value including milestones, most of which are never paid.",
```

## 5. `src/data/index.ts` and `src/lib/schema.ts`

No changes. Every dataset in this batch is a keyed side file validated against the graph by
`src/lib/investor-data.test.ts` (every referenced id must resolve; sources must be https; dates must parse).

## 6. `CHANGELOG.md` (main session)

Suggested entry:

```
- Builders and investors: catalyst calendar with .ics feed (/catalysts/), company scorecards with a disclosed
  formula and FY2024 financial snapshots (/scorecards/), deal and licensing map with a region chord (/deals/),
  patent and exclusivity timeline (/exclusivity/), manufacturing capacity map (/manufacturing/), pipeline funnel
  and crowding index (/pipeline/), addressable population estimator (/market/), trial sponsor leaderboard
  (/sponsors/), builder cookbook and OpenAPI spec (/build/, /openapi.yaml). New side data: catalysts, deals,
  exclusivity, manufacturing, company-financials, setting-shares, sponsor-aliases.
```

## Files created by this batch

- Data: `src/data/catalysts.ts`, `src/data/deals.ts`, `src/data/exclusivity.ts`, `src/data/manufacturing.ts`, `src/data/company-financials.ts`, `src/data/setting-shares.ts`, `src/data/sponsor-aliases.ts`
- Libraries: `src/lib/ics.ts`, `src/lib/catalysts.ts`, `src/lib/company-score.ts`, `src/lib/company-score.test.ts`, `src/lib/pipeline-stats.ts`, `src/lib/market.ts`, `src/lib/sponsors.ts`, `src/lib/investor-data.test.ts`
- Components: `src/components/CatalystBrowser.tsx`, `src/components/ScorecardTable.tsx`, `src/components/DealFlow.tsx`, `src/components/ExclusivityTimeline.tsx`, `src/components/ManufacturingMap.tsx`, `src/components/PipelineFunnel.tsx`, `src/components/MarketEstimator.tsx`, `src/components/SponsorBoard.tsx`, `src/components/InvestorPanels.tsx`
- Routes: `src/app/{catalysts,scorecards,deals,exclusivity,manufacturing,pipeline,market,sponsors,build}/page.tsx`, `src/app/catalysts/feed.ics/route.ts`
- Public: `public/openapi.yaml`
