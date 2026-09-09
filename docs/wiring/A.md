# Wiring for Improvements batch A: Patients and families

Everything in batch A ships as standalone routes, side data and components, so the site builds and every page renders without touching a shared file. The lines below are what the main session adds after merge so the work is reachable from navigation and from entity pages. Nothing here changes `src/lib/schema.ts` or `src/data/index.ts`: no batch A dataset is an entity array, so there is no spread to add; every id in the side data is checked with `graph().must()` at build time and by a vitest.

## 1. `src/lib/nav.ts`

Add these entries. Suggested positions are given; order is a judgement call.

Group `find` ("Start here"), after the Navigator entry:

```ts
{ href: "/prep/", label: "Appointment prep pack", blurb: "Tick the questions to ask for your cancer, add your own, and print or download one page for the appointment." },
{ href: "/side-effects/", label: "Side effects", blurb: "Start from the symptom: which treatments cause it, how often, and when to call." },
{ href: "/symptoms/", label: "Symptom to test", blurb: "Start from a worrying symptom: what it can mean, which test comes first, and the referral thresholds NICE and US guidelines state." },
{ href: "/report-reader/", label: "Report reader", blurb: "Type the values from a pathology report and read what each one means and changes, with glossary links. Nothing is stored." },
{ href: "/survivorship/", label: "Survivorship planner", blurb: "Late effects to watch for after each treatment, the screening test, how often, and the guideline that says so." },
```

Group `intel` ("News & evidence"), after the Evidence entry:

```ts
{ href: "/explained/", label: "Trials in plain words", blurb: "Every trial result as people out of 100, medians explained, surrogate endpoints flagged, and who the result applies to." },
```

Group `intel`, after "What the NHS offers":

```ts
{ href: "/assistance/", label: "Financial help", blurb: "Manufacturer programmes, reimbursement and generics by country and product, plus national schemes and charities." },
```

Group `who` ("Institutions & people"), after Institutions:

```ts
{ href: "/second-opinion/", label: "Second opinion", blurb: "Expert centres for your cancer in your country, the people who work on it, and how referral works where you live." },
```

`src/lib/sitemap-urls.ts` walks `src/app`, so all eight routes are already in the sitemap.

## 2. `src/components/EntityDetail.tsx` (item 4, trial explainer)

Import, near the existing `import { TrialOutcomes } from "./Pictogram";` (line 26):

```tsx
import { TrialExplainer } from "./TrialExplainer";
```

In the trial tabs (line 288), replace

```tsx
...(e.outcomes.length ? [{ id: "outcomes", label: "Outcomes", count: e.outcomes.length, content: <TrialOutcomes t={e} /> }] : []),
```

with

```tsx
...(e.outcomes.length ? [{ id: "outcomes", label: "Outcomes", count: e.outcomes.length, content: <div className="space-y-4"><TrialExplainer trial={e} /><TrialOutcomes t={e} /></div> }] : []),
```

`TrialExplainerInline` (`{ trial }`) renders the one-sentence primary result for cards or tables if wanted.

## 3. Optional wiring (no shared file required, but improves reach)

- Callers of `TrialFinderGeo` (Navigator, entity pages) may pass `drugNames={Object.fromEntries(g.kind("drug").map((d) => [d.id, d.name]))}` so eligibility criteria such as "prior trastuzumab" match profile ids exactly. Without it the component falls back to the id with hyphens replaced by spaces.
- `src/components/ExpertCentres.tsx` footer: add a link to `/second-opinion/`.
- `src/components/AccessTable.tsx`: add a link to `/assistance/`.
- The `survivorship-care-plan` technology page could link to `/survivorship/`; the CaregiverPanel "Bring to the appointment" block could link to `/prep/`.
- Home page `AUDIENCES` (patient card, `src/app/page.tsx`): candidates are `/prep/`, `/side-effects/`, `/symptoms/`.

## 4. Data added (side files; validated at build and by tests)

| File | Validated by |
|---|---|
| `src/data/side-effect-guidance.ts` | `src/lib/side-effects.test.ts` (every corpus symptom group has guidance) |
| `src/data/symptom-paths.ts` | `/symptoms/` page `graph().must()`; `src/lib/symptom-paths.test.ts` |
| `src/data/referral-routes.ts` | `src/lib/referral-routes.test.ts` |
| `src/data/survivorship.ts` | `/survivorship/` page `graph().must()`; `src/lib/survivorship.test.ts` |
| `src/data/assistance-schemes.ts` | `src/lib/assistance-schemes.test.ts` |
| `src/data/report-fields.ts` | `/report-reader/` page `graph().must()`; `src/lib/report-fields.test.ts` |
| `src/data/red-flags.ts` | `src/lib/red-flags.test.ts` (drug ids exist in graph) |

## 5. Follow-ups noted by the batch

- `src/data/symptom-paths.ts`: NICE NG12 recommendation numbers and ACS URL slugs deserve a link-check pass (`scripts/check-links.ts`, batch E).
- `src/data/referral-routes.ts` and `assistance-schemes.ts`: several official pages returned 403 to a scripted HTTP check (ssa.gov, hrsa.gov, copays.org, lls.org, cda-amc.ca); they are well-known pages but were not machine-verified. No prices or caps are quoted anywhere; the Medicare Part D cap is described qualitatively with a link.
- `src/lib/side-effects.ts` duplicates the `modalityClass()` classifier from `src/app/toxicity/page.tsx`; a later pass could lift it into `src/lib/text.ts`.
