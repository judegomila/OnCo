import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/**
 * Protocol upgrades written while closing the gaps left by the census of care protocols (16 November 2026). Same shape
 * and tags as ./protocol-upgrades-care.ts: one adoption tier, one evidence grade. Every figure is read from the source
 * beside it, and every DOI was resolved through Crossref or Europe PMC. UK spelling.
 */

const asOf = "2026-11-16";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });
// Sources.
const RASHIDI_2024 = doi("Rashidi et al., Interventions to mitigate cancer-related medical financial hardship: a systematic review and meta-analysis (Cancer 2024)", "10.1002/cncr.35367");
const CAFE_2025 = doi("Henrikson et al., Financial Navigation for People Newly Diagnosed With Cancer: primary outcomes from the Cancer Financial Experience randomized trial (JCO Oncol Pract 2025)", "10.1200/op-25-00874");
const ESMO_FT_2024 = doi("Carrera et al., ESMO expert consensus statements on the screening and management of financial toxicity in patients with cancer (ESMO Open 2024)", "10.1016/j.esmoop.2024.102992");
const COST_2017 = doi("de Souza et al., Measuring financial toxicity as a clinically relevant patient-reported outcome: the validation of the COST measure (Cancer 2017)", "10.1002/cncr.30369");
const DILAWARI_2021 = doi("Dilawari et al., Does Scalp Cooling Have the Same Efficacy in Black Patients Receiving Chemotherapy for Breast Cancer? (Oncologist 2021)", "10.1002/onco.13690");
const MINTA_2026 = doi("Minta et al., An interview-based qualitative study of scalp cooling, alopecia, and disparities in Black breast cancer patients (Support Care Cancer 2026)", "10.1007/s00520-026-10721-y");
const SC_WET_2023 = doi("Heibloem et al., Minimal added value of wetting hair before scalp cooling to prevent chemotherapy-induced alopecia in cancer patients: results from the Dutch Scalp Cooling Registry (Support Care Cancer 2023)", "10.1007/s00520-023-07687-6");
const PAXMAN_HAIRCARE = { label: "Paxman, Scalp cooling haircare guide (industry source: device manufacturer's patient website)", url: "https://coldcap.com/haircare/scalp-cooling-haircare-guide/" };

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-financial-navigation-targeted-by-screening-score", name: "Financial navigation offered to the people who screen worst for money trouble, rather than to everyone", maturity: "early-clinical", actor: "clinic", cost: "small", horizonYears: 3,
    sections: ["supportive-care"], tags: T("promising", "insufficient"),
    tldr: "Help with the money side of cancer has been tested by offering it to every new patient, and the largest trial found it made no difference. A pooled analysis suggests it does help the people whose questionnaire scores show the most financial strain. A trial that screens first and gives the help only to that group would settle whether targeting is the way to make it work.",
    summary: "The null trial. In the Cancer Financial Experience trial, 371 people newly diagnosed with any cancer at two US integrated health systems were randomised to brief or extended proactive financial navigation or to enhanced usual care, in which everyone received a list of financial assistance resources. At 12 months financial hardship and quality of life were similar in all three groups.\n\nThe signal. A 2024 systematic review found that financial worry improved in 27.3 per cent of 11 intervention studies. Its meta-analysis of four navigation studies (373 participants) found no significant pooled change in the COST score, but the change depended on the starting score, and the intervention significantly changed the score where it was 14.5 or lower before the intervention. COST runs from 0 to 44 and lower scores mean more financial toxicity.\n\nWhat guidance says. ESMO's 2024 consensus recommends a two-stage screen and counselling for those who screen positive, graded on low levels of evidence, and says the two-stage approach requires further validation.\n\nWhat is not known. The subgroup finding comes from four small studies and was not a randomised comparison. No guideline sets a cut-off score, and no trial read has randomised only people who screen positive.",
    hypothesis: "Among people starting cancer treatment who score 14.5 or lower on the COST measure, financial navigation or benefits advice improves the COST score and reduces cost-related missed medicines at six months, against a list of resources alone.",
    rationale: "Navigator and adviser time is scarce. If the benefit is concentrated in the people under most strain, screening first would put the service where it works and explain why a trial in all comers found nothing.",
    test: "A randomised trial that screens everyone with one question and then COST, and randomises only those at or below the cut-off to navigation or to a resource list, with the COST score and cost-related non-adherence as outcomes; run in more than one health system, with benefits advice as the intervention where bills are not the main cost.",
    technologies: ["financial-navigation"], terms: ["financial-toxicity"], bottlenecks: ["b-care-fragmentation"],
    related: ["idea-acc-financial-toxicity-screening-at-diagnosis"],
    links: [CAFE_2025, RASHIDI_2024, ESMO_FT_2024, COST_2017] }),

  idea({ id: "idea-upgrade-scalp-cooling-instructions-for-afro-textured-hair", name: "Scalp cooling preparation and hair care written for Afro-textured hair, tested in a trial", maturity: "speculative", actor: "research", cost: "medium", horizonYears: 4,
    sections: ["supportive-care"], tags: T("untested", "insufficient"),
    tldr: "Cold caps were tested mostly in people with straight hair, and the one study in Black patients stopped early because the cap was not saving hair. The advice on preparing Afro-textured hair conflicts: wet it thoroughly, or keep it dry and straighten it first. A trial comparing preparation methods, with care instructions written for this hair type, would show whether the cap can be made to work.",
    summary: "The problem. A phase II feasibility study of Paxman scalp cooling in Black patients having chemotherapy for stage I to III breast cancer planned 30 patients and closed after 15 for lack of efficacy; its authors name hair thickness, hair volume and cap design as possible reasons. The Dutch registry study that found little value in wetting the hair was mainly in people with a European hair type and a high hair mass, and its authors found no convincing evidence either way.\n\nThe conflicting advice. The manufacturer's guide tells people with curly and coily hair to make sure the hair is wet before the cap goes on and not to straighten or relax it. The authors of a 2026 interview study of 17 Black women write that women with natural hair should avoid excess wetting and instead straighten the hair and apply emollients, while noting the time, fatigue and heat damage this involves. Women in that study said the instructions and the conditioner supplied were not written for their hair and described their own changes, such as cutting the hair short or using gel.\n\nWhat is not known. No trial has compared any preparation method or hair care regimen during scalp cooling, in any hair type. Whether a different cap design matters more than preparation is also untested.",
    hypothesis: "In people with natural Afro-textured hair, a preparation method chosen to bring the cap close to the scalp, with hair care instructions written for that hair type, raises the proportion who keep enough hair to need no head covering compared with the manufacturer's standard instructions.",
    rationale: "The cap works only if the scalp gets cold enough, and dense or coiled hair holds the cap away from the skin. Preparation is cheap to change and is the part the patient controls, and the people it concerns were left out of the trials that set current practice.",
    test: "A randomised trial in Black patients starting taxane chemotherapy, comparing standard wetting with one or two defined alternatives, designed with hair stylists and patients, with scalp temperature under the cap as an early measure, hair kept as the main outcome, and hair breakage and matting recorded.",
    technologies: ["scalp-cooling"], terms: ["hair-loss-and-scalp-cooling-breast"], bottlenecks: ["b-trial-diversity"],
    related: ["idea-moon-hair-preservation-for-all"],
    links: [DILAWARI_2021, MINTA_2026, SC_WET_2023, PAXMAN_HAIRCARE] }),
];

export const protocolUpgradesCensusH: EntityInput[] = [...ideas];
