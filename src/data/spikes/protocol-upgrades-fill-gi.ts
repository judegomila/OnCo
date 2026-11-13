import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/**
 * Protocol upgrades written during the protocol fill round of 11 November 2026 (supportive care and survivorship,
 * second agent): diarrhoea and nausea. Same shape and tags as ./protocol-upgrades-care.ts: one adoption tier, one
 * evidence grade. Every figure is read from the source beside it, and every DOI was resolved through Crossref or
 * Europe PMC. UK spelling.
 */

const asOf = "2026-11-11";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });

// Sources.
const CONTROL_2023 = doi("Barcenas et al., Final findings from the CONTROL trial: strategies to reduce the incidence and severity of neratinib-associated diarrhea in patients with HER2-positive early-stage breast cancer (Breast 2023)", "10.1016/j.breast.2022.12.003");
const NERLYNX_LABEL = { label: "NERLYNX (neratinib) US prescribing information, DailyMed (July 2026)", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d1e41dcf-e82a-47c2-a0ad-6c6eef621834" };

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-neratinib-two-week-dose-escalation-by-default", name: "Start neratinib at a lower dose and build up over two weeks, as the default", maturity: "being-tested-at-scale", actor: "clinic", cost: "small", horizonYears: 1,
    sections: ["supportive-care"], tags: T("promising", "moderate"),
    tldr: "Neratinib, a tablet for HER2-positive breast cancer, gives almost everyone diarrhoea, and many stop it early because of that. Starting at half the dose and building up over two weeks gave the least severe diarrhoea of any strategy tested, and the US label now allows it. The evidence comes from cohorts that were not randomised against each other, so a direct comparison is still owed.",
    summary: "The evidence. In the open-label phase II CONTROL trial, 563 people starting a year of extended adjuvant neratinib were enrolled into six cohorts in turn. Grade 3 or worse diarrhoea occurred in 31 per cent with scheduled loperamide alone, 28 per cent with budesonide added, 21 per cent with colestipol added, 33 per cent with colestipol and loperamide as needed, 27 per cent with a four-week dose escalation and 13 per cent with a two-week escalation (120 mg, then 160 mg, then 240 mg from week 3). Diarrhoea-related discontinuation was 20 per cent with loperamide alone and 3 per cent with the two-week escalation. Without any prophylaxis, in ExteNET, grade 3 diarrhoea occurred in 40 per cent.\n\nWhere it stands. The US label (July 2026) lists the two-week escalation as an alternative to 56 days of scheduled loperamide; its own table of the two CONTROL cohorts shows grade 3 diarrhoea of 32 against 13 per cent and discontinuation for diarrhoea of 18 against 3.3 per cent. Neither the label nor any guideline read prefers one strategy, and how often each is used has not been measured in any source read.\n\nThe doubt. The cohorts were sequential and compared with each other and with historical controls, not randomised; later cohorts may have benefited from teams' growing experience. Whether escalation affects how well neratinib prevents recurrence has not been tested, though the label's table shows similar median dose intensity in the two cohorts (234 and 230 mg a day).",
    hypothesis: "Starting neratinib with a two-week dose escalation and loperamide as needed, rather than full dose with 56 days of scheduled loperamide, halves diarrhoea-related discontinuation in the first three months without lowering dose intensity over the year.",
    rationale: "Diarrhoea is the commonest reason people stop neratinib early, and an early stop forfeits whatever benefit the drug offers. The escalation costs nothing, removes a demanding loperamide schedule, and is already within the label.",
    test: "A pragmatic randomised trial, or a registry-based randomised comparison, of two-week dose escalation against scheduled loperamide prophylaxis in people starting neratinib, with discontinuation for diarrhoea at three months as the primary endpoint and grade 3 diarrhoea, dose intensity and invasive disease-free survival as secondary endpoints.",
    drugs: ["neratinib"], cancers: ["breast-her2-positive"], technologies: ["her2-tyrosine-kinase-inhibitors"], bottlenecks: ["b-toxicity-qol"],
    links: [CONTROL_2023, NERLYNX_LABEL] }),
];

export const protocolUpgradesFillGi: EntityInput[] = [...ideas];
