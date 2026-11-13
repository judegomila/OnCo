# Care protocols

How a part of cancer care is carried out, step by step: accessing a port, a drug leaking out of a vein, fever during
chemotherapy. The owner, 11 November 2026: "can we map protocols for all oncology related treatments so we can find
the best in class protocols eg putting on a mask on the patient and turning away for cleaning the port in breast
chemo. map ALL protocols for all situations and add to the database."

A protocol is a record of kind `protocol`, listed at `/protocols/` and rendered on its own page. It describes practice
that exists. A proposal to change practice is something else: an idea record tagged `protocol-upgrade`
(`src/data/spikes/protocol-upgrades-*.ts`), which a protocol links in `upgrades`.

The schema is `ProtocolSchema` in `src/lib/schema.ts`; the enums are in `src/lib/kinds.ts`; the rules below are
checked by `src/lib/protocols.test.ts` and, before a file is registered, by `scripts/check-protocol.ts`. The three
exemplars to copy are in `src/data/protocols/`:

- `implanted-port-access-and-care.ts` (vascular access)
- `chemotherapy-extravasation-management.ts` (giving chemotherapy, by agent class)
- `febrile-neutropenia-first-hour.ts` (emergencies, where NICE, SEOM and ASCO/IDSA disagree on the clock)

## The schema

Base fields as for every record (`id`, `name`, `tldr`, `summary`, `asOf`, `aka`, `simple`, the relation arrays), plus:

| Field | What it holds |
|---|---|
| `domain` | One of `PROTOCOL_DOMAINS`: vascular-access, chemotherapy-administration, oral-anticancer-therapy, hazardous-drug-safety, infection-prevention, emergencies, immunotherapy-toxicity, cell-therapy-toxicity, radiotherapy, surgery-perioperative, transfusion, supportive-care, symptom-management, nutrition, palliative, survivorship, screening-diagnostics, paediatric, pharmacy, consent-and-communication, other. The order is the order `/protocols/` groups them. |
| `setting` | `{ who, where }`: who carries it out (`PROTOCOL_ACTORS`: nurse, doctor, pharmacist, patient-or-carer, ...) and where (`PROTOCOL_PLACES`: chemotherapy-day-unit, ward, home, telephone-triage, ...). Both are filters on the index. |
| `population` | Who it applies to, as the sources scope it. Name the exceptions (children, transplant, neutropenic patients) rather than leaving them implied. |
| `trigger` | When it starts, where that is not obvious. |
| `steps` | Ordered. Each: `action` (a short imperative), `why` (plain English), `source` (a key in `sources`), `quote` (the source's sentence, verbatim), `grade` (as printed). A step no source states but all assume may carry `practice: "<why there is no citation>"` instead of `source`; no more than a quarter of the steps may. |
| `bestInClass` | `{ statement, sources }`: the version best supported now, and why. |
| `variants` | `{ name, differs, evidence, sources }`: the alternatives in use, what each does differently, and the evidence for it. |
| `grades` | `{ claim, grade, source, quote }`: the grade each source gives the key recommendations, quoted as printed. |
| `sources` | `{ key, label, publisher, year, url, doi, gradingScheme, read, accessed }`. `read` is `full-text`, `abstract`, `public-summary` or `not-reachable`. |
| `upgrades` | Ids of idea records tagged `protocol-upgrade` that would change this protocol. |
| `gaps` | What the sources do not settle, and what could not be read. |

Devices are technology records (`implanted-ports`, `picc-lines`): link them in `technologies`. Drugs a protocol is
about go in `drugs`, only where a source classifies them for this use (the extravasation exemplar lists the vesicants
its sources name; an antidote whose record describes a different use goes in `related`, not `drugs`).

## Where protocols appear

A record page lists the protocols that concern it, derived by rule in `src/lib/members.ts` (`protocolsFor`), never
from a typed list:

- any record a protocol names in its relation arrays: a drug lists its administration protocols, a device such as
  `implanted-ports` its care protocols, a glossary term the protocols filed under it;
- a cancer, as well, lists the protocols naming a cancer above it in the family, and those naming a medicine or
  technology the cancer's own record lists, with that treatment named as the reason, unless the protocol names
  other cancers only (breast radiotherapy positioning shares IMRT with prostate cancer and is not a prostate
  protocol). On the cancer page those reached through a treatment are one line per treatment, and only the ones
  naming the cancer keep a card. A treatment counts only where the protocol names it in its own `drugs` or
  `technologies` (not `related`), and a supportive medicine (tagged `supportive`, or a corticosteroid) brings only the
  supportive-care, symptom, nutrition, palliative and survivorship protocols: dexamethasone given as an antiemetic had
  put CRS and ICANS management on the triple-negative breast cancer page (`reachesThrough` in `src/lib/members.ts`).
  So a device a cancer's treatment depends on belongs in the cancer's own `technologies` (breast and bowel cancer list
  `implanted-ports`, which is how port care reaches their pages);
- a protocol that names no cancer and none of a cancer's treatments is general: it is on `/protocols/` and on the
  pages of what it does name, and is not repeated on every cancer page.

Three other places link protocols from data. A cancer's red cards (`src/data/red-flags.ts`) name the protocol that
manages each emergency in the set's `concernIds` (neutropenic sepsis links the first-hour protocol, cord compression
the MSCC protocol); the drug and modality sets have no link field yet. A first-60-days checklist item names the
protocols it is about in `protocols` (a fertility referral, a DPD test, port care). The side-effects page lists, for
each symptom group, the protocols in `SYMPTOM_PROTOCOLS` in `src/lib/side-effects.ts`: the general ones always, and a
treatment-specific one (immune-related colitis, irinotecan's diarrhoea) only beside the products the protocol names.

The reverse link is written at build time in `src/data/index.ts` (as for biomarker readouts), so no protocol is an orphan. So to put a protocol on the right pages, link the right records. Those protocols are then dropped from the page's
Connected section, which would otherwise list them twice.

## What counts as best in class

**The strongest current recommendation of a national or international guideline or standard**, read from the source
itself: the recommendation with the highest grade, from the most recent edition, from the body whose remit it is
(INS for infusion nursing, NICE or ESMO or ASCO for clinical management, CDC/HICPAC and SHEA/IDSA for infection
prevention, USP <800> and ISOPP for hazardous drugs, MASCC/ISOO for supportive care, ERAS Society for surgery,
ASTRO and RCR for radiotherapy, EBMT, FACT and ASTCT for cell therapy, SIOP and COG for children).

**Where guidelines disagree, state both**, with who holds each position and on what grade. Do not pick one because it
is the house view, because it is more cautious, or because it is more elaborate. The febrile neutropenia exemplar is
the model: NICE says "immediately" and sets no clock; ASCO/IDSA say within one hour of triage; SEOM within one hour of
arrival in the emergency department. All three are on the page.

Not best in class: a local hospital policy, however detailed; a textbook; a manufacturer's instructions where a
guideline covers the same ground (a label or SmPC is the right source for a dose or a schedule); something every
nurse "knows". Local policies may appear as **variants**, with their public URL, saying only what their text says.

## How fill agents source steps

1. **Read the source raw.** `curl -sL` into a new empty directory under `/tmp`, `pdftotext -layout` a PDF, grep the
   text. Never use a summarising fetch for anything load-bearing: AGENTS.md records one that invented a year and a
   phrase from a page containing neither.
2. **Resolve every DOI** through Crossref (`https://api.crossref.org/works/<doi>`) or Europe PMC and check the title
   before using the paper. A DOI remembered from training is usually a real paper and the wrong one.
3. **Quote character for character.** You may join line breaks and undo end-of-line hyphenation; nothing else. A
   quote is never shortened to read better and never edited for tone (HOUSE-STYLE.md). If a superscript or symbol
   mangles in the raw text, leave that figure out of the quote and state it in the prose.
4. **Quote the grade as printed** ("IA", "[IV, C]", "Level IV", "Recommend (weak), certainty B") and put the source's
   grading scheme in one line in `gradingScheme`. NICE does not grade recommendations: say so there rather than
   inventing a grade.
5. **A source you could not read is named, not paraphrased.** Add it with `read: "not-reachable"` if the page should
   show it exists, add a sentence to `gaps` saying what could not be read, and do not rest a step on it. Do not get
   round a paywall or a bot check: the INS Standards, the ONS guidelines and several ESMO PDFs refuse a script, and
   the page saying so is worth more than a remembered figure.
6. **Check the exact scope of a recommendation before writing it as a step.** The owner's example (a mask on the
   patient and the patient turning away while the port is cleaned) is exactly the kind of practice that is common,
   plausible and needs its source and its scope found: which standard says it, for which devices, for which part of
   the procedure, for which patients. If no standard you can read says it, the step is not a step: it is a variant
   (with the local policy that says it) or a gap.
7. Check the file with `npx tsx scripts/check-protocol.ts src/data/protocols/<file>.ts`, then add it to
   `src/data/protocols/index.ts`.

## Writing

UK spelling. No em or en dashes outside a `quote`. No "as of". The `name` is the subject ("Implanted port: access,
care and flushing"), never a question: Ask OnCo scores names, and a question-shaped name competes with the benchmark
questions. The `tldr` is for a patient or carer, the `summary` for a nurse or doctor, the `action` an imperative a
nurse could follow, the `why` a reason a patient could understand. Every page says that the reader's own team's
protocol comes first; the page is for understanding care, not for doing it at home.

## When the kind grows

`/protocols/` is a paged table: since 11 November 2026, when the fill rounds passed sixty protocols (`KIND_PAGE`),
`protocol` is in `PAGED_KINDS` in `src/lib/tables/kinds.ts`, so the page carries one page of rows and fetches the
rest. It carries ten rows rather than sixty (`kindPageSize`), and each row is light: the name with the first sentence
of its TL;DR, the domain as one pill, who and where as plain text (the toolbar and column headers filter them), and
the step count. On 11 November 2026 that measured 148 KB on a local dev server against the 121 KB ceiling in
`src/data/page-weight.json`; the site chrome, toolbar and domain strip weigh about 121 KB with no rows at all, so the
ceiling as pinned cannot be met by any table, and it waits for the owner (docs/MOBILE.md).

## One protocol, one record

Before writing, search for the subject (`grep -rn '<subject>' src/data/protocols`). Where a protocol already exists,
add the new source, step or variant to it. A protocol that differs by setting (adult and paediatric port care) may be
two records when the steps differ; link them in `related`.
