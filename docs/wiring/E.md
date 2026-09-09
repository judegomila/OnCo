# Wiring for batch E: data quality and currency checks

Batch E ships standalone routes, scripts and workflows. The lines below are the edits to shared files (owned by the main session) that connect them. Nothing in batch E breaks without them; with them the pages appear in navigation and the scripts get `npm run` aliases.

## `src/lib/nav.ts`

In the `intel` group ("News & evidence"), after the `/audit/` item:

```ts
      { href: "/freshness/", label: "Freshness", blurb: "How old is too old for each kind of record, by review track, and what is past due." },
      { href: "/history/", label: "Recent changes", blurb: "What changed on which record, field by field, from the git history." },
```

In the `learn` group ("Learn & contribute"), after the `/api/` item:

```ts
      { href: "/schema/", label: "Data dictionary", blurb: "Every kind, every field, its type and meaning, with a real example per kind." },
```

## `package.json` scripts

```json
    "freshness": "tsx scripts/freshness.ts",
    "freshness:check": "tsx scripts/freshness.ts --check",
    "numbers": "tsx scripts/numbers.ts",
    "history": "tsx scripts/history.ts",
    "check:links": "tsx scripts/check-links.ts",
    "factcheck:apply": "tsx scripts/apply-factcheck.ts",
    "affected": "tsx scripts/affected-pages.ts"
```

`.github/workflows/ci.yml` and `links.yml` call the scripts with `npx tsx` so they work before these aliases land.

## `.github/workflows/factcheck.yml` (weekly job, owned by the main session)

Add after `npm run provenance` so the weekly PR also refreshes the change history and the freshness snapshot:

```yaml
      - run: npx tsx scripts/history.ts
      - run: npx tsx scripts/freshness.ts
```

and extend the PR body: "`public/history/` (field-level change history), `public/freshness.json` (SLA snapshot), `public/factcheck-patches.json` (proposed registry patches; apply accepted ones with `npx tsx scripts/apply-factcheck.ts <id.field>`)."

## `src/lib/schema.ts` (optional, improves `/schema/`)

The data dictionary reads the `/** ... */` comment above each field in `schema.ts` as its description. Fields without a comment fall back to a short description table in `src/lib/schema-docs.ts`. Adding comments to `schema.ts` (for example above `nct`, `phase`, `brand`, `hq`) moves the description to the source of truth; no other change is needed.

## Item 56 dependency (batch F)

`/schema/` links to `/api/v1/schema.json`, which item 56 (batch F) emits from `scripts/build-api.ts`. Until F lands the link 404s. If F does not ship, the one-liner for `build-api.ts` is:

```ts
import { z } from "zod";
import { EntitySchema } from "../src/lib/schema";
write("schema.json", z.toJSONSchema(EntitySchema, { io: "input", unrepresentable: "any" }));
```

## `src/app/api/page.tsx` (batch F owns it)

Add rows for the new public JSON files if the API page lists site-level data: `/audit.json`, `/freshness.json`, `/factcheck.json`, `/factcheck-patches.json`, `/links.json`, `/history/index.json`, `/history/<id>.json`, `/provenance.json`.

## `.github/CODEOWNERS`

Every line currently resolves to `@judegomila`. As reviewers join a track (REVIEWERS.md), add their handle (or an org team such as `@judegomila/onco-clinical`) after the maintainer on that track's lines. GitHub ignores lines naming users or teams without write access, so add people to the repository first.

## Committed artefacts

`public/history/` (about 1,300 per-record files plus `index.json`) and `public/freshness.json` are committed like `public/provenance.json` and `public/audit.json`; Vercel builds from a shallow clone and cannot regenerate the git-derived files itself. `public/links.json` and `public/factcheck-patches.json` appear after the first run of their workflows; the pages render a placeholder until then.

## Known corpus findings surfaced by this batch (for triage, not fixed here)

- 13 spike records defined in two spikes with different scalar values (`spike-scalar-divergence` on /audit/): bevacizumab, cabozantinib, eisai, everolimus, exelixis, incyte, ivosidenib, lenvatinib, letrozole, ramucirumab, regorafenib, sunitinib, trabectedin.
- 8 approval-year disagreements between `approvals[]` and `regional-approvals.ts` (medium) and one product (`daraxonrasib`) with a US approval row while the regional table says under review (high).
- 3 TL;DRs use `MSI` or `RWE` without a glossary match (`owkin`, `cota-healthcare`, `paper-lynch-frameshift-vaccine-ccr-2020`); listed as exceptions in `src/lib/corpus-rules.test.ts`. Adding `MSI` and `RWE` to the glossary `aka` lists clears them.
- 9 phase 3 trials without a registry id and 5 standard-of-care rows without refs are listed as exceptions in the same test with the reason.
