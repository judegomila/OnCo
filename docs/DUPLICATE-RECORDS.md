# Two ids, one thing: the merge rule

The corpus grows in two ways. An editor writes a record by hand, usually inside a cancer deep dive. A fetcher ingests
one from a registry or a literature API. Both reach the same studies and the same papers, and when they do the corpus
holds one thing twice, each copy with its own published URL, its own relations and its own reading.

The reviews of the triple-negative breast, colorectal and lung deep dives each found a batch of these and each
recorded it rather than fixing it, for three good reasons: retiring an id breaks a URL that is published and indexed,
other files key on the id, and merging fifteen records by hand is fifteen chances to lose a relation. This document is
the rule and the procedure that removes all three objections. The merge itself is one command.

## The rule

**One publication is one record. One registered study is one record.** A DOI, a PubMed id and a registry id each name
one thing in the world; two records carrying one of them are a mistake, not a nuance.

**The survivor is the record that carries the reading.** In practice that is almost always the curated one: a fetcher
writes the title, the journal, the DOI and the abstract, and says in its own caveats that no editor has read it. Where
both records were written by hand, the fuller one survives, measured on the reading (TL;DR, summary, "what it means",
findings, caveats), the relations and the links; `scripts/dedupe-survey.ts` prints that measure for both sides. Where
the ingest is the richer one, the ingest survives and the curated id is the one retired. The rule is about substance,
not about provenance.

**The retired record's unique fields move onto the survivor.** Relations, links, aliases and any scalar the survivor
lacks (a PubMed id, a participant count) are appended as a supplement in `src/data/merged-records.ts`, which
`src/data/index.ts` applies exactly as it applies a deep-dive supplement: arrays append and de-duplicate, scalars fill
gaps only. Nothing that pointed at the retired record loses its link.

**Tags do not move.** `tags` says where a record came from, and `europepmc-ingest` and `ctgov-ingest` set the
provenance weight in `src/lib/search-rank.ts`. A curated survivor that inherited the ingest's tag would be demoted in
search for having absorbed it.

**Findings and caveats do not move.** They are a second reading of one paper, and concatenating two readings is what
left three-finding papers with seven findings in the earlier merges. The survivor's reading stands; the retired one is
in the git history, and the merge prints it so a reviewer can see what went.

**The retired id becomes a redirect, never a deletion.** `vercel.json` gains
`{"source": "/key-papers/<retired>/:path*", "destination": "/key-papers/<survivor>/:path*", "permanent": true}`, and
`scripts/build-redirect-stubs.ts` writes `public/key-papers/<retired>/index.html`, because Vercel ignores the
`redirects` block for this static export and the stub works on any host. The pair stays in `MERGED_RECORDS` for good:
the redirect and the ratchet both read it.

## What a future agent must do instead of writing a second record

Before writing a paper record, look the DOI and the PubMed id up in the corpus. Before writing a trial record, look
the registry id up. If one is already there, **supplement it**: add your relations to the existing record through a
deep-dive `supplements` entry, and leave the id alone. A deep dive that keeps a "do not duplicate" list is not enough
protection; the lung molecular layer kept one and still minted three ids the evidence layer had also minted. Check by
identifier, across the whole corpus, not against a list.

The four fetchers that write paper records (`fetch-cited-papers.ts`, `fetch-trial-papers.ts`, `fetch-people-papers.ts`,
`fetch-idea-evidence.ts`) already do this check and reuse the existing record when it finds one, which is why almost
every pair here is a curated record written after an ingest rather than the other way round. Retiring the ingest id is
therefore safe from the fetcher's point of view: the next run matches the survivor by DOI and links to it.

Three tests in `src/lib/corpus-rules.test.ts` hold the line, and a new entry in any of their exception lists is a sign
that the rule was broken rather than that the rule needs an exception:

- no two paper records share a DOI or a PubMed id;
- no two trial records share a registry id, except two recorded pairs (below);
- every retired id redirects, has no record of its own, and names a survivor that exists.

A fourth, "no record references itself", catches the specific mess a careless merge leaves: a cross-link written
between two records for one thing becomes a link to self once they are one record.

## The procedure

1. **Survey.** `npm run -s dedupe` (`scripts/dedupe-survey.ts`) runs three passes over the whole corpus, not one deep dive: papers
   sharing a DOI, papers sharing a PubMed id, trials sharing a registry id, and near-duplicate names within a kind for
   the records that carry no identifier at all. For every group it prints each record's defining file, how much it
   carries and how many records point at it.
2. **Propose.** `npm run -s dedupe:plan` turns the identifier passes into a tab-separated plan of
   `survivor`, `retired`, `reason`, applying the rule above. Read it. The plan is a proposal, and the near-duplicate
   name pass is never automatic: two trials can share an acronym and two reviews can share a title.
3. **Merge.** `npm run -s dedupe:merge -- --plan <file.tsv>`, or
   `npm run -s dedupe:merge -- <survivor> <retired> "<reason>"` for one pair; `--dry` reports and writes
   nothing. It moves the fields, deletes the retired literal (leaving a one-line comment that says where it went),
   rewrites every remaining reference in `src`, `scripts`, `mcp` and `packages`, adds the redirect and records the
   pair. It reports anything it could not do rather than guessing.
4. **Stubs.** `npx tsx scripts/build-redirect-stubs.ts`.
5. **Snapshots.** `npx tsx scripts/prune-merged-snapshots.ts`. The fetched JSON under `public/` is keyed by record id
   too: `citations/index.json` has a test behind it (`src/lib/citations.test.ts`) and `openalex/papers.json` feeds the
   citation curve on a paper page. The script moves a retired id's entry onto its survivor, which is right because
   the two share a PubMed id and so share the count. The dated report snapshots (`audit.json`, `links.json`,
   `provenance.json`) are left to their own next run.
6. **Gates.** `npm run -s validate`, `npm run -s typecheck`, `npm run -s lint`, `npx vitest run`. Then
   `npm run -s ask:recall` before and after, and record the measurement in the table in `src/lib/ask.test.ts`:
   retiring a record changes what the search index holds.

### What the merge has to reach, and why a hand merge misses it

An id is not only a record. It is a key in `src/data/trial-registry-outcomes.ts` and
`src/data/trial-registry-status.ts`, in the simple-English files under `src/data/simple/`, in the translations under
`src/data/i18n/`, in `src/data/cited-paper-links-wave7.ts`, `src/data/trial-key-papers-wave1.ts` and
`src/data/person-papers-wave6.ts`, and a member of long id arrays on companies, drugs and cancer records. The script
handles each shape: a list entry becomes the survivor's id and de-duplicates if the list already names it; an object
key is renamed, or dropped where the survivor already has an entry of its own; a record is never left naming itself.

Two shapes it cannot always find on its own, and reports instead: a record whose id is written indirectly
(`id: SRC.tcga2012.paper`, resolved through the deep dive's source map, which it does handle) and a comment naming the
id in prose. Read the report at the end of a run.

## What was merged, 25 September 2026

80 pairs of paper records, across 78 DOI groups (two groups held three records each: the CAPP2 aspirin trial in Lancet
2020 and HERACLES in Lancet Oncology 2016). Of the 80 retired ids, 23 were fetcher ingests and 57 were second
hand-written records from a different deep dive or wave. The corpus went from 2,594 paper records to 2,514.

Two pairs of trial records: `nct02628067` into `keynote-158` and `nct04576156` into `impactmf`, the two the lung review
named and could not merge. Both retired ids were ClinicalTrials.gov ingests (`tags: ["ctgov-ingest"]`).

One pair of glossary terms, which only the name pass could find because neither carries an identifier:
`androgen-deprivation-therapy` into `adt`. Both records were called "Androgen deprivation therapy (ADT)" and both were
matched against the same words in rendered prose by `src/lib/term-hover.tsx`, so the reader met two glossary pages for
one idea; the retired record's aliases and links moved onto `adt`, and the same words now link to one page.

83 ids in all. The cross-links that three reviews wrote as a stopgap, so that two records for one paper at least
pointed at each other, are gone: they became links to self the moment the pair became one record.

## What was left, and why

**`roar` and `roar-atc`** share NCT02034110 and stay. They are two cohorts of one basket trial, biliary tract and
anaplastic thyroid, with different populations, different response rates and different approvals behind them. One
registration, two studies as a reader meets them.

**`i-spy-2` and `i-spy-2-2`** share NCT01042379 and stay. I-SPY 2.2 is a protocol version running under the I-SPY 2
registration, which its own summary states; the two carry different designs and different arms.

**Trials that share a title but not a registry id** stay: `nct06770439` and `nct07692750` (two IBI343 pancreatic
studies), `nct06212752` and `nct05722015` (subcutaneous pembrolizumab), `nct06191744` and `nct05409066` (subcutaneous
epcoritamab), `nct06223841` and `nct06581419` (IAP0971), `nct07744256` and `nct07480213` (dual-target CAR-NK in
small-cell lung cancer). Two registrations are two studies; the registry is the authority, not the title.

**`transform` and `transform-prostate`** share an acronym and nothing else: a lymphoma CAR-T phase 3 (NCT03575351) and
a UK prostate screening trial (ISRCTN13801649).

**`paper-hidalgo-pancreatic-cancer-review-nejm-2010` and `paper-kleeff-nat-rev-dis-primers`** are both called
"Pancreatic cancer" and are different reviews in different journals.

Nothing else. The name pass found one true duplicate outside the identifier passes, `androgen-deprivation-therapy`,
and it was merged; everything the pass still reports is in the list above, with its reason.
