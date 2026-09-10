# Wiring for batch B: clinician power tools

Everything in batch B ships as standalone routes and side data; nothing below is required for the pages to build. These are the exact lines to add to the shared files (owned by the main session) so the new tools are reachable from navigation, object pages and the sitemap.

## 1. `src/lib/nav.ts`: navigation entries

Add to the `find` group (`id: "find"`, "Start here") `items` array, after the Tumour board entry:

```ts
      { href: "/biomarker-matrix/", label: "Biomarker matrix", blurb: "Every biomarker against every cancer: approved products in your region versus trials, one grid." },
      { href: "/calculators/", label: "Calculators", blurb: "BSA, Calvert, creatinine clearance, ANC, corrected calcium, RECIST 1.1, anthracycline dose, dose banding." },
      { href: "/interactions/", label: "Interactions", blurb: "Pick two or more drugs and see flagged pairs: CYP3A4, QT, PPIs, P-gp, bleeding, plus food and organ flags." },
      { href: "/irae/", label: "irAE guide", blurb: "Checkpoint-inhibitor toxicity by organ and grade: hold, steroids, escalation, rechallenge. Printable." },
```

Add to the `map` group (`id: "map"`, "Cancers & treatments") `items` array, after the Trials entry:

```ts
      { href: "/regimens/", label: "Regimens", blurb: "Named regimens with doses, days, cycles, emetogenicity and G-CSF need; calendar strip per regimen." },
      { href: "/sequencing/", label: "Lines of therapy", blurb: "Per cancer, the standard of care by line and biomarker subgroup, with sequence and caution pairings." },
      { href: "/staging/", label: "Staging & risk scores", blurb: "TNM, FIGO, Lugano, BCLC, R-ISS and interactive IPI, IMDC, CLL-IPI, Child-Pugh, Khorana scorers." },
```

Add to the `intel` group (`id: "intel"`, "News & evidence") `items` array, after the Regulatory timeline entry:

```ts
      { href: "/guidelines/", label: "Guidelines", blurb: "Where NCCN, ESMO, NICE and ASCO agree and disagree, and what changed between guideline versions." },
```

`GroupKicker` ids already used by the new pages: `find` (biomarker-matrix, calculators, interactions, irae), `map` (regimens, sequencing, staging), `intel` (guidelines). They match the entries above.

## 2. `src/lib/sitemap-urls.ts`: dynamic routes

`staticRoutes()` picks up the eight static pages automatically. The three dynamic routes need explicit entries. Add the imports:

```ts
import { regimens } from "../data/regimens";
import { guidelineCancerIds } from "./guidelines";
import { sequencingIndex } from "./sequencing";
```

and, inside `sitemapUrls()` where the other route lists are pushed, add:

```ts
  for (const r of regimens) out.push({ url: absoluteUrl(`/regimens/${r.id}/`), lastModified: r.asOf });
  for (const c of sequencingIndex()) out.push({ url: absoluteUrl(`/sequencing/${c.id}/`) });
  for (const id of guidelineCancerIds()) out.push({ url: absoluteUrl(`/guidelines/${id}/`) });
```

(`out` is whatever the function's accumulator is called; adapt the variable name.)

## 3. `src/components/EntityDetail.tsx`: cross-links from object pages

Imports:

```tsx
import { regimensFor, regimenRoute, cycleSummary } from "@/lib/regimens";
import { guidelineCancerIds } from "@/lib/guidelines";
import { agentById } from "@/lib/interactions";
```

### Drug pages

In the drug tab list (the block starting `case "drug"` / the `approvals`, `safety`, `access`, `trials` tabs around line 232), add a Regimens tab when the product appears in the library, and an interactions link in the Safety tab:

```tsx
        ...(regimensFor(e.id).length ? [{ id: "regimens", label: "Regimens", count: regimensFor(e.id).length, content: (
          <ul className="grid gap-3 sm:grid-cols-2">
            {regimensFor(e.id).map((r) => (
              <li key={r.id}><Link href={regimenRoute(r)} className="card block p-3 text-sm"><div className="font-medium">{r.name}</div><div className="text-xs text-muted mt-1 line-clamp-2">{r.setting}</div><div className="text-xs text-muted mt-1">{cycleSummary(r)}</div></Link></li>
            ))}
          </ul>
        ) }] : []),
```

Inside the Safety tab content, after `<ToxicityTable toxicity={e.toxicity} />`:

```tsx
          {agentById(e.id) && <p className="text-sm mt-3"><Link href={`/interactions/?drugs=${e.id}`} className="underline">Check interactions for {e.name} →</Link></p>}
          {/^(monoclonal antibody \(anti-pd|monoclonal antibody \(anti-ctla|bispecific antibody \(pd-1)/i.test(e.modality) && <p className="text-sm mt-1"><Link href="/irae/" className="underline">irAE management guide →</Link></p>}
```

### Cancer pages

In the cancer tab list (around line 520, the `care` tab), add a footer to the Standard of care tab content:

```tsx
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href={`/sequencing/${c.id}/`} className="underline">Lines of therapy by subgroup →</Link>
          {regimensFor(c.id).length > 0 && <Link href={`/regimens/?cancer=${encodeURIComponent(c.name)}`} className="underline">{regimensFor(c.id).length} regimens →</Link>}
          {guidelineCancerIds().includes(c.id) && <Link href={`/guidelines/${c.id}/`} className="underline">Guideline history and concordance →</Link>}
          <Link href={`/staging/#${c.id}`} className="underline">Staging and risk scores →</Link>
        </div>
```

(`/staging/#<cancerId>` anchors exist only for cancers with staging data; the link is harmless otherwise, or guard with the exported `stagingSystems`/`riskScores` arrays from `@/data/staging`.)

## 4. `src/components/TumorBoard.tsx`: read the matrix click-through

The biomarker matrix links to `/tumor-board/?cancer=<cancerId>&bm=<biomarkerId>` (repeatable `bm`). Add after the `useState` declarations:

```tsx
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const p = new URLSearchParams(window.location.search);
      const c = p.get("cancer");
      if (c && cancers.some((x) => x.id === c)) setCancer(c);
      const bm = p.getAll("bm").flatMap((s) => s.split(",")).filter((id) => biomarkers.some((b) => b.id === id));
      if (bm.length) setPicked(bm);
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only: the URL seeds state
  }, []);
```

and add `useEffect` to the React import. The `/regimens/?cancer=<name>` link in section 3 already works because `EntityBrowser` reads facet values from the URL.

## 5. `src/components/Tip.tsx`: optional column tips

`COLUMN_TIPS` entries used by the regimen table are passed explicitly via `tip`, so no change is required. If the labels are wanted globally:

```ts
  Emetogenicity: "Risk of vomiting without prophylaxis, by the most emetogenic component: high (>90%), moderate (30-90%), low (10-30%), minimal (<10%).",
  "G-CSF": "Whether growth-factor support is given from cycle 1: recommended above 20% febrile-neutropenia risk, consider at 10-20%.",
  Cycle: "How often a cycle repeats and how many are planned.",
```

## 6. `src/data/index.ts` and `src/lib/schema.ts`

No changes. All batch B data are side files validated against the graph at build time by their pages and tests:

| Data file | Validated by |
|---|---|
| `src/data/regimens.ts` | `validateRegimens()` in `src/lib/regimens.ts`, called by `/regimens/`; `src/lib/regimens.test.ts` |
| `src/data/guideline-versions.ts`, `src/data/guideline-map.ts` | `validateGuidelines()` in `src/lib/guidelines.ts`, called by `/guidelines/` |
| `src/data/staging.ts` | `validate()` in `src/app/staging/page.tsx`; `src/lib/staging.test.ts` |
| `src/data/interactions.ts` | `validateInteractions()` in `src/lib/interactions.ts`, called by `/interactions/`; `src/lib/interactions.test.ts` |
| `src/data/irae.ts` | `validate()` in `src/app/irae/page.tsx`; `src/lib/irae.test.ts` |

Future promotion (not done here): `guideline-map.ts` bodies could become `standardOfCare.guideline.nice` / `.asco` fields (GAPS item 11); `regimens.ts` could become a `regimen` kind.

## 7. `CHANGELOG.md` (Unreleased, Added)

```md
- Clinician power tools: regimen library with dose-schedule diagrams (`/regimens/`), biomarker-to-therapy matrix (`/biomarker-matrix/`), line-of-therapy sequencing per cancer (`/sequencing/`), guideline version diffs and NCCN/ESMO/NICE/ASCO concordance (`/guidelines/`), clinical calculators (`/calculators/`), staging and risk scores (`/staging/`), drug interaction checker (`/interactions/`) and an irAE management guide (`/irae/`).
```
