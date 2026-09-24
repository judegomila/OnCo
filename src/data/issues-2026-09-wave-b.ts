/**
 * Trial and paper records proposed in GitHub issues 82 to 98 (24 September 2026): products that sat on /gaps under
 * "Products with no trial" because their pivotal study names a supportive-care condition, a screening population or an
 * umbrella protocol rather than a corpus cancer, so scripts/fetch-entity-trials.ts never attached one. Each record was
 * re-verified on the day against the registry (ClinicalTrials.gov v2, ISRCTN), the Europe PMC abstract of the primary
 * publication and, where cited, the DailyMed label or EMA product information. Outcome values are transcribed from the
 * abstract only and cite its DOI; registry and label figures that differ appear in `enrolledNote` or the summary, never
 * as outcome values. Products are wired through `trials` on their own records; the paper records here link each trial to
 * its publication through `keyPapers`. Registered in src/data/index.ts as issuesWaveB.
 */
import type { PaperInput, TrialInput } from "@/lib/schema";

const asOf = "2026-09-24";
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const doi = (label: string, id: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });

// Issue 82: MNTX 302 (NCT00402038), the every-other-day methylnaltrexone pivotal; Relistor label Study 5.
const issue82: (TrialInput | PaperInput)[] = [
  t({ id: "mntx-302", name: "MNTX 302", aka: ["Study 5", "MNTX302"], nct: "NCT00402038", phase: "3", status: "positive", yearReported: 2008, sponsor: "Bausch Health Americas (originally Progenics and Wyeth)",
    enrolled: 133, enrolledBasis: "randomised", enrolledNote: "The NEJM 2008 abstract reports 133 patients randomly assigned, and the Relistor label analyses the same 133 (62 methylnaltrexone, 71 placebo) as Study 5; ClinicalTrials.gov NCT00402038 lists an actual enrolment of 134.",
    setting: "Advanced illness with opioid-induced constipation despite stable opioids and laxatives: subcutaneous methylnaltrexone 0.15 mg per kilogram every other day for two weeks versus placebo",
    tldr: "MNTX 302 showed that a gut-only opioid blocker injected under the skin produced a bowel movement within four hours in about half of people with advanced illness on strong painkillers, against about one in seven on placebo, without weakening pain relief; it was one of the two trials behind the US approval of Relistor.",
    summary: "MNTX 302 was a randomised, double-blind, placebo-controlled phase 3 trial of subcutaneous methylnaltrexone in adults with advanced illness and opioid-induced constipation who had not responded to stable laxatives. Patients received methylnaltrexone 0.15 mg per kilogram or placebo every other day for two weeks. The coprimary endpoints were laxation within four hours of the first dose and laxation within four hours after two or more of the first four doses.\n\nIn the NEJM 2008 report, 48 percent of patients on methylnaltrexone had laxation within four hours of the first dose versus 15 percent on placebo, and 52 percent versus 8 percent had laxation without a rescue laxative within four hours after two or more of the first four doses (P less than 0.001 for both). Median time to laxation was significantly shorter on methylnaltrexone. Abdominal pain and flatulence were the most common adverse events, and the paper reported no evidence of central opioid withdrawal or change in pain scores.\n\nThe US Relistor label names the same study Study 5 and analyses the same 133 patients (62 Relistor, 71 placebo); across its two advanced-illness studies most patients had a primary diagnosis of incurable cancer. The registry lists organisation id MNTX 302 as a completed phase 3 with an actual enrolment of 134. The programme treats opioid-induced constipation in advanced illness rather than a named cancer, so the record carries no cancer ids.",
    result: "Laxation within four hours of the first dose 48% vs 15% on placebo; laxation after two or more of the first four doses 52% vs 8% (P<0.001 for both).",
    outcomes: [
      { endpoint: "Laxation within 4 hours of the first dose", primary: true, unit: "%", arms: [{ name: "Methylnaltrexone 0.15 mg/kg", value: 48 }, { name: "Placebo", value: 15 }], p: "<0.001", source: "https://doi.org/10.1056/NEJMoa0707377" },
      { endpoint: "Laxation without rescue laxative within 4 hours after two or more of the first four doses", primary: true, unit: "%", arms: [{ name: "Methylnaltrexone 0.15 mg/kg", value: 52 }, { name: "Placebo", value: 8 }], p: "<0.001", source: "https://doi.org/10.1056/NEJMoa0707377" },
    ],
    replication: "The single-dose companion pivotal MNTX 301 (NCT00401362, Slatkin 2009; Relistor label Study 4) reported the same direction of effect and is not yet recorded here.",
    drugs: ["methylnaltrexone"], sections: ["supportive-care"], companies: ["bausch-health"], keyPapers: ["paper-mntx-302-thomas-nejm-2008"],
    links: [ct("NCT00402038"), doi("NEJM 2008", "10.1056/NEJMoa0707377"), { label: "Relistor label (DailyMed)", url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c488fb7c-0a5b-487c-b452-996809d1cb99" }] }),
  p({ id: "paper-mntx-302-thomas-nejm-2008", name: "Methylnaltrexone for opioid-induced constipation in advanced illness (MNTX 302)",
    tldr: "In people with advanced illness whose strong painkillers had caused constipation that laxatives could not shift, a methylnaltrexone injection produced a bowel movement within four hours in about half, against about one in seven on placebo, without undoing pain relief.",
    summary: "Primary publication of MNTX 302 (NCT00402038). A total of 133 patients who had received opioids for two or more weeks, with stable doses of opioids and laxatives for three or more days without relief of opioid-induced constipation, were randomly assigned to subcutaneous methylnaltrexone 0.15 mg per kilogram or placebo every other day for two weeks. Coprimary outcomes were laxation within four hours after the first dose and laxation within four hours after two or more of the first four doses.\n\nLaxation within four hours of the first dose occurred in 48 percent of the methylnaltrexone group and 15 percent of the placebo group; laxation without a rescue laxative after two or more of the first four doses occurred in 52 percent versus 8 percent (P less than 0.001 for both). The response rate held through a three-month open-label extension. Median time to laxation was significantly shorter with methylnaltrexone. No evidence of centrally mediated opioid withdrawal or change in pain scores was seen; abdominal pain and flatulence were the most common adverse events.",
    journal: "New England Journal of Medicine", year: 2008, doi: "10.1056/NEJMoa0707377", pmid: "18509120",
    authors: "Thomas J, Karver S, Cooney GA, et al.", paperType: "rct", participants: 133, changedPractice: true,
    findings: ["Laxation within 4 hours of the first dose: 48 percent with methylnaltrexone vs 15 percent with placebo (P<0.001).", "Laxation without rescue laxative within 4 hours after two or more of the first four doses: 52 percent vs 8 percent (P<0.001).", "No evidence of central opioid withdrawal or change in pain scores; abdominal pain and flatulence were the commonest adverse events."],
    whatItMeans: "This trial, with its single-dose companion MNTX 301, is the evidence behind the 2008 US approval of Relistor for opioid-induced constipation in palliative care when laxatives fail. For a patient on strong opioids, it shows that the constipation can be reversed at the gut without touching the pain relief.",
    caveats: ["Two-week double-blind phase; longer-term data come from the open-label extension.", "The abstract gives no per-arm patient numbers; the 62 and 71 split is from the Relistor label.", "Patients had advanced illness of mixed cause; most, per the label, had incurable cancer, but the trial did not select by cancer type."],
    links: [doi("NEJM 2008", "10.1056/NEJMoa0707377"), pubmed("18509120"), ct("NCT00402038")],
    drugs: ["methylnaltrexone"], trials: ["mntx-302"], sections: ["supportive-care"], companies: ["bausch-health"], journals: ["nejm"] }),
];

export const issuesWaveB: (TrialInput | PaperInput)[] = [...issue82];
