# Corrections

Every factual correction to the OnCo corpus, newest first. Format: date · entity · what was wrong · how it was found · fix.

## 2026-09-07

| Date | Entity | What was wrong | How found | Fix |
|---|---|---|---|---|
| 2026-09-07 | [nhs-galleri](/trials/nhs-galleri/) | Trial summary said final results were pending; the trial had reported at ASCO 2026 (primary endpoint not met, stage IV incidence down ~14%). | Pipeline-intelligence review while writing the ASCO 2026 digest | [ac8b9f3](https://github.com/judegomila/OnCo/commit/ac8b9f3) |

## 2026-09-06

| Date | Entity | What was wrong | How found | Fix |
|---|---|---|---|---|
| 2026-09-06 | [ezh2](/targets/ezh2/), [epigenetic-drugs](/technologies/epigenetic-drugs/), [sarcoma](/cancers/sarcoma/) | Described tazemetostat (Tazverik) as approved in epithelioid sarcoma and follicular lymphoma. Ipsen withdrew it from all markets and indications on 9 March 2026 after SYMPHONY-1 showed excess secondary haematologic malignancies. | Companies-expansion review; verified against the [FDA alert](https://www.fda.gov/drugs/drug-alerts-and-statements/fda-alerts-health-care-providers-and-patients-about-increased-risk-new-blood-cancers-tazverik) and Ipsen's press release | [1d0eb06](https://github.com/judegomila/OnCo/commit/1d0eb06) |
| 2026-09-06 | [pubmed-europepmc](/collections/pubmed-europepmc/) | TL;DR was a two-word fragment that failed the readability check. | Automated test (`tldr` length) | [27e0eb6](https://github.com/judegomila/OnCo/commit/27e0eb6) |

## How corrections are logged

- Anyone can report an error via a GitHub issue or pull request.
- A correction entry names the entity, states precisely what was wrong, says how it was found (reader report, automated audit, fact-check job, congress update, reviewer), and links the fixing commit.
- The automated [audit](/audit/) and weekly registry fact-check surface candidates; only confirmed errors are logged here.
