import type { EntityInput, IdeaInput } from "@/lib/schema";
import type { EvidenceGrade } from "@/lib/complementary";

/**
 * Protocol upgrades written during the protocol fill round of 11 November 2026 (supportive care and survivorship,
 * second agent): skin, hair and eyes. Same shape and tags as ./protocol-upgrades-care.ts: one adoption tier, one
 * evidence grade. Every figure is read from the source beside it, and every DOI was resolved through Crossref or
 * Europe PMC. UK spelling.
 */

const asOf = "2026-11-11";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });
type Tier = "proven-unevenly-used" | "promising" | "untested";
const T = (tier: Tier, grade: EvidenceGrade, extra: string[] = []) => ["protocol-upgrade", `upgrade:${tier}`, `evidence:${grade}`, ...extra];
const idea = (x: Omit<IdeaInput, "kind" | "asOf">): IdeaInput => ({ kind: "idea", asOf, ...x });
// Sources.
const D_TORCH_2024 = doi("Santhosh et al., Topical Diclofenac for Prevention of Capecitabine-Associated Hand-Foot Syndrome: a double-blind randomized controlled trial (J Clin Oncol 2024)", "10.1200/jco.23.01730");
const DICLO_HFS_2026 = doi("Topical Diclofenac for Prevention of Capecitabine-Induced Hand-Foot Syndrome: a prospective real-world study (JCO Glob Oncol 2026)", "10.1200/go-26-00151");
const NMA_HFS_2026 = doi("Hand-foot syndrome prevention: pharmacological interventions, systematic review and network meta-analysis (BMJ Support Palliat Care 2026)", "10.1136/spcare-2025-005639");
const J_DIRECT_2025 = doi("Iimura et al., Phase III study of diclofenac cream for capecitabine-related hand-foot syndrome: study protocol of J-SUPPORT2401/JORTC-SUP06, J-DIRECT (Int J Clin Oncol 2025)", "10.1007/s10147-025-02789-z");
const SC_DOCETAXEL_2016 = doi("Komen et al., Results of 20- versus 45-min post-infusion scalp cooling time in the prevention of docetaxel-induced alopecia (Support Care Cancer 2016)", "10.1007/s00520-016-3084-7");
const LUGTENBERG_2022 = doi("Lugtenberg et al., Comparable effectiveness of 45- and 20-min post-infusion scalp cooling time in preventing paclitaxel-induced alopecia: a randomized controlled trial (Support Care Cancer 2022)", "10.1007/s00520-022-07090-7");
const SC_DUTCH_PICT_2025 = doi("Shorter post-infusion cooling times at least as effective as longer cooling times: the Dutch Scalp Cooling Registry (Support Care Cancer 2025)", "10.1007/s00520-025-09526-2");
const SC_VARIABILITY_2025 = doi("Scalp cooling therapy in chemotherapy-induced alopecia: addressing variability in cooling duration and efficacy (Support Care Cancer 2025)", "10.1007/s00520-025-10058-y");

const ideas: IdeaInput[] = [
  idea({ id: "idea-upgrade-topical-diclofenac-during-capecitabine", name: "Anti-inflammatory gel on the palms and soles from the first day of capecitabine", maturity: "being-tested-at-scale", actor: "clinic", cost: "small", horizonYears: 2,
    sections: ["supportive-care"], tags: T("promising", "moderate"),
    tldr: "Capecitabine often makes the hands and feet sore and peeling, and the usual answer is a lower dose. In one randomised trial, a cheap diclofenac gel rubbed on the palms cut moderate or worse hand-foot syndrome from 15 to under 4 per cent and halved dose cuts. A later study in routine care found no benefit, and a larger Japanese trial on palms and soles is under way.",
    summary: "The trial. In D-TORCH, a single-site phase 3 double-blind trial in India, 264 people starting capecitabine for breast or gastrointestinal cancer were randomised to topical diclofenac or placebo gel for 12 weeks. Grade 2 or 3 hand-foot syndrome occurred in 3.8 per cent with diclofenac against 15.0 per cent with placebo, and capecitabine dose reductions because of it in 3.8 against 13.5 per cent. The gel was applied to the palms only.\n\nThe pooled evidence. A 2026 network meta-analysis of 13 trials (1983 patients, most on capecitabine) found topical diclofenac had the strongest effect on moderate to severe hand-foot syndrome (risk ratio 0.26) and was the only intervention that reduced chemotherapy modifications.\n\nThe doubt. In DICLO-HFS, a prospective observational study of 151 people in two Turkish centres, routine 1 per cent diclofenac gel did not reduce grade 2 or worse hand-foot syndrome against active monitoring (16.9 against 13.8 per cent). The Japanese J-DIRECT trial, a multicentre placebo-controlled phase 3 trial of diclofenac 0.1 per cent cream on palms and soles alongside standard prevention, was set up because D-TORCH did not test the soles and its control group had less hand-foot syndrome than earlier reports. How often diclofenac is offered with capecitabine has not been measured in any source read.",
    hypothesis: "Diclofenac cream applied to the palms and soles twice daily from the first day of capecitabine reduces grade 2 or worse hand-foot syndrome within three months and the number of dose reductions it causes, against placebo cream with standard preventive care.",
    rationale: "Hand-foot syndrome is one of the commonest reasons capecitabine is reduced. Diclofenac acts on the local inflammation without the heart and stomach risks of oral celecoxib, costs little, and is already available everywhere.",
    test: "J-DIRECT, the multicentre randomised double-blind phase 3 trial of diclofenac cream against placebo cream, with grade 2 hand-foot syndrome within 3 months as the primary endpoint; a positive result would justify adding it to guideline prevention.",
    drugs: ["capecitabine"], terms: ["hand-foot-syndrome"], bottlenecks: ["b-toxicity-qol"],
    links: [D_TORCH_2024, NMA_HFS_2026, DICLO_HFS_2026, J_DIRECT_2025] }),

  idea({ id: "idea-upgrade-twenty-minute-post-infusion-scalp-cooling-after-taxanes", name: "Twenty minutes of scalp cooling after a taxane drip, rather than ninety", maturity: "being-tested-at-scale", actor: "clinic", cost: "small", horizonYears: 1,
    sections: ["supportive-care"], tags: T("proven-unevenly-used", "moderate"),
    tldr: "People using a cold cap often stay in the chair, cold, for an hour and a half after their chemotherapy drip ends. Two randomised trials found that after docetaxel or weekly paclitaxel, 20 minutes of cooling afterwards keeps hair as well as 45 or 90 minutes. Shortening it frees chairs and spares discomfort, yet many units still follow longer manufacturer timings.",
    summary: "The trials. In a Dutch multicentre trial of 134 people starting three-weekly docetaxel, 73 per cent with 20 minutes of post-infusion cooling and 79 per cent with 45 minutes needed no head covering (p = 0.5). In a second trial with weekly paclitaxel, hair preservation succeeded in 82 per cent with 20 minutes and 75 per cent with 45 minutes, and the authors concluded that 20 minutes is as effective as 45 and 90 minutes and should be the new standard of care.\n\nSupporting data. The Dutch Scalp Cooling Registry (4680 patients, 68 hospitals) found post-infusion cooling under 85 minutes as effective as longer across the taxane and anthracycline regimens studied. A 2025 review reports that post-cooling times in practice range from 15 minutes to 4 hours, often without evidence for longer durations, and that institutions often rely on manufacturer recommendations because no national or international guideline sets cooling times.\n\nWhat is not known. How many units use 20 minutes after taxanes has not been measured in any source read. The trials were in Dutch patients, mostly with European hair type, and did not cover antibody-drug conjugates. With anthracyclines, shortening below 90 minutes has not been tested in a randomised trial read here.",
    hypothesis: "Adopting 20 minutes of post-infusion scalp cooling after docetaxel and weekly paclitaxel, in place of 90 minutes, keeps hair preservation within 10 percentage points of the longer schedule while cutting chair time per session by over an hour and reducing discontinuation for discomfort.",
    rationale: "Chair time is a common reason units ration scalp cooling, and the cold is the main reason people stop. Shortening the part of the session that adds nothing makes cooling cheaper to offer and easier to finish.",
    test: "An implementation study across units that currently cool for 90 minutes after taxanes, switching to 20 minutes with hair preservation (no head cover needed) and session length as co-primary outcomes, and a randomised trial in people with Afro-textured or dense hair, who were under-represented in the Dutch trials.",
    technologies: ["scalp-cooling"], drugs: ["docetaxel", "paclitaxel"], terms: ["hair-loss-and-scalp-cooling-breast"], bottlenecks: ["b-toxicity-qol"],
    related: ["idea-moon-hair-preservation-for-all"],
    links: [SC_DOCETAXEL_2016, LUGTENBERG_2022, SC_DUTCH_PICT_2025, SC_VARIABILITY_2025] }),
];

export const protocolUpgradesFillSkin: EntityInput[] = [...ideas];
