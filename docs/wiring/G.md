# Wiring for batch G (Visuals)

Everything in batch G ships as standalone routes, components and side data and is already testable. The
edits below touch shared files the batch does not own; apply them after merge.

## 1. Navigation (`src/lib/nav.ts`)

Group `find` ("Start here"), add after the Body map item:

```ts
{ href: "/journeys/", label: "Treatment journeys", blurb: "What the next twelve months look like for a cancer at a stage, phase by phase, with the decision points." },
```

Group `map` ("Cancers & treatments"), add:

```ts
{ href: "/atlas/", label: "Atlas", blurb: "Organ schematics with subsites and node stations, and where each cancer spreads." },
{ href: "/molecules/", label: "Molecule gallery", blurb: "Every product with a 3D structure, filterable by modality, payload, target and status." },
```

Group `intel` ("News & evidence"), add:

```ts
{ href: "/forest/", label: "Forest plot", blurb: "Every hazard ratio in the trial corpus on one log axis; filter by cancer, setting and endpoint; CSV." },
```

Also add `/atlas/organs/` and `/atlas/spread/` to the sitemap if `src/lib/sitemap-urls.ts` enumerates routes by hand (they are static routes under `src/app/atlas/`).

## 2. Cancer pages (`src/components/EntityDetail.tsx`, `cancerTabs`)

Imports:

```tsx
import { OrganSchematic } from "./OrganSchematic";
import { SpreadMap } from "./SpreadMap";
import { spreadFor } from "@/data/spread";
import { journeysForCancer } from "@/data/journeys";
import { organFor } from "@/data/organ-schematics";
```

Overview tab, after `<Block title="State of the art today">…</Block>`:

```tsx
{organFor(c.id) && <Block title="Where it starts and where it drains"><OrganSchematic cancerId={c.id} /></Block>}
```

Overview tab (or the "Subtypes & biomarkers" tab), after "Where the cases are":

```tsx
{spreadFor(c.id) && (
  <Block title="Where it spreads">
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div className="card p-3"><SpreadMap spread={spreadFor(c.id)!} cancerName={c.name} /></div>
      <ol className="space-y-2 text-sm">{spreadFor(c.id)!.sites.map((s) => <li key={s.region} className="card p-3"><div className="flex items-baseline justify-between gap-2"><span className="font-medium">{s.site}</span><span className="chip bg-foreground/5">{s.tier}</span></div>{(s.pct || s.note) && <p className="text-muted mt-1">{[s.pct, s.note].filter(Boolean).join(". ")}.</p>}</li>)}</ol>
    </div>
    <p className="text-xs text-muted mt-2"><Link href={`/atlas/spread/#${c.id}`} className="underline">All cancers side by side</Link></p>
  </Block>
)}
```

Standard-of-care tab, at the top:

```tsx
{journeysForCancer(c.id).length > 0 && (
  <div className="card p-4 mb-3">
    <div className="kicker mb-1">Treatment journeys</div>
    <div className="flex flex-wrap gap-1.5">{journeysForCancer(c.id).map((j) => <Link key={j.id} href={`/journeys/${j.id}/`} className="chip border bg-card border-border hover:bg-foreground/5">{j.stage}</Link>)}</div>
  </div>
)}
```

## 3. Trial pages

No wiring needed: `TrialOutcomes` in `src/components/Pictogram.tsx` (already mounted in the Outcomes tab) now
renders the survival curves from `src/data/km-curves.ts` and wraps every pictogram in `ChartExport`.

## 4. Product pages

No wiring needed: `ProcessSchematic` (already mounted) now resolves every product to a schematic via
`schematicForModality` in `src/data/animated.ts` (six new dedicated animations; front animations as the fallback).

## 5. Pathway pages

No wiring needed: the six new records in `src/data/pathways.ts` render through the existing `PathwayDiagram`.
To add downloads to pathway diagrams, wrap the SVG in `PathwayDiagramInteractive.tsx` (not owned by G):

```tsx
import { ChartExport } from "./ChartExport";
// around the <svg …> element:
<ChartExport title={`${view.name} pathway`} source="OnCo pathway corpus" filename={`pathway-${view.id}`}>{/* existing svg */}</ChartExport>
```

## 6. Data index

None of the batch's data files are entity arrays, so nothing is spread into `src/data/index.ts`. Each side
file is validated against the graph by its own test: `animated.test.ts`, `km-curves.test.ts`, `spread.test.ts`,
`organ-schematics.test.ts`, `journeys.test.ts`.

## 7. Scripts (`package.json`, optional)

```json
"fetch:globocan:editions": "tsx scripts/fetch-globocan.ts --editions-only"
```

`GLOBOCAN_EDITION=2020 npm run fetch:globocan` writes `public/globocan/countries-2020.json` and refreshes
`editions.json` once IARC serves that edition again (see the note at the top of the script).
