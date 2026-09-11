---
# Hugging Face dataset card for the OnCo corpus. Paste this file as README.md in the dataset repository and upload
# all.ndjson, the per-kind CSV files, schema.json and openapi.json from the matching GitHub release. Replace
# <version> and <doi> once the release is tagged and Zenodo has issued the DOI.
license: cc-by-nc-4.0
license_name: cc-by-nc-4.0
license_link: https://github.com/judegomila/OnCo/blob/main/LICENSE-DATA
language:
  - en
pretty_name: OnCo oncology knowledge graph
tags:
  - oncology
  - cancer
  - knowledge-graph
  - clinical-trials
  - drug-targets
  - medical
  - open-data
task_categories:
  - question-answering
  - text-retrieval
size_categories:
  - 1K<n<10K
configs:
  - config_name: all
    data_files: all.ndjson
---

# OnCo: a public, cited knowledge graph of oncology

OnCo (https://onco.cc) maps oncology as a linked corpus: cancers, fronts, technologies, targets, treatments and tests, companies, institutions, people, pathways, glossary terms, trials, pairings, roadmaps, ideas, collections, bottlenecks, key papers and journals. One record per object, each with a plain-English TL;DR, a technical summary, structured fields, the date the facts were last checked, links to primary sources, and relationship arrays that point at other records by id. Backlinks are derived, so the graph can be walked in either direction.

This dataset is the corpus exactly as published under https://onco.cc/api/v1/ at release `<version>`. Counts per kind are in `meta.json` and at https://onco.cc/about/; the release notes on GitHub print them.

**Not medical advice.** Facts are being built and checked in the open and may be incomplete, out of date or wrong. Verify at the primary source each record links before relying on anything.

## Files

| File | Contents |
|---|---|
| `all.ndjson` | Every record, one JSON object per line, with its site `route` |
| `<plural>.csv` | One kind per file (`cancers.csv`, `drugs.csv`, `trials.csv`, `key papers.csv` and so on). Scalars as-is, arrays joined with `; `, nested records as JSON in the cell. The first line is a licence comment. |
| `schema.json` | JSON Schema (draft 2020-12) of one record, generated from the Zod schema that validates the corpus at build time |
| `openapi.json` | OpenAPI 3.1 description of the live API the files come from |
| `meta.json` | Build date, counts per kind, licence, file list |

The live API also serves one Markdown context file per record (`/api/v1/context/<id>.md`), RDF N-Triples (`/api/v1/onco.nt`) and Atom feeds; see https://onco.cc/api/.

## Structure

Every record shares the base fields `id`, `kind`, `name`, `aka`, `tldr`, `summary`, `status`, `asOf`, `wikipedia`, `links`, `tags` and the relationship arrays `related`, `cancers`, `sections`, `technologies`, `targets`, `drugs`, `companies`, `institutions`, `pathways`, `terms`, `trials`, `people`, `bottlenecks`, `keyPapers`, `journals`, each holding ids. Kind-specific fields (for example `modality`, `mechanism`, `approvals` on treatments; `phase`, `nct`, `outcomes` on trials; `prevalence` on targets) are defined in `schema.json` and documented at https://onco.cc/schema/.

```python
import pandas as pd
df = pd.read_json("all.ndjson", lines=True)
drugs = df[df.kind == "drug"]
```

## Curation

Records are TypeScript files in the public repository (https://github.com/judegomila/OnCo, `src/data/`), validated by a Zod schema on every build: duplicate ids, dangling references and malformed records fail the build. Weekly workflows cross-check trial statuses against ClinicalTrials.gov, US labels against openFDA, and refresh literature counts from Europe PMC and research output from OpenAlex. A public audit page lists stale and contradictory records, a completeness page measures each kind against named external lists, and every factual correction is logged at https://onco.cc/corrections/. Named clinical review is a public queue and has not yet started; treat every record as unreviewed.

Upstream sources keep their own licences and are listed with cadence and terms at https://onco.cc/data-sources/: PubChem, RCSB PDB, Wikimedia Commons and Wikidata, OpenAlex, GLOBOCAN (IARC), ClinicalTrials.gov, Europe PMC, openFDA, DailyMed, FDA, EMA, NICE, the NCI cancer type and drug lists, and the publishers and institutions linked on each page. No patient-level or personal data beyond public professional profiles is included.

## Licence

The corpus (text, structure, curation and derived files) is copyright OnCo and its contributors and licensed under CC BY-NC 4.0: free for individual and educational use (personal, academic, charitable and other non-profit use) with attribution. Commercial use, for example inside a paid product, a commercial service, advertising-funded redistribution or a company's internal data pipeline, must contact OnCo and pay for the data (open an issue labelled "licensing" at https://github.com/judegomila/OnCo/issues or use the contact on https://onco.cc/about/). Facts themselves are not copyrightable; the licence covers OnCo's selection, arrangement, wording and derived files. Code is MIT.

Attribution: "Data from OnCo (onco.cc)" with a link to https://onco.cc.

## Citation

```bibtex
@dataset{onco_corpus,
  author    = {Gomila, Jude and {OnCo contributors}},
  title     = {OnCo corpus: a public, cited knowledge graph of oncology},
  year      = {2026},
  version   = {<version>},
  publisher = {Zenodo},
  doi       = {<doi>},
  url       = {https://onco.cc/api/}
}
```

The canonical citation metadata is `CITATION.cff` in the repository.
