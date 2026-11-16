# Cross-links census, November 2026

Measured on 11 November 2026 over the corpus as `graph()` loads it at commit 33869ec89 (22,681 records on the live
site's `/api/v1/meta.json` that day). For each of eight pairs: the rule for a link that should exist, what exists
against it, the 20 worst examples, and what would close the gap as a derived rule rather than a typed list. The
measuring scripts were throwaway; each section states its rule precisely enough to rerun it. The repository holds
no page-view data, so where "worst" ranks by importance it uses incoming links, and says so.

Pairs 1 and 2 are the two the owner's coordinator recommended building first. Both are built in the pull request
that adds this file (`product/cross-links-2026-11`), and their sections give the numbers before and after.

## Summary

| # | Pair | Should exist | Exist today | Gap |
|---|---|---:|---:|---|
| 1 | Drug -> where it is available | 3,773 region rows for 539 approved medicines | 1,704 held (1,497 in the regional table); 0 drug pages linked a country page | 2,069 region rows; 11 of 77 WHO list medicines match no record by name |
| 2 | Trial -> place | 9,831 trial-country and 11,459 trial-institution pairs where a site is recruiting | Country: only automatic pages listed trials, by overall status; deep dives listed none. Institution: 16 of 11,459 pairs linked | 8,217 pairs on the 39 deep dives; 11,443 institution pairs |
| 3 | Side effect -> protocol -> red card | 259 distinct side effects | 136 reach a protocol; 68 complete the chain to a red card | 191 side effects without the full chain |
| 4 | Funder -> papers and trials | 179 trials whose sponsor is a funder record | 47 linked | 132 trials, 100 of them NCI's; no paper-level funder data in the repository |
| 5 | Person -> their trials | 489 pivotal person-trial links on strict evidence | 249 | 240 missing across 174 people |
| 6 | Glossary term -> mention in prose | 170,157 term mentions | 134,389 hovered or linked | 35,768 (21%), mostly a per-paragraph cap and unhovered fields |
| 7 | Idea <-> bottleneck <-> open question | 3,336 idea-bottleneck links; 89 question-idea links | 1,725 and 65 one-way; question-idea links shown on no idea page | 46 isolated ideas; no open question names a bottleneck |
| 8 | Test -> who pays, per country | 183 tests | 41 with any coverage fact (US 37, UK 9, every other country 0) | 142 tests (78%) |

One defect found on the way, outside these pairs (pair 6): the glossary hover matcher ignores case, so an
all-capitals alias matches an ordinary word. The term `hta` lists the alias "HAS" (France's Haute Autorité de
santé), and "has" is hovered as health technology assessment on 4,989 records; "must", "fit", "let", "beam" and
"doi" do the same on 304, 92, 87, 86 and 41. Matching an all-capitals alias only in capitals would fix it.

## 1. Drug -> country availability

### Rule

- **Medicines in scope.** Drug records with status `approved` that are not supportive care: 539.
- **Should exist.** For each, a sourced status in each of the seven regions the site tracks and the header's
  country switcher offers (United States, European Union, United Kingdom, China, Japan, Australia, India): 3,773.
- **Exists.** A row in `src/data/regional-approvals.ts`, or an entry in the record's own `approvals` naming that
  region (free-text region names such as "China", "Japan" and "Australia" mapped to the code).
- **Who pays.** A row in `src/data/coverage-uk.ts` (NICE, SMC), `src/data/coverage-us.ts` (Medicare), or a drug
  `access` row with a reimbursement line.
- **WHO Model List.** An item in `src/data/universe-lists/who-eml-cancer.json` (77 medicines, section 8.2, read
  4 November 2026) whose name equals the record's name or a recorded alias, accents and punctuation aside.
- **Country pages.** A country page that names the drug: the `drugs` list of each of the 26 data-driven deep dives
  and the `XX_DRUGS` lists of nine hand-built ones, 145 drug-country pairs.

### Counts

| Measure | Exists | Should exist |
|---|---:|---:|
| Region rows with an approval status, approved medicines | 1,704 | 3,773 |
| of which from the regional table alone (what drug pages showed before) | 1,497 | |
| Approved medicines with any payer fact in any country | 294 | 539 |
| WHO list medicines matched to a drug record by name | 66 | 77 |
| Drug pages linking to a country page that names the drug, before | 0 | 145 pairs |
| Drug pages linking to a country page that names the drug, after | 145 pairs | 145 |

The WHO list medicines with no match by name: asparaginase, calcium folinate (leucovorin calcium), dactinomycin,
pegylated liposomal doxorubicin, filgrastim, fluorouracil, goserelin, irinotecan, melphalan, paclitaxel and
prednisolone. Most are in the corpus under another name or as part of a regimen (fluorouracil inside FOLFIRINOX
and FOLFOX, for instance), so each needs either an alias on the record that exists or a record of its own; the
`npm run dedupe` survey should be run before writing any.

Region names are not consistent across records: "CN" and "China" (27 and 61 rows), "JP" and "Japan", and
"England (NICE)" used 66 times as an approval region when it is a funding decision. The new section reads both
spellings and treats NICE rows as who pays, not as approval.

### 20 worst

Approved medicines with an approval recorded in one region only, by incoming links (a stand-in for how often a
reader arrives at the page):

1. /drugs/prednisone/ (142 incoming links, 1 region, no payer)
2. /drugs/fludarabine/ (61, 1, none)
3. /drugs/daraxonrasib/ (44, 1, 2 payer facts)
4. /drugs/epirubicin/ (43, 1, none)
5. /drugs/trastuzumab-rezetecan/ (39, 1, 2)
6. /drugs/dacarbazine/ (38, 1, none)
7. /drugs/procarbazine/ (31, 1, none)
8. /drugs/guardant360-cdx/ (26, 1, none)
9. /drugs/mitoxantrone/ (25, 1, none)
10. /drugs/anastrozole/ (20, 1, none)
11. /drugs/her2-testing-assays/ (20, 1, none)
12. /drugs/iparomlimab-tuvonralimab/ (18, 1, none)
13. /drugs/therascreen-cdx/ (18, 1, none)
14. /drugs/zimberelimab/ (18, 1, none)
15. /drugs/artera-ai-prostate/ (16, 1, 2)
16. /drugs/triptorelin/ (16, 1, none)
17. /drugs/chlorambucil/ (15, 1, none)
18. /drugs/flutamide/ (14, 1, none)
19. /drugs/pucotenlimab/ (14, 1, none)
20. /drugs/glecirasib/ (13, 1, none)

The list is mostly old generic cytotoxics and hormones, approved everywhere decades ago and never entered in the
regional table, which was built from the newer branded products. A gap here reads as "not recorded", never as
"not approved": the section says so under the table.

### What closes it

Built: "Is this drug available in my country?" on every drug page that has any row (752 of 1,703 drugs), derived
from the five sources above in `src/lib/drug-availability.ts`. It replaces the seven-region strip, shows the
reader's own region first once they have chosen one in the header, names the regions with nothing recorded, and
links each country to its page. The remaining gap is data: fill the regional table for the 20 above from the
regulators' own registers (EMA, MHRA, PMDA, TGA), which `scripts/fetch-ema.ts` already reads for the EU.

## 2. Trial -> place

### Rule

- **Source.** The ClinicalTrials.gov capture behind `src/data/trial-participation.ts`: the same study snapshots,
  checked by the SHA-256 each trial record carries. 5,907 of the 5,974 registry ids on trial records were read; 45
  snapshots were missing and 13 were newer than the record, and those are skipped rather than mixed in.
- **Recruiting here.** A site whose own status is RECRUITING. The study's overall status is never used for a site.
- **Should exist.** A link from each trial to every country where it has a recruiting site (country pages are the
  only place pages; OnCo has no city pages), and to every institution record that is one of its recruiting sites.
- **Site is an institution.** In the same country and city, the site's name equals the institution's name or a
  recorded alias, or contains one of them (two words or more) as whole words; a trust, health board or network
  name matches only exactly, and a site two records would claim is left unmatched. `scripts/trial-sites.ts`.

### Counts

| Measure | Value |
|---|---:|
| Trial records | 6,521 |
| with a recruiting site anywhere | 2,944 |
| Recruiting sites placed in a country | 72,987 |
| Trial-country pairs with a recruiting site | 9,831 |
| of which on the 39 deep-dive countries, which listed no trials from the capture before | 8,217 |
| Institution records | 1,399 |
| with at least one recruiting trial by the rule | 474 |
| Trial-institution pairs by the rule | 11,459 |
| of which linked by a record field before (trial `institutions` or institution `trials`) | 16 |
| Recruiting sites whose name matched an institution | 12,646 of 73,318 |

The automatic country pages already listed trials with a site in the country, ordered by the study's overall
status, and their note said so. The 39 deep dives, which include every country with the most trials, listed only
hand-picked notable trials.

### 20 worst

Recruiting sites with no institution record matched, by the number of OnCo trials recruiting there (generic
sponsor placeholders such as "Research Site" left out). Six have a record the rule cannot see because the record
does not list the registry's name as an alias; the fix for those is an alias, not a new record.

1. Fujian Cancer Hospital, Fuzhou, CN: 85 trials
2. Hospital Universitari Vall d'Hebron, Barcelona, ES: 82
3. Harbin Medical University Cancer Hospital, Harbin, CN: 79
4. Massachusetts General Hospital, Boston, US: 78 (record `mgh` exists; alias missing)
5. Shandong Cancer Hospital, Jinan, CN: 70 (record `shandong-cancer-hospital` exists; alias missing)
6. Washington University School of Medicine, St Louis, US: 70 (record `wustl-siteman` exists; alias missing)
7. National Cheng Kung University Hospital, Tainan, TW: 68
8. Hospital Universitario Virgen del Rocío, Seville, ES: 66
9. SCRI Oncology Partners, Nashville, US: 63
10. The First Affiliated Hospital of Zhengzhou University, Zhengzhou, CN: 61
11. The First Affiliated Hospital of Nanchang University, Nanchang, CN: 58
12. Oregon Health and Science University, Portland, US: 58
13. Shanghai East Hospital, Shanghai, CN: 55
14. Virginia Cancer Specialists, Fairfax, US: 53
15. Taichung Veterans General Hospital, Taichung, TW: 52
16. Hubei Cancer Hospital, Wuhan, CN: 51
17. The Ohio State University Comprehensive Cancer Center, Columbus, US: 51 (record `osu-james` exists; alias missing)
18. West China Hospital of Sichuan University, Chengdu, CN: 50 (record `west-china` exists; alias missing)
19. Cleveland Clinic, Cleveland, US: 49 (record `cleveland-clinic` exists; alias missing)
20. The First Hospital of Jilin University, Changchun, CN: 48

Vall d'Hebron is written "Hospital Universitari Vall, d'Hebron" by the registry, with a stray comma; an alias
written that way is the honest fix.

### What closes it

Built: "Trials recruiting here" on every country page, automatic and deep dive (183 pages), and as a tab on the
474 institution pages with a match, derived in `src/lib/trials-here.ts` from `src/data/trial-sites.ts`, which
`scripts/build-trial-sites.ts` writes from the same capture with no network. Cities are a filter on the country
table rather than pages of their own. The remaining gap is aliases: adding the registry's spelling to the records
in the list above, then rerunning the script, links each of their trials without a typed list.

## 3. Side effect -> supportive-care protocol -> red card

### Rule

- **Side effect.** One distinct normalised `drug.toxicity[].event`: lower-cased, bracketed qualifiers removed, whitespace collapsed. It belongs to the symptom group that `symptomGroup()` in `src/lib/side-effects.ts` gives it.
- **Side effect -> protocol exists.** For at least one product carrying the event, `/side-effects/` shows a protocol for that row. That is the same decision `symptomProtocols()` makes: a `general` protocol for the group, or a `specific` one whose `drugs` or `technologies` name the product.
- **Should exist.** Every event should reach a protocol.
- **Protocol -> red card, linked.** A red-flag set in `src/data/red-flags.ts` names the protocol in `concernIds`. That is the only structured link from a red card to a protocol. Protocol pages (`ProtocolDetail.tsx`) and `/side-effects/` render no red cards.
- **Protocol -> red card, topical.** Some red-flag line, in any set, has a `symptom` that `symptomGroup()` puts in the same group as the protocol. This matching is approximate because it reads the first symptom a flag names.
- **Chain complete.** The event has a protocol, and either (linked) that protocol is named by a red-flag set, or (topical) a red-flag set that applies to one of the event's products (`redFlagsFor` plus the general set) has a line in the event's group.

### Counts

| Measure | Exists | Should exist | Share |
|---|---:|---:|---:|
| Toxicity rows (product, event) with a protocol shown | 667 | 960 | 69.5% |
| Distinct events with a protocol for at least one carrying product | 136 | 259 | 52.5% |
| Symptom groups with any entry in `SYMPTOM_PROTOCOLS` | 37 | 63 | 58.7% |
| Side-effect protocols named by a red card (`concernIds`) | 15 | 52 | 28.8% |
| Side-effect protocols with a topical red-flag line | 37 | 52 | 71.2% |
| Events with the full chain, linked | 68 | 259 | 26.3% |
| Events with the full chain, topical | 54 | 259 | 20.8% |
| Products with toxicity data and at least one row that has no protocol | 140 | 202 | |

- **Groups with no protocol at all.** 26 of the 63 groups have no protocol entry, covering 75 events. The largest by number of products are high blood pressure (21 products), heart rhythm/QT (14), blood chemistry (14), fluid retention (13), headache (9), breathlessness or cough (9), second cancers (9), constipation (6), bladder (6) and differentiation syndrome (6).
- **Groups with only specific protocols.** Another 16 groups have only `specific` (mostly irAE) protocols, so a non-immunotherapy product in them gets nothing. Examples are ALT rises on abemaciclib, ILD on osimertinib and trastuzumab deruxtecan, and hyperglycaemia on alpelisib.
- **Protocols with no red card either way (13):** `checkpoint-inhibitor-baseline-and-monitoring`, `irae-steroid-taper-and-pjp`, `irae-rechallenge`, `irae-haematological`, `icaht-prolonged-cytopenia`, `oral-mucositis-prevention-and-oral-care`, `nutrition-screening-and-support-during-cancer-treatment`, `hand-foot-syndrome-prevention-and-dose-modification`, `scalp-cooling-during-chemotherapy`, `infusion-reaction-management`, `premedication-before-reaction-prone-anticancer-drugs`, `drug-desensitisation-after-anticancer-hypersensitivity`, `irae-thyroid`.
- **Explicit links are cancer-scoped.** All 15 protocols with an explicit red card are named only by cancer-scoped sets (for example `tnbc-neutropenic-sepsis` or `lymphoma-crs-icans`). Those cards appear only on that cancer's page.

### 20 worst (events with no protocol, ranked by number of products carrying them)

1. hypertension, 21 products (High blood pressure): /drugs/asciminib/, /drugs/axitinib/, /drugs/bevacizumab/
2. headache, 9 (Headache): /drugs/acalabrutinib/, /drugs/blinatumomab/
3. hyperglycaemia, 8 (High blood sugar; irAE-only protocol): /drugs/alpelisib/, /drugs/capivasertib/, /drugs/enfortumab-vedotin/
4. oedema, 7 (Fluid retention): /drugs/adagrasib/, /drugs/amivantamab/, /drugs/belzutifan/
5. ALT increased, 7 (Liver; irAE-only protocol): /drugs/abemaciclib/, /drugs/eflornithine/, /drugs/lurbinectedin/
6. dyspnoea, 6 (Breathlessness or cough): /drugs/adagrasib/, /drugs/atezolizumab/
7. constipation, 6: /drugs/brentuximab-vedotin/, /drugs/datopotamab-deruxtecan/, /drugs/sacituzumab-govitecan/
8. QT prolongation, 6 (Heart rhythm): /drugs/adagrasib/, /drugs/ivosidenib/, /drugs/midostaurin/
9. differentiation syndrome, 6: /drugs/enasidenib/, /drugs/gilteritinib/, /drugs/ivosidenib/
10. arthralgia, 5 (Muscle or joint pain; irAE-only protocol): /drugs/encorafenib/, /drugs/fulvestrant/, /drugs/ibrutinib/
11. interstitial lung disease, 4 (irAE-only protocol): /drugs/abemaciclib/, /drugs/osimertinib/, /drugs/sotorasib/
12. hepatotoxicity, 4: /drugs/adagrasib/, /drugs/ponatinib/, /drugs/sotorasib/
13. hypokalaemia, 4: /drugs/dinutuximab/, /drugs/lutathera/, /drugs/quizartinib/
14. dysgeusia, 4: /drugs/nemtabrutinib/, /drugs/pylarify/, /drugs/talquetamab/
15. cough, 3: /drugs/atezolizumab/, /drugs/durvalumab/, /drugs/sotorasib/
16. upper respiratory infection, 3 (Infections; specific protocols only): /drugs/durvalumab/, /drugs/venetoclax/, /drugs/zanubrutinib/
17. atrial fibrillation/flutter, 3: /drugs/acalabrutinib/, /drugs/pirtobrutinib/, /drugs/zanubrutinib/
18. dry mouth, 3: /drugs/futibatinib/, /drugs/pluvicto/, /drugs/selpercatinib/
19. hyperphosphataemia, 3: /drugs/erdafitinib/, /drugs/futibatinib/, /drugs/pemigatinib/
20. transaminase elevation, 3: /drugs/gilteritinib/, /drugs/inotuzumab-ozogamicin/, /drugs/olutasidenib/

The most-linked products carrying an unprotocolled row (by incoming links) are:

- /drugs/cisplatin/ (nephrotoxicity)
- /drugs/paclitaxel/ (myalgia/arthralgia)
- /drugs/bevacizumab/ (hypertension, proteinuria, GI perforation, wound healing)
- /drugs/durvalumab/ (cough, URTI, dyspnoea)
- /drugs/trastuzumab-deruxtecan/ (ILD/pneumonitis, alopecia, constipation)
- /drugs/olaparib/ (MDS/AML, pneumonitis)
- /drugs/osimertinib/ (ILD, QTc)

### What would close it

- **Specific protocols.** Let a specific protocol apply by modality class or toxicity group as well as by named product. Then ILD on any ADC or EGFR inhibitor reaches a pneumonitis protocol, and a hair-loss protocol reaches every product whose alopecia row it covers.
- **Red cards.** Derive the red-card link from the symptom group: a red-flag set whose line falls in a protocol's group links that protocol, and the protocol page shows the card. The 37 topical matches then become 37 links rather than 15.
- **Candidate protocol.** `hepatic-dose-adjustment-of-anticancer-drugs` exists and mentions transaminases and bilirubin, but `SYMPTOM_PROTOCOLS` does not use it. Whether it fits the liver group needs a reading of the protocol itself.

## 4. Funder to papers and trials

### What funder data the repository holds

- **Papers: none at the paper level.** Paper records (`PaperSchema`) have no funder or grant field. The OpenAlex snapshots in `public/openalex/` (`research/*.json`, 705 institution files; `papers.json`; `countries.json`; `institutions.json`) carry works, citations, top works and top authors, and no `grants`, `funders` or `awards` key. The only paper-level funder information is prose: 343 paper records contain a funding sentence ("Funding: ...", "Funded by ...") in their summary, notes, findings or caveats.
- **NIH RePORTER: no snapshot.** RePORTER appears only as award links and figures hand-copied into company `funding` rounds (the SBIR/STTR monitor files `src/data/companies-monitors-2026-11-sbir-*.ts`). These tie NCI to companies, not to papers or trials.
- **Trials: sponsors, and funders for 55 trials.** 5,957 of 6,521 trial records carry a ClinicalTrials.gov `leadSponsor` (via `participation`); every trial has a free-text `sponsor`. Collaborator names are not kept, only `collaboratorCount`. The 55 trials with ISRCTN `alternateParticipation` have snapshots in `public/trial-participation/other/` whose `study.funders` list 83 funder names; 19 resolve to an OnCo record. The commonest unresolved names have no funder record in the corpus: Medical Research Council (9 occurrences across 3 spellings), National Institute for Health (and Care) Research (5 across 2 spellings), Health Technology Assessment Programme (3).

### Rule

A **funder record** is: an institution in the charity, foundation and grant-programme files (`donor-foundations`, `us-cancer-charities`, `uk-cancer-charities`, `rare-cancer-foundations-2026-11`, `nonprofits-from-companies`, `funding-programmes-gaps-2026-11`), or tagged `research-funding`, `funder`, `philanthropy`, `foundation`, `charity` or `hospital-charity`, or whose id is a row id in `src/data/funding.ts`, or a consortium whose name reads as a funder (foundation, fund, trust, charity, cancer research, cancer society, Wellcome and similar, excluding NHS bodies, hospitals, institutes and centres); otherwise any institution of type `government`; and companies of type `nonprofit` or `investor`. 497 records. The government group includes regulators and HTA bodies (FDA, EMA, NICE, MHRA), so its zero counts overstate the gap.

A link **should exist** between a funder and a trial when the trial's ClinicalTrials.gov lead sponsor, its `sponsor` text, or its ISRCTN sponsor or funder list resolves to the funder, through `resolveSponsor` in `src/data/sponsor-aliases.ts` or an exact normalised match on the funder's name or alias. As a second, weaker rule, a link should exist between a funder and a paper or trial whose own text names the funder (full name or an alias of eight characters or more, longest match wins) in a sentence about funding ("Funding:", "funded", "grant", "supported by", "financed by").

### Counts

| Funder group | Records | No linked paper or trial | Linked trials | Linked papers | Trial links that should exist (sponsor rule) | Exist | Missing |
|---|---:|---:|---:|---:|---:|---:|---:|
| Research funders (charities, foundations, grant programmes) | 263 | 246 | 45 | 17 | 51 | 25 | 26 |
| Government institutions | 160 | 107 | 48 | 118 | 128 | 22 | 106 |
| Nonprofit companies | 3 | 3 | 0 | 0 | 0 | 0 | 0 |
| Investors | 71 | 71 | 0 | 0 | 0 | 0 | 0 |
| **All** | **497** | **427** | 93 | 135 | **179** | **47** | **132** |

- 179 trial records have a lead sponsor or ISRCTN funder that resolves to a funder record; 132 of them (74%) are not linked to it. Evidence behind the missing pairs: CT.gov lead sponsor 99, `sponsor` text 114, ISRCTN funder list 14 (a pair can have more than one).
- Text-mention rule: 77 funder-to-record mentions across 27 funders (72 papers, 5 trials); 72 are unlinked (70 papers, 2 trials).
- Investors are expected to show zero here: they reach their portfolio through `company.investors`, not through papers or trials.

### 20 worst

Worst means the most missing links, sponsor-rule pairs and text-mention pairs added together; ties broken by the strength of the evidence (registry sponsor before prose).

1. `nci` National Cancer Institute, `/institutions/nci/`: 100 missing of 119 sponsor-evidenced trials (shows 31 trials), plus 19 unlinked papers whose funding sentence names it. Examples: `/trials/nct00450619/`, `/trials/nct06503146/`, `/trials/nct00923481/` (lead sponsor "National Cancer Institute (NCI)"); `/key-papers/paper-rxponder-n-engl-j-med-2021/`.
2. `cruk` Cancer Research UK, `/institutions/cruk/`: 24 missing of 44 sponsor-evidenced trials, plus 21 unlinked mentions. Examples: `/trials/nct06380816/`, `/trials/nct05770102/`, `/trials/nct05768178/`; `/trials/tnt/`; `/key-papers/paper-pan-n-engl-j-med/`.
3. `ncc-japan` National Cancer Center Hospital, `/institutions/ncc-japan/`: 5 missing of 8 (lead sponsor "National Cancer Center Hospital East" or "National Cancer Center, Japan"). Examples: `/trials/nct07591597/`, `/trials/nct06159478/`, `/trials/nct04465968/`.
4. `cancerfonden` Swedish Cancer Society, `/institutions/cancerfonden/`: 4 unlinked papers, no paper or trial linked. Examples: `/key-papers/paper-screentrustcad-dembrower-lancet-digit-health-2023/`, `/key-papers/paper-masai-lancet-digit-health-2025/`.
5. `gates-foundation`, `/institutions/gates-foundation/`: 1 sponsor-evidenced trial and 2 papers, none linked. `/trials/ken-she/` (sponsor "University of Washington / Bill & Melinda Gates Foundation"), `/key-papers/paper-barnabas-nejm-evid/`, `/key-papers/paper-sankaranarayanan-lancet-oncol/`.
6. `deutsche-krebshilfe`, `/institutions/deutsche-krebshilfe/`: 3 unlinked, one a trial. `/trials/acticca-1/`, `/key-papers/paper-marina-lancet-oncol/`.
7. `canadian-cancer-society`, `/institutions/canadian-cancer-society/`: 3 unlinked papers. `/key-papers/paper-villani-lancet-oncol/`, `/key-papers/paper-lumina-n-engl-j-med-2023/`.
8. `movember`, `/institutions/movember/`: 2 unlinked papers. `/key-papers/paper-therap-lancet-2021/`, `/key-papers/paper-therap-lancet-oncol-2024-update/`.
9. `yorkshire-cancer-research`, `/institutions/yorkshire-cancer-research/`: no links; ISRCTN funder of `/trials/foxtrot/`.
10. `ministry-of-health-malaysia`, `/institutions/ministry-of-health-malaysia/`: lead sponsor of `/trials/nct01086488/`, not linked.
11. `terry-fox-foundation`, `/institutions/terry-fox-foundation/`: `/key-papers/paper-villani-lancet-oncol/`.
12. `airc`, `/institutions/airc/`: `/key-papers/paper-tiacci-n-engl-j-med/`.
13. `mra` Melanoma Research Alliance, `/institutions/mra/`: `/key-papers/paper-qian-lancet-oncol/`.
14. `sarcoma-uk`, `/institutions/sarcoma-uk/`: `/key-papers/paper-seddon-lancet-oncol/`.
15. `inca`, `/institutions/inca/`: `/key-papers/paper-florence-duffaud-ann-oncol-2017/`.
16. `kwf` KWF Dutch Cancer Society, `/institutions/kwf/`: `/key-papers/paper-eortc-22922-lancet-oncol-2020-update/`.
17. `norwegian-cancer-society`, `/institutions/norwegian-cancer-society/`: `/key-papers/paper-nordicc-lancet-2026-update/`.
18. `world-cancer-research-fund`, `/institutions/world-cancer-research-fund/`: `/key-papers/paper-golestan-opium-cancer-lancet-glob-health-2020/`.
19. `eve-appeal`, `/institutions/eve-appeal/`: `/key-papers/paper-menon-lancet/`.
20. `pancreatic-cancer-action-network`, `/institutions/pancreatic-cancer-action-network/`: `/key-papers/paper-pishvaian-lancet-oncol/`.

### What would close it

Derive the funder-to-trial link at graph build from the registry lead sponsor and ISRCTN funder list, through the same `resolveSponsor` the /sponsors/ board already uses, so a funder page lists the trials it sponsors without anyone typing them; and give `PaperSchema` a `funders` id list filled from the paper's own funding sentence or from Crossref funder metadata, which would also expose the missing MRC and NIHR records.

## 5. Person to their trials

### Rule

A person **authored** a paper record when either (a) the paper's DOI is in the person's own `papers` list (curated, any author position), or (b) the paper's `authors` string ("Surname A, Surname B, et al.") contains the person's surname with a matching first initial. Under (b), position is recorded as first, last or other. Last author is almost never knowable: 2,446 of 2,828 paper records end the list with "et al.", and no pair matched as last author.

A paper **reports** a trial when the two are linked (paper `trials` or trial `keyPapers`) and the trial's id, name or alias appears as a whole token in the paper's id or name. A link alone is not enough: the first key paper of FLAURA2, MARIPOSA and ADAURA is FLAURA's 2018 paper, so `keyPapers[0]` is not a primary-paper marker.

A person **should link** to a trial they authored a report of. The headline uses phase 3 and 2/3 trials (pivotal); the all-phases figure is given beside it. "Strict" evidence is (a) or first-author (b); "loose" is (b) at any other position, which carries homonym risk for common surnames (Zhou C, Kim D).

`src/lib/trial-leadership.ts` and `TrialLeadership.tsx` do not derive this: they rank institutions by graph neighbours and never touch people. A person page shows trials only through hand-typed `people`/`trials` arrays. Today 424 of 1,627 people show at least one trial (638 links in all), and 474 show at least one paper record.

### Counts

| Evidence | Person-trial links that should exist | Exist | Missing | People affected |
|---|---:|---:|---:|---:|
| Phase 3 or 2/3, strict (DOI on person page, or first author) | 489 | 249 | 240 | 174 of 330 |
| Phase 3 or 2/3, strict and loose | 685 | 258 | 427 | 261 of 372 |
| Any phase, strict | 641 | 315 | 326 | 229 of 423 |
| Any phase, strict and loose | 941 | 327 | 614 | 350 of 489 |
| of which via DOI on the person's own paper list | 473 | 268 | 205 | 164 |
| of which first author only | 168 | 47 | 121 | 92 |
| of which other author position | 300 | 12 | 288 | 206 |

Principal investigators: there is no structured field. `scripts/trial-participation.ts` drops `overallOfficials` and `responsibleParty` from the ClinicalTrials.gov capture, and ISRCTN snapshots carry no investigator either. Only trial prose names one: 10 trial records name a principal or chief investigator; 7 of those people have a person record (all 7 linked); 3 have none: Matthew Krebs (`/trials/determine-trial/`), Tariq Ghafoor (`/trials/nct07689058/`), Abbas Khokhar (`/trials/nct07739654/`).

### 20 worst

Worst means the most missing person-trial links on strict evidence, then the most missing in total. Each line: person, trials shown today, missing (strict), examples.

1. `lu-shun`, `/people/lu-shun/`: shows 1, missing 10 (9). `aeneas`, `laura`, `adaura`, `checkmate-816` (all phase 3, DOI on the person page).
2. `cho-byoung-chul`, `/people/cho-byoung-chul/`: shows 1, missing 10 (7). `adriatic`, `flaura`, `pacific` (phase 3, DOI), `nct05060016`.
3. `enriqueta-felip`, `/people/enriqueta-felip/`: shows 0, missing 7 (6). `nct02486718` (IMpower010), `checkmate-816`, `crown`.
4. `zhou-caicun`, `/people/zhou-caicun/`: shows 3, missing 7 (5). `flaura` (DOI), `nct04538664` (first author), `capstone-1`.
5. `sibylle-loibl`, `/people/sibylle-loibl/`: shows 2, missing 6 (5). `ascent`, `katherine`, `olympia` (DOI), `aphinity` (first author).
6. `javier-cortes`, `/people/javier-cortes/`: shows 4, missing 6 (4). `ascent`, `keynote-522`.
7. `karim-fizazi`, `/people/karim-fizazi/`: shows 4, missing 6 (4). `vision` (DOI), `capitello-281`, `getug-13` (first author).
8. `georgina-long`, `/people/georgina-long/`: shows 3, missing 5 (4). `relativity-098`, `relativity-047`, `keynote-716` (first author).
9. `xu-binghe`, `/people/xu-binghe/`: shows 1, missing 4 (4). `destiny-breast03`, `destiny-breast04`, `natalee` (DOI).
10. `pasi-janne`, `/people/pasi-janne/`: shows 1, missing 4 (4). `nct03785249` (DOI), `destiny-lung02`, `nct04129502`, `nct01933932` (first author).
11. `ahn-myung-ju`, `/people/ahn-myung-ju/`: shows 1, missing 8 (3). `flaura`, `nct05060016` (DOI).
12. `im-seock-ah`, `/people/im-seock-ah/`: shows 0, missing 8 (3). `destiny-breast03`, `destiny-breast04`, `natalee`.
13. `park-yeon-hee`, `/people/park-yeon-hee/`: shows 0, missing 7 (3). `destiny-breast03`, `destiny-breast04`, `keynote-522`.
14. `kim-dong-wan`, `/people/kim-dong-wan/`: shows 1, missing 6 (3). `alta-1l`, `crown` (DOI), `nct03381274`.
15. `kim-tae-won`, `/people/kim-tae-won/`: shows 2, missing 6 (3). `codebreak-300`, `keynote-177` (DOI).
16. `fred-saad`, `/people/fred-saad/`: shows 1, missing 5 (3). `arasens` (DOI), `nct02257736`, `propel` (first author).
17. `zhang-li-sysucc`, `/people/zhang-li-sysucc/`: shows 1, missing 5 (3). `captain-1st` (DOI), `nct04687241` (first author).
18. `martine-piccart`, `/people/martine-piccart/`: shows 1, missing 4 (3). `ascent`, `olympia` (DOI), `mindact` (first author).
19. `pascal-hammel`, `/people/pascal-hammel/`: shows 0, missing 4 (3). `prodige-24` (DOI), `lap07`, `trybeca-1` (first author).
20. `wu-yi-long`, `/people/wu-yi-long/`: shows 2, missing 4 (3). `alina`, `nct03706690`, `nct04819100` (first author).

### What would close it

Derive person-to-trial links at graph build from authorship: a person whose own paper list holds the DOI of a paper record that reports a trial (paper and trial linked, trial named in the paper) gets that trial, and the first-author match on `authors` adds the rest with a homonym guard (same institution or cancer). Principal investigators need the registry `overallOfficials` name kept in the participation capture, which `scripts/trial-participation.ts` deliberately drops today, so that decision would need revisiting first.

## 6. Glossary term -> mention in prose

### Rule

- **Term.** A `term` record. Its mention patterns are:
  - its name without a trailing bracket, plus its bracketed abbreviation when that is not lower case;
  - its `aka`, with at least 3 characters (2 for the site's `SHORT_OK` list), not a number, and not in the site's own `STOP` list (read from `src/lib/term-hover.tsx` at run time).
- **Excluded patterns.** 576 aliases shared by two or more terms are dropped as ambiguous.
- **Matching.** Word-boundary matching with the site's own Aho-Corasick matcher (`src/lib/entity-matcher.ts`: no letter, digit or hyphen either side). An all-capitals alias of six characters or fewer counts only in capitals ("HAS", not "has").
- **Nested occurrences.** An occurrence inside a longer linked name for another record does not count, because the reader gets that link instead ("carcinoma" inside "hepatocellular carcinoma").
- **Prose fields.**
  - Hovered on the page: `summary` (split as `splitSummary` does), `notes` (not on cancers), paper `findings`/`whatItMeans`/`caveats`, bottleneck `causes`/`currentEfforts`, target `biology`/`whereFound`/`interventions`, technology `strengths`/`limitations`, company `programs`.
  - Plain text: `tldr`, `simple`, idea `hypothesis`/`rationale`/`test`, bottleneck `successLooksLike`, protocol `population`/`trigger`.
- **Linked on the page.** Any one of these:
  - `withTermHovers` marks it in a hovered field. The census replays `findMatches` with the site's patterns, the per-paragraph cap of 12 and `skipId`.
  - The record links the term in any relation field.
  - The term links the record, so it shows under Connected.
- **Gap.** A mentioned term that is not linked on the page.

### Counts

| Measure | Aliases included | Name and abbreviation only |
|---|---:|---:|
| Records with a term mention in prose | 22,126 of 22,895 | 17,249 |
| Records with at least one unlinked term | **12,055** (54.5%) | 7,355 |
| (record, term) mentions | 170,157 | 57,716 |
| ... linked on the page | 134,389 (79.0%) | 44,605 |
| ... not linked | **35,768** (21.0%) | 13,111 |
| Not linked: mentioned only in plain-text fields | 14,524 | 6,317 |
| Not linked: in a hovered field, cut by the 12-per-paragraph cap | 20,252 | 6,318 |
| Not linked: in a hovered field, a longer overlapping match won | 574 | 16 |
| Not linked: alias absent from the site's pattern set | 418 | 460 |

- **Main causes.** Nearly all of the gap is the per-paragraph cap and the plain-text fields. Matching itself rarely misses.
- **By kind (records with a gap / records with a mention):**
  - idea 1,123/1,233
  - protocol 175/190
  - target 1,426/1,708
  - cancer 432/474
  - pathway 103/109
  - biomarker 94/102
  - trial 2,818/6,502
- **Most-missed terms (records):**
  - chemotherapy-term 1,019
  - trial-lifecycle 895
  - biomarker 752
  - gene 722
  - cancer-stage 697
  - metastasis 675

**Wrong links the current hover makes (found while measuring).** The live matcher is case-insensitive, so a common English word that equals an all-capitals alias links to that term. Records where at least one such wrong link is rendered:

| Word in prose | Links to | Records |
|---|---|---:|
| "has" | /terms/hta/ (alias "HAS") | 4,989 |
| "must" | /terms/malnutrition-screening/ | 304 |
| "fit" | /terms/fit-test/ | 92 |
| "let" | /terms/linear-energy-transfer/ | 87 |
| "beam" | /terms/conditioning-regimen/ | 86 |
| "doi" | /terms/depth-of-invasion/ | 41 |
| "bed" | /terms/biologically-effective-dose/ | 34 |
| "CpG" | /terms/cambridge-prognostic-group/ | 21 |
| "pole", "smart" | POLE, SMART design | 11 and 8 |

- **"RAS".** The upper-case alias "RAS" on `rokitansky-aschoff-sinus` links every "RAS" in hovered prose to the gallbladder term (checked with `termMarks`). A further 24 records link it from "Ras" or "ras".
- **Checked on the live page.** The page payload of https://onco.cc/drugs/folfirinox/ (one request) contains a hover on the word "fit" pointing to /terms/fit-test/.
- **Effect on the counts above.** These wrong marks are counted as "linked", so the gap is if anything understated.

### 20 worst (most-linked records with an unlinked term; in-links, then unlinked terms, then examples)

1. /cancers/nsclc/: 2,125 in-links, 5 unlinked (immuno-oncology, chemotherapy-term, emergency-presentation, tumour-grade)
2. /cancers/colorectal/: 1,713, 13 (randomised-trial, pragmatic-trial, resection-margins, rokitansky-aschoff-sinus via "RAS")
3. /technologies/checkpoint-inhibitor/: 1,662, 8 (braf-v600-mutation, limited-extensive-stage, metastasis)
4. /cancers/prostate/: 1,427, 7 (cancer-stage, relapse-recurrence, pten-loss)
5. /technologies/cytotoxic-chemotherapy/: 1,376, 8 (de-escalation, cell-cycle, remission)
6. /cancers/pancreatic/: 1,159, 11 (targeted-therapy-term, os, relapsed-refractory, partial-response)
7. /cancers/breast-hr-positive/: 1,049, 4 (relapse-recurrence, progressive-disease, gene-expression)
8. /technologies/kinase-inhibitors/: 1,026, 1 (enzyme)
9. /cancers/breast-cancer/: 931, 6 (screening, radiotherapy, genomic-profiling, remission)
10. /cancers/metastatic-cancer/: 883, 2 (sbrt-term, remission)
11. /drugs/pembrolizumab/: 866, 5 (sarcomatoid-rcc, os, platinum-sensitivity, neoantigen)
12. /cancers/melanoma/: 829, 4 (resectability, de-escalation, rna, trial-phases)
13. /cancers/tnbc/: 818, 10 (first-line, trial-phases, hereditary-cancer-syndromes, mutation)
14. /cancers/ovarian/: 768, 6 (relapse-recurrence, first-line, ctcae-grading, pd-l1-testing)
15. /cancers/rectal-cancer/: 705, 2 (partial-response, ctdna)
16. /cancers/non-hodgkin-lymphoma/: 686, 7 (immune-endocrinopathy, bone-marrow, staging-systems)
17. /technologies/adc/: 686, 4 (tki-term, genomic-profiling, protein, inflammation)
18. /cancers/head-and-neck/: 672, 6 (first-line, chemotherapy-regimen, trial-lifecycle, efs)
19. /cancers/dlbcl/: 658, 14 (tp53-mutated, cancer-stage, fish, gene)
20. /cancers/gastric/: 623, 3 (trial-lifecycle, landmark-survival, first-line)

By count of unlinked terms, the worst are:

- /terms/pancreatic-failed-programmes/ (27)
- /targets/myc-gene/ (26)
- /cancers/neuroblastoma-high-risk/ (22)
- /pathways/nsclc-signalling/ (21)
- /trials/herizon-btc-01/ (20)

### What would close it

- **Coverage.** Make the hover cap page-wide rather than per paragraph: first mention on the page, with no limit per paragraph. Route `tldr`, `simple` and the idea fields through `withTermHovers` as well. Those two changes cover 34,776 of the 35,768 gaps.
- **Separate fix.** Match an all-capitals alias only in capitals. That removes the 4,989-record "has" link and its siblings.

## 7. Idea <-> bottleneck <-> open question

### Rule

- **Fields.**
  - Ideas link bottlenecks through `bottlenecks`.
  - Bottlenecks can hold idea ids only in `related` (or the other free relation arrays).
  - Open questions (`src/data/open-questions.ts`, not records) name ideas and bottlenecks in `refs`.
- **One-way.** A link is one-way when A names B and B does not name A in any relation field.
- **Open questions.** Nothing can name a question, so for questions "the reverse" means the idea or bottleneck page shows the question. Pages show only `questionsFor(e.id)`, which keys on `subject`, and every subject is a target or technology.
- **Isolated.** A record with no link to or from the other two kinds.

### Counts

| Link | Total | Reciprocated in the other record's fields | One-way | Reverse rendered on the page anyway |
|---|---:|---:|---:|---|
| idea -> bottleneck (`bottlenecks`) | 2,498 | 773 | **1,725** | yes, the bottleneck page lists ideas by backlink ("Ideas to fix it") |
| bottleneck -> idea (`related`) | 838 | 773 | **65** | only under Connected; the idea's "Bottlenecks it attacks" reads its own field and misses them |
| open question -> idea (`refs`) | 89 (80 ideas) | n/a | **89** | no, 0 idea pages show the question |
| open question -> bottleneck | **0** of 57 questions | | | |

| Isolation | Count |
|---|---:|
| Ideas | 1,254 |
| Ideas with no bottleneck either way | 54 |
| Ideas with no bottleneck and named by no question (isolated) | **46** |
| Bottlenecks with no idea and no question | 0 of 55 |
| Open questions naming neither an idea nor a bottleneck | 7 of 57 (`pd1-neoadjuvant-standard`, `esr1-ctdna-switch`, `alk-fourth-gen`, `braf-crc-first-line`, `bcl2-fixed-duration`, `met-amplification-definition`, `adc-ild-mechanism`) |
| Question -> idea refs where the idea and the question's subject link each other | 79 of 89 |

- **Which bottlenecks lean hardest on backlinks.** Ideas pointing in without being named back:
  - b-toxicity-qol 111
  - b-global-access 90
  - b-trial-design 90
  - b-incentive-misalignment 74 (names 1 idea)
  - b-knowledge-diffusion 74
  - b-funding-allocation 45 (names 2)
- **Ideas named by the most questions:** /ideas/idea-payload-switching/ is named by three questions and shows none of them.

### 20 worst (isolated ideas: no bottleneck, no question; ranked by in-links)

1. /ideas/idea-mfbg-pet-replaces-mibg/ (6 in-links)
2. /ideas/idea-post-neoadjuvant-adc/ (6; being tested at scale)
3. /ideas/idea-adc-for-mesothelioma/ (4)
4. /ideas/idea-chemo-free-hodgkin/ (4)
5. /ideas/idea-hpv-ctdna-cervical/ (4)
6. /ideas/idea-microbiome-io-fmt/ (4)
7. /ideas/idea-urine-ctdna-surveillance/ (4)
8. /ideas/idea-cd30-car-t-hodgkin/ (3)
9. /ideas/idea-cthpv-adapted-deescalation/ (3)
10. /ideas/idea-chronotherapy-immunotherapy/ (3)
11. /ideas/idea-her2-adc-serous-endometrial/ (3)
12. /ideas/idea-hcc-io-before-transplant/ (3)
13. /ideas/idea-molecular-class-adjuvant-endometrial/ (3; being tested at scale)
14. /ideas/idea-senolytics-after-chemo/ (3)
15. /ideas/idea-mtap-prmt5-mesothelioma/ (3)
16. /ideas/idea-her2-adc-sequencing-payload/ (3)
17. /ideas/idea-net-antagonist-ligands/ (3)
18. /ideas/idea-ecdna-targeting/ (2)
19. /ideas/idea-caix-theranostics/ (2)
20. /ideas/idea-drugging-myc/ (2)

### What would close it

- **Pages.** Have the idea page list the open questions whose `refs` name it, and the bottlenecks whose `related` name it. Both are a derived backlink like the one the bottleneck page already uses.
- **Questions.** Give each open question the bottleneck its stage implies, through the ideas it names (an idea's bottlenecks become the question's).
- **Isolated ideas.** Infer the 46 isolated ideas' bottlenecks the same way from the bottlenecks of ideas sharing their cancers and technologies, then review them, rather than writing a list by hand.

## 8. Test -> who pays, per country

### Rule

- **Test.** A `drug`-kind record that `productClass()` (`src/lib/product-class.ts`) classes as `test`. This is the site's own rule and covers the records from `tests.ts`, `mced-census-tests.ts`, `tests-cdx-devices.ts` and the rest. Test technologies (classes of test) are counted separately below.
- **A coverage fact for a country, in three tiers:**
  - **Structured.** US: a row in `coverageUs`. UK: a row in `coverageUk`, a UK pathway funding row (`UK_PATHWAYS[].funding[].refs`) naming the id, or a UK pathway test row naming the test by name or alias with word boundaries.
  - **Stated.** One sentence of the test's own `tldr`, `summary`, `notes` or link labels names that country's payer and a coverage verb (cover, fund, reimburse, commission, recommend, list, pay, bill). Acronyms are case-sensitive. A `cms.gov`, Palmetto MolDX or `nice.org.uk/guidance` link also counts.
  - **Payer link.** A relation to a payer record: `cms`, `medicare-*`, `nhs-*`, `g-ba-*`, `gkv-*`, `has-france`, `chuikyo`, `cda-amc`, `aifa`, `nhsa`, `nhso-*`.
- **Negative and unknown statements count.** "Medicare does not cover it" and "Not confirmed: Medicare coverage" are recorded facts. Of the 37 US tests counted, 4 are named gaps ("not confirmed") and 1 is a stated refusal.

### Counts (183 tests)

| Country | Structured | Structured or stated | Including payer link |
|---|---:|---:|---:|
| United States (Medicare, MolDX, NCD, commercial) | 4 | 37 | 37 |
| United Kingdom (NICE, NHS, SMC, test directory) | 8 | 9 | 9 |
| Germany (G-BA, GKV, EBM) | 0 | 0 | 0 |
| France (HAS, Assurance Maladie, RIHN) | 0 | 0 | 0 |
| Japan (Chuikyo, MHLW) | 0 | 0 | 0 |
| Australia (MBS, MSAC, PBS) | 0 | 0 | 0 |
| Canada (CDA-AMC, Ontario Health) | 0 | 0 | 0 |
| Any other country | 0 | 0 | 0 |
| **Any country** | | **41** | 41 |
| **No coverage fact anywhere** | | **142** (77.6%) | 142 |

- **Structured tables are mostly medicines.** `coverageUs` holds 269 rows and `coverageUk` 288, but only 4 of each are tests: artera-ai-breast, artera-ai-prostate, foundationone-cdx and shield.
- **UK pathway pages.** The UK test rows name EndoPredict, MammaPrint, Oncotype DX and Prosigna. No UK funding row names a test id.
- **No payer links.** No test record links any payer record. The 16 Medicare NCD terms in `payers-gaps-2026-11.ts` link to technologies (low-dose CT, FDG-PET, mammography, PSA, HPV testing, CA-125, CA 19-9), not to named tests. NCD 90.2, the NGS NCD, is cited only in the FoundationOne CDx row of `coverage-us.ts` and has no record of its own.
- **Test technologies.** 44 technologies have a test-like name and the diagnostics or early-detection section. 12 carry any coverage statement or payer link (UK 9, US 4, other 1). Among those with none, the most-linked are:
  - /technologies/liquid-biopsy/ (552 in-links)
  - /technologies/mrd-testing/ (344)
  - /technologies/rna-seq/ (165)
  - /technologies/functional-drug-testing/ (78)
  - /technologies/hrd-testing/ (33)
- **Tests with no page at all.** 4 of the 41 rows in `src/data/assays.ts` have no test record, so they have no page that could carry who pays. All 33 `TUMOUR_TESTS` rows have one.

### 20 worst (tests with no coverage fact in any country, ranked by in-links; key papers in brackets)

1. /drugs/guardant360-cdx/: 26 in-links [2 papers]
2. /drugs/her2-testing-assays/: 20 [3]
3. /drugs/therascreen-cdx/: 18 [2]
4. /drugs/oncomine-dx-target-test/: 15 [0]
5. /drugs/ventana-pd-l1-sp142/: 12 [2]
6. /drugs/tempus-xt-cdx/: 12 [1]
7. /drugs/ventana-mmr-rxdx/: 11 [3]
8. /drugs/caris-mi-cancer-seek/: 10 [2]
9. /drugs/decipher-prostate/: 10 [0]
10. /drugs/trusight-oncology-comprehensive/: 10 [0]
11. /drugs/mychoice-cdx/: 9 [3]
12. /drugs/dako-pd-l1-22c3-pharmdx/: 9 [2]
13. /drugs/cancerguard/: 8 [3]
14. /drugs/overc-mcdbt/: 8 [2]
15. /drugs/cobas-hpv/: 7 [0]
16. /drugs/bracanalysis-cdx/: 6 [2]
17. /drugs/spot-mas/: 6 [2]
18. /drugs/gagome-mced-test/: 6 [1]
19. /drugs/avantect-mcd/: 6 [0]
20. /drugs/cobas-egfr-mutation-test/: 6 [0] (tied at 6 with /drugs/shield-mcd/ and /drugs/thinprep/)

### What would close it

- **Make coverage a field.** Give a test a structured per-country coverage row, like the medicine rows in `coverage-us.ts` and `coverage-uk.ts`. Derive the row's candidates from the test's class: an FDA companion diagnostic run as tissue NGS points at NCD 90.2, a tumour-profiling test in breast cancer at NICE HTG719. Each row is then confirmed or written as "not confirmed" from the payer's own page, never inferred.
- **Wire the NCD records.** Link the NCD and payer records to the tests they govern, so the backlink shows who pays on the test page.
