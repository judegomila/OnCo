/**
 * Cherry picked ideas: the owner's editorial list for the "Cherry picked" view at /ideas/rankings/?view=cherry-picked.
 *
 * This file is yours to edit. Order is the display order; each entry is an idea id plus one sentence on why it is
 * here. The seed below was chosen by the best combined rank across the four computed views (bang for buck, most
 * important, hardest, closest to reality; see `combinedRank` in src/lib/idea-rankings.ts) and the sentences restate
 * what each idea's own record says. Ids are checked against the corpus by src/lib/idea-rankings.test.ts, so a
 * renamed idea fails the tests rather than silently dropping out of the list.
 */
export type IdeaPick = { id: string; reason: string };

export const IDEA_PICKS: readonly IdeaPick[] = [
  { id: "idea-moon-eliminate-infection-cancers", reason: "The tools already exist (vaccines, cures, eradication) and the cancers they prevent are among the commonest in the world; the missing piece is coordinated delivery." },
  { id: "idea-moon-brain-delivery-platform", reason: "Brain tumours and brain metastases share one obstacle, the blood-brain barrier, so a platform that solves delivery once would serve several cancers at the same time." },
  { id: "idea-prev-prs-screening-start-age", reason: "A one-time genetic score could personalise the start of breast, bowel and prostate screening, so fewer tests find the same cancers earlier in the people most at risk." },
  { id: "idea-moon-generics-for-cancer-fund", reason: "Cheap old drugs with hints of benefit go untested because nobody profits from the answer; a public fund and a label pathway fix the incentive rather than the science." },
  { id: "idea-bio2-brain-met-prevention-trials", reason: "Prevention trials aimed only at brain metastasis would attack the event patients fear most, and the idea already has trials and treatments linked to it." },
  { id: "idea-moon-image-guided-surgery-everywhere", reason: "Surgeons cannot see where a tumour ends; fluorescence and AI-read imaging in the theatre cut repeat operations, and low-cost versions could travel to any hospital." },
  { id: "idea-moon-cachexia-as-treatable-disease", reason: "Cachexia kills many patients and has had no effective drug; combining new GDF-15 antibodies with exercise and nutrition is a testable bundle for pancreatic and lung cancer." },
  { id: "idea-fund-ablation-versus-surgery-trials", reason: "Incisionless ablation is tested maker by maker in small studies; device-agnostic public trials against surgery would settle whether it works and for whom." },
  { id: "idea-fund-lmic-radiotherapy-finance", reason: "Dozens of countries have no radiotherapy machine at all; pairing long-term finance with a cheap, robust linac targets one of the widest treatment gaps on earth." },
  { id: "idea-tr2-rt-drug-platform", reason: "Half of all patients receive radiotherapy but few new drugs are tested alongside it; a standing platform would test drug-plus-radiation pairs systematically." },
  { id: "idea-prev-glp1-cancer-prevention-rct", reason: "GLP-1 drugs are already in routine use and observational data hint at fewer obesity-related cancers; only a randomised trial with cancer as the primary outcome can settle it." },
  { id: "idea-nl-alcohol-minimum-pricing-cancer-endpoints", reason: "Minimum unit pricing is already in force in Scotland and Wales, so measuring cancer incidence over the next decade costs little and answers a population-scale question." },
];
