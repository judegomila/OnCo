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
const TEMEL_STEPPED_2024 = doi("Temel et al., Stepped Palliative Care for Patients With Advanced Lung Cancer: A Randomized Clinical Trial (JAMA 2024)", "10.1001/jama.2024.10398");
const HUI_DELPHI_2016 = doi("Hui et al., Referral criteria for outpatient specialty palliative cancer care: an international consensus (Lancet Oncol 2016)", "10.1016/S1470-2045(16)30577-0");
const HUI_TIMELY_2022 = doi("Hui, Heung and Bruera, Timely Palliative Care: Personalizing the Process of Referral (Cancers 2022)", "10.3390/cancers14041047");
const ZIMMERMANN_STEP_2021 = doi("Zimmermann et al., Phase II Trial of Symptom Screening With Targeted Early Palliative Care for Patients With Advanced Cancer (J Natl Compr Canc Netw 2021)", "10.6004/jnccn.2020.7803");

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-stepped-palliative-care-for-advanced-cancer", name: "Stepped palliative care: one early visit, then more only when quality of life falls", maturity: "being-tested-at-scale", actor: "clinic", cost: "small", horizonYears: 3,
    sections: ["supportive-care"], tags: T("promising", "moderate"),
    tldr: "Guidelines ask for palliative care early in advanced cancer, but there are too few specialist teams to see everyone every month. In one randomised trial in advanced lung cancer, a single early visit followed by more visits only when a person's quality of life score fell gave quality of life no worse than monthly visits, with about half the appointments. It has not yet been tested in other cancers.",
    summary: "The trial. Temel and colleagues randomised 507 people diagnosed with advanced lung cancer in the previous 12 weeks, at three US academic centres between 2018 and 2022, to stepped or early palliative care. Stepped care was a first palliative care visit within 4 weeks, then visits only at a change in cancer treatment or after a hospital admission; quality of life was measured every 6 weeks and a fall of 10 points or more from baseline moved the person to visits every 4 weeks. Early care was a visit every 4 weeks from the start. At 24 weeks quality of life with stepped care was non-inferior (adjusted mean 100.6 against 97.8 on a 0 to 136 scale), with a mean of 2.4 visits against 4.7. Communication about end-of-life care was also non-inferior.\n\nThe doubt. Non-inferiority was not shown for days in hospice: an adjusted mean of 19.5 with stepped care against 34.6 with early care. The trial was in lung cancer, at academic centres, in a sample that was 84.6 per cent White.\n\nWhy it matters. The authors of the international referral criteria argue that palliative care resources are too scarce to see every patient with advanced disease from diagnosis, and a phase 2 study in Toronto found that screening symptoms at each oncology visit and offering palliative care to those who screen positive is feasible. Stepped care is a tested way of combining an early first contact with later contact by need. How many centres use it has not been measured in any source read.",
    hypothesis: "In adults with newly diagnosed advanced cancers other than lung cancer, stepped palliative care gives quality of life at 24 weeks that is non-inferior to monthly palliative care visits, with fewer visits, and with a step-up rule that also protects time in hospice care.",
    rationale: "A single early visit establishes the relationship and deals with the first symptoms; measuring quality of life at intervals finds the people who need more. Fewer visits per patient lets the same team reach more patients, which is the limit on early palliative care in most hospitals.",
    test: "A randomised non-inferiority trial of stepped against monthly palliative care in advanced gastrointestinal, breast and other cancers and outside academic centres, with quality of life at 24 weeks as the primary outcome and days in hospice or equivalent end-of-life care, hospital admissions in the last month of life and carer outcomes as key secondary outcomes.",
    technologies: ["palliative-care", "epro-symptom-monitoring"], terms: ["quality-of-life"], bottlenecks: ["b-palliative"],
    related: ["idea-acc-automatic-early-palliative-triggers"],
    links: [TEMEL_STEPPED_2024, HUI_TIMELY_2022, HUI_DELPHI_2016, ZIMMERMANN_STEP_2021] }),
];

export const protocolUpgradesCensusG: EntityInput[] = [...ideas];
