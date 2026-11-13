import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/**
 * Protocol upgrades written during the protocol fill round of 11 November 2026 (supportive care and survivorship,
 * second agent): fatigue, exercise, chronic pain and lymphoedema. Same shape and tags as ./protocol-upgrades-care.ts:
 * one adoption tier, one evidence grade. Every figure is read from the source beside it, and every DOI was resolved
 * through Crossref or Europe PMC. UK spelling.
 */

const asOf = "2026-11-11";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });
// Sources.
const PRECAUTIONS_2024 = doi("Current evidence on patient precautions for reducing breast cancer-related lymphedema manifestation and progression risks (Med Oncol 2024)", "10.1007/s12032-024-02408-3");
const SUMMIT_2024 = doi("Evidence-based recommendations regarding risk reduction practices for people at risk of or with breast cancer-related lymphedema: consensus from an expert panel (Med Oncol 2024)", "10.1007/s12032-024-02510-6");
const APTA_2020 = doi("Davies et al., Interventions for Breast Cancer-Related Lymphedema: Clinical Practice Guideline From the Academy of Oncologic Physical Therapy of APTA (Phys Ther 2020)", "10.1093/ptj/pzaa087");

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-evidence-based-arm-precautions-after-breast-cancer", name: "Replace blanket arm prohibitions after breast cancer with advice that matches the evidence", maturity: "early-clinical", actor: "clinic", cost: "small", horizonYears: 2,
    sections: ["supportive-care"], tags: T("promising", "moderate"),
    tldr: "Many people treated for breast cancer are told never to have blood pressure taken, blood drawn or an injection in the arm on the treated side, and to wear a sleeve when flying. A 2024 review of 37 studies found the evidence sufficient to refute many of these supposed risks; skin infection remains a real one. The change is to teach what is proven, drop what is not, and test that it does no harm.",
    summary: "The evidence. An evidence map prepared for the 2023 American Cancer Society and Lymphology Association of North America Lymphedema Summit searched Medline, CINAHL and Cochrane from 2008 to March 2023 for trauma, blood pressure measurement, skin puncture, temperature, air travel and behaviour change, and included 37 studies. It concluded that a 'just in case' approach to patient education may not be appropriate for people at risk of developing lymphoedema and that evidence is sufficient to refute many of the previously claimed risk factors, while evidence on progression once lymphoedema exists is scant. Cellulitis is described as an established risk factor.\n\nThe consensus. The summit's expert panel published updated risk-reduction recommendations covering prospective surveillance, education, exercise, blood pressure, skin care, skin puncture and blood draws, surgery, prophylactic compression, air travel and heat; OnCo read its abstract only. The APTA 2020 guideline already grades supervised progressive resistance training as safe (Grade A), reversing older advice to avoid lifting.\n\nWhat is not known. No randomised trial comparing the traditional precautions with evidence-matched advice was found in the sources read, and the evidence is weakest for people who already have lymphoedema. How many services still teach the blanket prohibitions has not been measured in any source read.",
    hypothesis: "Teaching evidence-matched risk reduction (skin care, prompt treatment of infection, exercise, surveillance) instead of blanket prohibitions on blood pressure readings, blood draws, injections and flying does not increase lymphoedema incidence at three years and reduces lymphoedema-related anxiety and restrictions on daily life and medical care.",
    rationale: "The traditional rules restrict venous access and blood pressure monitoring for years, worry people and are hard to follow, while the evidence behind most of them is weak or contrary. Skin infection is the precaution with the clearest support.",
    test: "A cluster-randomised non-inferiority trial across breast units of evidence-matched education against traditional precautions, with chronic lymphoedema at three years (by bioimpedance or volume) as the primary endpoint and fear of lymphoedema, avoidance behaviour and missed medical procedures as secondary endpoints.",
    technologies: ["lymphoedema-decongestive-therapy", "rejuv-measure-lymphoedema"], terms: ["breast-cancer-related-lymphoedema"], cancers: ["breast-cancer"], bottlenecks: ["b-survivorship"],
    related: ["idea-acc-lymphoedema-prospective-surveillance"],
    links: [PRECAUTIONS_2024, SUMMIT_2024, APTA_2020] }),
];

export const protocolUpgradesFillBody: EntityInput[] = [...ideas];
