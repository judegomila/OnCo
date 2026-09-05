# OnCo — the open map of oncology

A public, cited, editable knowledge graph of the war on cancer: every technology, target, product, company, institution, pathway, trial, pairing, roadmap, and idea, with one page per object, a plain-English TL;DR on every page, and derived backlinks so the graph is always consistent.

Live: https://onco-umber.vercel.app (see deployment notes below)

## What is in it

| Kind | Count | Examples |
|---|---|---|
| Cancers | 31 | Triple-negative breast cancer (deep spike), NSCLC, pancreatic, prostate, AML |
| Sections | 18 | Imaging, ADCs, Radiopharmaceuticals, Cell therapy, AI & computation |
| Technologies | 104 | PET/CT, TROP2 PET, bispecific ADC, in vivo CAR-T, FLASH RT, MCED |
| Targets | 60 | TROP2, HER2, PSMA, FAP, KRAS, PD-1, BRCA |
| Products | 93 | Trodelvy, Enhertu, Datroway, sac-TMT, Pluvicto, vepdegestrant, Galleri |
| Companies | 83 | Pharma, biotech, diagnostics, radiopharma, AI, devices |
| Institutions | 62 | Mapped and ranked; Newsweek 2026 and NCI designation as inputs |
| Pathways | 13 | PI3K/AKT/mTOR, RAS/MAPK, p53, DDR, PD-1 checkpoint, cGAS-STING, ER, AR, EMT |
| Terms | 60 | ADC vocabulary, endpoints, biomarkers, toxicities, regulatory |
| Trials | 37 | KEYNOTE-522, ASCENT-03/04, TROPION-Breast02, BL-B01D1-307, INTerpath-001, IMvigor011 |
| Pairings | 22 | ADC + IO, PSMA PET → RLT, cautions on ADC sequencing and TIGIT |
| Roadmaps | 9 | ADC generations, TROP2 ADC, TNBC, radiopharma, cell therapy, imaging, early detection, immunotherapy, KRAS |
| Ideas | 20 | Hypotheses with a proposed test and maturity grade |
| Collections | 30 | OncoKB, CIViC, cBioPortal, DepMap, ClinicalTrials.gov, NCI PDQ, Newsweek, Nature Index |

Counts are as of the first build (2026-09-04). Run `npm run validate` for the current numbers.

## The rules for facts

1. **Say when.** Every object carries an `asOf` date.
2. **Prefer a link to a remembered number.** Headline trial figures are quoted only when sourced on the page or in the linked trial record.
3. **Evidence tier is visible.** Approved / phase 3 / phase 2 / phase 1 / preclinical / concept, colour-coded everywhere.
4. **Ideas are labelled as ideas**, with a maturity grade and a proposed test.
5. **Unknown beats guessed.** Missing fields render as missing.
6. **No patient data.** Public information about technologies, products, organisations, and trials only.

## Run it

```bash
npm install
npm run validate   # schema + every cross-reference
npm test           # vitest
npm run dev        # http://localhost:3000 (builds the JSON API first)
npm run build      # static export to out/
```

## Layout

| Path | What |
|---|---|
| `src/lib/schema.ts` | Zod schemas for all 14 kinds. The source of truth. |
| `src/lib/graph.ts` | Loads and validates the corpus; derives backlinks and neighbourhoods. |
| `src/lib/ranking.ts` | The disclosed institution and university scoring formula. |
| `src/data/*.ts` | The corpus, one file per kind. Edit these. |
| `src/data/hub-ideas.ts` | 50 product/community ideas with status. |
| `src/app/` | Next.js App Router pages: `/[kind]/`, `/[kind]/[id]/`, `/for-me/`, `/universities/`, `/hub/`, `/about/`, `/api/`. |
| `scripts/build-api.ts` | Emits `public/api/v1/*.json` (gitignored, rebuilt on every build). |
| `docs/` | Design spec and notes. |

## Contribute

Each kind lives in one file under `src/data/`. Add or edit a record, include a source URL in `links`, run `npm test`, open a PR. Cross-references are validated at build time, so a typo in an id fails the build rather than producing a dead link.

Priorities are on the [50 ideas](https://onco-umber.vercel.app/hub/) page. The next cancer spikes after TNBC: pancreatic, NSCLC, prostate, glioblastoma.

## Not medical advice

OnCo is an orientation tool. It does not know your case. Decisions about diagnosis and treatment belong with you and your clinicians, using the primary sources linked from each page.

## Licence

Code: MIT (see LICENSE). Data in `src/data/`: CC BY 4.0 (see LICENSE-DATA). Attribute "OnCo (github.com/judegomila/OnCo)".
