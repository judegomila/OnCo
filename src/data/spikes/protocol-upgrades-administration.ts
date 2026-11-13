import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/*
 * Protocol upgrades found while writing the care protocols for giving chemotherapy, vascular access and hazardous drug
 * safety (protocol fill round, 11 November 2026). Each is a gap that a guideline itself names: a practice in use, or
 * recommended, whose effect has not been measured where it matters. Same shape and tiers as protocol-upgrades-care.ts:
 *   upgrade:promising  some clinical evidence, not yet settled;
 *   upgrade:untested   plausible or already in use, with the study that would settle it named in `test`.
 * Every statement below was read in the source beside it (full text unless marked abstract), and every DOI was resolved
 * through Crossref or Europe PMC. Adoption gaps are not stated where no survey measured them.
 */

const asOf = "2026-11-11";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });

const ASCO_ONS_2024 = doi("Siegel et al., Antineoplastic Therapy Administration Safety Standards for Adult and Pediatric Oncology: ASCO-ONS Standards (JCO Oncol Pract 2024)", "10.1200/OP.24.00216");
const COCHRANE_CSTD_2018 = doi("Gurusamy et al., Closed-system drug-transfer devices plus safe handling of hazardous drugs versus safe handling alone for reducing exposure to infusional hazardous drugs in healthcare staff (Cochrane Database Syst Rev 2018)", "10.1002/14651858.CD012860.pub2");
const ASCO_HD_2019 = doi("Celano et al., Safe Handling of Hazardous Drugs: ASCO Standards (J Clin Oncol 2019)", "10.1200/JCO.18.01616");
const SHEA_2022 = doi("Buetti et al., Strategies to prevent central line-associated bloodstream infections in acute-care hospitals: 2022 Update (Infect Control Hosp Epidemiol 2022)", "10.1017/ice.2022.87");
const NICE_HTG510 = { label: "NICE HealthTech guidance 510 (formerly MTG44): Curos for preventing infections when using needleless connectors (2019)", url: "https://www.nice.org.uk/guidance/htg510/chapter/1-Recommendations" };

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-video-second-check-safety-study", name: "Measure whether a video second check before chemotherapy at home is as safe as two nurses in the room", maturity: "early-clinical", actor: "clinic", cost: "small", horizonYears: 2,
    sections: ["chemotherapy"], tags: T("untested", "insufficient"),
    tldr: "Before chemotherapy is given, two trained staff check the drug, the dose and the patient. When treatment is given at home, the second person may now join by video. The 2024 US standards allow this but say no well-designed study has measured whether it is as safe.",
    summary: "The standard. The ASCO-ONS Antineoplastic Therapy Administration Safety Standards (2024) added a fourth verification at the patient's side and allow the second clinician to take part \"through appropriate institutionally approved video-enabled technology, with at least one person on site\".\n\nThe gap. The same document says that a review of remote verification found it \"is feasible and may be alike live two-person checks; however, no well-designed research has evaluated the impact on safety\", and cautions that reliance on technology can still lead to medication errors. Home administration is growing, so the number of checks done this way is likely to grow with it; how often it is used has not been measured.",
    hypothesis: "Video-enabled second verification at home detects the same proportion of planted and real discrepancies (wrong dose, wrong rate, wrong patient identifier, wrong administration set) as an in-person second check, without lengthening the visit.",
    rationale: "The fourth verification exists because drugs are now prepared away from where they are given. If the remote version misses errors that an in-person check catches, the safeguard is weaker exactly where supervision is thinnest.",
    test: "A simulation study with seeded errors comparing in-person and video second checks, followed by a prospective audit across home infusion services of discrepancies caught, near misses and errors reaching the patient under each method.",
    technologies: ["smart-infusion-pumps", "infusion-devices-vascular-access"], bottlenecks: ["b-care-fragmentation"],
    links: [ASCO_ONS_2024] }),

  idea({ id: "idea-upgrade-closed-system-transfer-device-outcome-trial", name: "A trial of closed-system transfer devices that measures staff exposure properly, not only surface wipes", maturity: "early-clinical", actor: "research", cost: "medium", horizonYears: 3,
    sections: ["chemotherapy"], tags: T("untested", "insufficient"),
    tldr: "Closed-system transfer devices are sealed connectors meant to stop chemotherapy escaping when it is prepared and given. US standards require them for giving hazardous drugs, but a Cochrane review found only weak observational studies and could not say whether they reduce staff exposure.",
    summary: "The evidence. The Cochrane review (2018) found 24 observational cluster studies in 359 hospitals and no randomised trials; all were at serious risk of bias, mostly in pharmacy staff, and mostly of one device. Very low certainty evidence was insufficient to show a difference in staff urine tests or surface contamination, and the authors wrote that \"no firm conclusions can be drawn\". They suggested multicentre randomised trials, or interrupted time series, measuring exposure to the drugs actually used and short-term health outcomes.\n\nThe standards. ASCO's safe handling standards (2019) rated the literature as low quality, noted that no standard test of device performance existed, and reported that USP chapter 800 requires the devices for nursing administration and recommends them for compounding. The devices add cost to every dose; adoption has not been measured by any source read.",
    hypothesis: "In chemotherapy day units, closed-system transfer devices used for all hazardous drug connections reduce the proportion of nurses with detectable cyclophosphamide or ifosfamide in urine, compared with standard connections plus PPE.",
    rationale: "A device required by a standard and paid for on every dose should be shown to reduce the exposure it is meant to prevent, in the staff group (nurses) where the evidence is thinnest.",
    test: "A cluster-randomised or stepped-wedge trial across chemotherapy day units, with nurses' urine drug levels and surface wipe contamination as outcomes, and cost per dose, using a performance-tested device.",
    technologies: ["closed-system-transfer-devices", "pharmacy-automation"], drugs: ["cyclophosphamide", "ifosfamide"], bottlenecks: ["b-workforce"],
    links: [COCHRANE_CSTD_2018, ASCO_HD_2019] }),

  idea({ id: "idea-upgrade-antiseptic-caps-for-long-term-lines-at-home", name: "Test antiseptic caps on the connectors of PICCs and tunnelled lines in people having cancer treatment at home", maturity: "early-clinical", actor: "research", cost: "small", horizonYears: 3,
    sections: ["chemotherapy", "supportive-care"], tags: T("promising", "moderate"),
    tldr: "An antiseptic cap that sits on the end of a line's connector between uses may lower infections. The evidence comes mostly from hospital wards and intensive care; for people with cancer who live at home with a PICC or tunnelled line for months, NICE found too little evidence and asked for research.",
    summary: "The evidence. The SHEA/IDSA/APIC compendium (2022) lists antiseptic-containing caps as an additional practice despite high-level evidence, because they are not considered superior to manual disinfection, and lists as unresolved whether the connector still needs scrubbing when a cap is used. NICE (HealthTech guidance 510, 2019) found the Curos cap promising but the evidence insufficient for routine NHS adoption, and recommended research that explores \"the use of Curos in people at high risk of infection, including those whose condition is managed in the community\".\n\nThe gap. People having cancer treatment through a PICC or tunnelled line at home are at high risk of line infection, and their lines are accessed by different nurses in different places; no trial read was done in that group.",
    hypothesis: "Antiseptic caps on needleless connectors of long-term lines in outpatients having anticancer treatment reduce catheter-related bloodstream infection compared with manual scrubbing alone.",
    rationale: "Caps take the step that depends on memory out of each access; the benefit should be largest where accesses are many and done by many hands.",
    test: "A randomised trial in adults with PICCs or tunnelled lines for anticancer treatment, caps plus manual scrub against manual scrub alone, with catheter-related bloodstream infection per 1,000 catheter days as the primary outcome.",
    technologies: ["needleless-connector-disinfecting-caps", "picc-lines"], terms: ["central-venous-access"], bottlenecks: ["b-toxicity-qol"],
    links: [SHEA_2022, NICE_HTG510] }),
];

export const protocolUpgradesAdministration: EntityInput[] = [...ideas];
