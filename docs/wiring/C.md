# Wiring for batch C (Scientist tools)

Everything in batch C ships as standalone routes, components, data and scripts. The lines below are the only edits to shared files needed to surface the work; apply them in the main session after merge.

## 1. `src/lib/nav.ts`

Add to the **`map` group** (Cancers & treatments), after `{ href: "/pathways/", ... }`:

```ts
{ href: "/dossiers/", label: "Target dossiers", blurb: "Everything about a target on one page: biology, prevalence, hotspots, products by phase, trials, resistance, assays, models, open questions, external ids." },
{ href: "/pathway-drugs/", label: "Pathway-to-drug matrix", blurb: "Which pathway nodes have a drug, at what phase, and which druggable nodes have none." },
{ href: "/models/", label: "Models & datasets", blurb: "Foundation models and the datasets they train on, with parameters, weights, licence and benchmarks." },
{ href: "/open-questions/", label: "Open questions", blurb: "Unresolved questions per target and technology: why open, what would answer them, who acts." },
{ href: "/preclinical-models/", label: "Preclinical models", blurb: "Cell lines with Cellosaurus and DepMap ids, PDX banks, mouse models and organoids per cancer and target." },
```

Add to the **`intel` group** (News & evidence), after `{ href: "/resistance/", ... }`:

```ts
{ href: "/resistance/gaps/", label: "Unaddressed resistance", blurb: "Escape routes with no countermeasure, or only preclinical ones: the drug-design opportunities." },
{ href: "/assays/", label: "Companion diagnostics", blurb: "Every assay and its cut-off: PD-L1 CPS, HER2-low, MSI, TMB, HRD and the multi-gene panels, linked to the drugs they gate." },
{ href: "/preprints/", label: "Preprint tracker", blurb: "bioRxiv and medRxiv preprints of the last 90 days per target, product and technology, and which have since been published." },
```

## 2. `src/components/EntityDetail.tsx`

Imports:

```ts
import { XrefStrip } from "./XrefStrip";
import { HotspotPlot } from "./HotspotPlot";
import { hotspotsFor } from "@/data/hotspots";
import { questionsFor } from "@/data/open-questions";
import { assaysForTarget, assaysForDrug } from "@/data/assays";
import { modelFor, datasetFor } from "@/data/model-registry";
import { modelsFor } from "@/data/preclinical-models";
```

In `case "target":` inside `overview(...)`, after the `Class` field grid and before the prevalence block:

```tsx
<div className="mt-6 flex flex-wrap items-center justify-between gap-2">
  <Link href={`/dossiers/${e.id}/`} className="chip border bg-card border-border hover:bg-foreground/5 text-sm">Full dossier: hotspots, trials, resistance, assays, models, open questions →</Link>
</div>
<Block title="Elsewhere"><XrefStrip targetId={e.id} compact /></Block>
{hotspotsFor(e.id) && <Block title="Mutation hotspots"><HotspotPlot map={hotspotsFor(e.id)!} compact /><p className="text-xs text-muted mt-1"><Link className="underline" href={`/dossiers/${e.id}/#hotspots`}>Residue-by-residue table on the dossier →</Link></p></Block>}
{questionsFor(e.id).length > 0 && <Block title="Open questions"><ul className="list-disc pl-5 space-y-1 text-[15px]">{questionsFor(e.id).map((q) => <li key={q.id}><Link className="hover:underline" href={`/dossiers/${e.id}/#q-${q.id}`}>{q.question}</Link></li>)}</ul></Block>}
{assaysForTarget(e.id).length > 0 && <Block title="Companion diagnostics"><ul className="text-sm space-y-1">{assaysForTarget(e.id).map((a) => <li key={a.id}><Link className="font-medium hover:underline" href={`/assays/#${a.id}`}>{a.name}</Link> <span className="text-muted">· {a.cutoff}</span></li>)}</ul></Block>}
{modelsFor(e.id) && <p className="text-sm text-muted mt-4"><Link className="underline" href={`/preclinical-models/?subject=${encodeURIComponent(e.name.split(" (")[0])}`}>Cell lines and mouse models for this target →</Link></p>}
```

In `case "drug":` overview, after the dosing card:

```tsx
{assaysForDrug(e.id).length > 0 && <div className="mt-6"><div className="kicker mb-2">Test required or used to select patients</div><ul className="text-sm space-y-1">{assaysForDrug(e.id).map((a) => <li key={a.id}><Link className="font-medium hover:underline" href={`/assays/#${a.id}`}>{a.name}</Link> <span className="text-muted">· {a.cutoff}</span></li>)}</ul></div>}
```

In `case "technology":` overview, after the `Since` field:

```tsx
{modelFor(e.id) && (() => { const m = modelFor(e.id)!; return (<div className="mt-6 card p-4 text-sm"><div className="kicker mb-1">Model registry</div><div className="grid gap-x-6 gap-y-1 sm:grid-cols-2"><div><span className="text-muted">Modality:</span> {m.modality}</div>{m.parametersM && <div><span className="text-muted">Parameters:</span> {m.parametersM >= 1000 ? `${m.parametersM / 1000} B` : `${m.parametersM} M`}</div>}<div><span className="text-muted">Weights:</span> {m.weights}</div>{m.licence && <div><span className="text-muted">Licence:</span> {m.licence}</div>}<div className="sm:col-span-2"><span className="text-muted">Training data:</span> {m.trainingData}</div>{m.benchmark && <div className="sm:col-span-2"><span className="text-muted">Reported result:</span> {m.benchmark}</div>}</div><Link className="underline text-xs text-muted mt-2 inline-block" href="/models/">Compare all models →</Link></div>); })()}
{questionsFor(e.id).length > 0 && <Block title="Open questions"><ul className="list-disc pl-5 space-y-1 text-[15px]">{questionsFor(e.id).map((q) => <li key={q.id}><Link className="hover:underline" href={`/open-questions/?subject=${encodeURIComponent(e.name)}`}>{q.question}</Link></li>)}</ul></Block>}
```

In `case "collection":` overview:

```tsx
{datasetFor(e.id) && (() => { const d = datasetFor(e.id)!; return (<div className="mt-6 card p-4 text-sm"><div className="kicker mb-1">Dataset registry</div><div><span className="text-muted">Size:</span> {d.size}</div><div><span className="text-muted">Access:</span> {d.access}</div><div><span className="text-muted">Consent and reuse:</span> {d.consent}</div><Link className="underline text-xs text-muted mt-2 inline-block" href="/models/">All datasets and the models trained on them →</Link></div>); })()}
```

In `case "cancer":` (the preclinical models entry keyed by cancer id), near the pipeline block:

```tsx
{modelsFor(e.id) && <Block title="Preclinical models"><p className="text-sm text-muted">{modelsFor(e.id)!.cellLines.length} cell lines, {modelsFor(e.id)!.gemms.length} mouse models and {modelsFor(e.id)!.pdx.length + modelsFor(e.id)!.organoids.length} repositories are listed for this cancer. <Link className="underline" href={`/preclinical-models/?subject=${encodeURIComponent(e.name.split(" (")[0])}`}>See them →</Link></p></Block>}
```

## 3. `src/app/resistance/page.tsx` (owned by the atlas, not batch C)

Add a gaps count to each class header and a link to the gaps page:

```ts
import { gapCountByClass } from "@/lib/resistance-gaps";
// inside ResistancePage():
const gaps = gapCountByClass();
```

In each class `<header>`, after the kicker line:

```tsx
{(gaps[r.id]?.none ?? 0) + (gaps[r.id]?.preclinical ?? 0) > 0 && <Link href={`/resistance/gaps/#${r.id}`} className="chip border border-rose-300 text-rose-700 dark:text-rose-300 text-xs mt-1 inline-block">{gaps[r.id].none} route{gaps[r.id].none === 1 ? "" : "s"} without a countermeasure · {gaps[r.id].preclinical} preclinical only →</Link>}
```

And in the page lede or below the matrix: `<Link href="/resistance/gaps/" className="underline">Unaddressed routes →</Link>`.

## 4. `package.json`

```json
"fetch:preprints": "tsx scripts/fetch-preprints.ts",
"fetch:xrefs": "tsx scripts/fetch-xrefs.ts",
"fetch:cell-lines": "tsx scripts/fetch-cell-lines.ts"
```

The workflow `.github/workflows/refresh-preprints.yml` calls `npx tsx scripts/fetch-preprints.ts --force` directly, so it works before this is added.

## 5. `scripts/build-api.ts` (optional, batch F owns it)

Merge cross-references into the entity export so the JSON graph can be joined to UniProt, ChEMBL and Open Targets:

```ts
import { targetXrefs } from "../src/data/target-xrefs";
// in the per-entity write:
write(`entities/${e.id}.json`, { entity: e, route: routeFor(e), neighbours, xrefs: e.kind === "target" ? targetXrefs[e.id]?.genes ?? [] : undefined });
```

## 6. `src/lib/sitemap-urls.ts`

Dynamic routes are excluded from the automatic scan, so add the dossiers:

```ts
for (const t of graph().kind("target")) urls.push({ url: absoluteUrl(`/dossiers/${t.id}/`), lastModified: t.asOf });
```

## 7. `CHANGELOG.md` (Unreleased, Added)

```
- Target dossiers (`/dossiers/<id>/`) for all 92 targets: biology, prevalence, mutation hotspot lollipop plots (24 targets), products by modality and phase, trials, resistance routes, pathways, companion diagnostics, preclinical models, open questions, and external identifiers from HGNC, Ensembl, UniProt, ChEMBL, Open Targets, CIViC, OncoKB and COSMIC, with a JSON export.
- Pathway-to-drug matrix (`/pathway-drugs/`): druggable nodes with and without a drug for all 44 pathways.
- Model and dataset registry (`/models/`): 45 foundation and risk models and 21 datasets with parameters, weights, licence and benchmarks.
- Open questions per target and technology (`/open-questions/`, 55 questions) with stage, actor, evidence needed and sources.
- Preprint tracker (`/preprints/`) from Europe PMC, refreshed weekly, showing which preprints have since been published.
- Preclinical model availability (`/preclinical-models/`): 222 cell lines with Cellosaurus and DepMap ids, mouse models with sources, PDX and organoid banks for 33 cancers and 19 targets.
- Companion diagnostic and assay registry (`/assays/`, 37 assays) with the cut-off that gates each drug.
- Unaddressed resistance routes (`/resistance/gaps/`) computed from the atlas.
```

## Notes

- `src/data/target-xrefs.ts` and `src/data/cell-line-ids.ts` are generated (HGNC, ChEMBL and Cellosaurus APIs); re-run `scripts/fetch-xrefs.ts` when targets are added and `scripts/fetch-cell-lines.ts` when cell lines are added to `preclinical-models.ts`.
- `public/preprints/` follows `public/papers/` (committed, refreshed by a weekly PR).
- `src/lib/side-data.test.ts` validates every id in the new side files against the graph and fails the build on a dangling reference.
