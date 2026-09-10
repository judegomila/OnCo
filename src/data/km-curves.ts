/**
 * Published landmark survival estimates for trial arms, so survival can be drawn as a curve rather
 * than a single number. Each point is [months, percent alive or event-free] read from the primary
 * publication named in `sources` (Kaplan-Meier landmark rates quoted in the text or tables, never read
 * off a figure). Medians are in months. Where a trial reports several follow-ups the later ones extend
 * the same arm. Only numbers stated in the sources are included; nothing is interpolated.
 *
 * `trial` is a trial id in the corpus (checked by km-curves.test.ts). `family` classifies the endpoint
 * so TrialOutcomes can pair a curve with the matching outcome pictogram.
 */
export type EndpointFamily = "os" | "pfs" | "efs" | "dfs" | "mfs" | "other";
export type KmArm = { name: string; points: Array<[number, number]>; median?: number };
export type KmCurve = { trial: string; endpoint: string; family: EndpointFamily; arms: KmArm[]; sources: string[]; note?: string };

/** Shown under every curve: the population is the trial's, not the reader. */
export const KM_CAPTION = "Curves show the trial population; they are not a prediction for any one person.";

const nejm = (id: string) => `https://www.nejm.org/doi/full/10.1056/${id}`;
const doi = (d: string) => `https://doi.org/${d}`;

export const KM_CURVES: KmCurve[] = [
  { trial: "keynote-522", endpoint: "Event-free survival", family: "efs",
    arms: [{ name: "Pembrolizumab + chemotherapy", points: [[36, 84.5], [60, 81.2], [84, 78.3]] }, { name: "Placebo + chemotherapy", points: [[36, 76.8], [60, 72.2], [84, 69.8]] }],
    sources: [nejm("NEJMoa2112651"), nejm("NEJMoa2409932"), "https://www.lbbc.org/news/pivotal-progress-in-tnbc-asco-2026"], note: "36-month rates from the 2022 NEJM report, 60-month from the 2024 NEJM report, 84-month from the ASCO 2026 update." },
  { trial: "keynote-522", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Pembrolizumab + chemotherapy", points: [[60, 86.6], [84, 85.1]] }, { name: "Placebo + chemotherapy", points: [[60, 81.7], [84, 77.2]] }],
    sources: [nejm("NEJMoa2409932"), "https://www.lbbc.org/news/pivotal-progress-in-tnbc-asco-2026"] },

  { trial: "checkmate-067", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Nivolumab + ipilimumab", points: [[36, 58], [60, 52], [120, 43]], median: 72.1 }, { name: "Nivolumab", points: [[36, 52], [60, 44], [120, 37]], median: 36.9 }, { name: "Ipilimumab", points: [[36, 34], [60, 26], [120, 19]], median: 19.9 }],
    sources: [nejm("NEJMoa1709684"), nejm("NEJMoa1910836"), nejm("NEJMoa2407417")], note: "3-year rates from Wolchok 2017, 5-year from Larkin 2019, 10-year and medians from the final 2025 analysis." },

  { trial: "destiny-breast03", endpoint: "Progression-free survival", family: "pfs",
    arms: [{ name: "Trastuzumab deruxtecan", points: [[12, 75.8]], median: 28.8 }, { name: "Trastuzumab emtansine", points: [[12, 34.1]], median: 6.8 }],
    sources: [nejm("NEJMoa2115022"), doi("10.1016/S0140-6736(22)02420-5")], note: "12-month rates from the primary NEJM report (blinded independent review); medians from the 2023 Lancet update." },
  { trial: "destiny-breast03", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Trastuzumab deruxtecan", points: [[12, 94.1], [24, 77.4]] }, { name: "Trastuzumab emtansine", points: [[12, 85.9], [24, 69.9]] }],
    sources: [nejm("NEJMoa2115022"), doi("10.1016/S0140-6736(22)02420-5")] },

  { trial: "adaura", endpoint: "Disease-free survival (overall population, stage IB-IIIA)", family: "dfs",
    arms: [{ name: "Osimertinib", points: [[24, 89]] }, { name: "Placebo", points: [[24, 52]] }],
    sources: [nejm("NEJMoa2027071")] },
  { trial: "adaura", endpoint: "Overall survival (overall population)", family: "os",
    arms: [{ name: "Osimertinib", points: [[60, 88]] }, { name: "Placebo", points: [[60, 78]] }],
    sources: [nejm("NEJMoa2304594")] },

  { trial: "crown", endpoint: "Progression-free survival", family: "pfs",
    arms: [{ name: "Lorlatinib", points: [[12, 78], [36, 64], [60, 60]] }, { name: "Crizotinib", points: [[12, 39], [36, 19], [60, 8]], median: 9.3 }],
    sources: [nejm("NEJMoa2027187"), doi("10.1200/JCO.24.00581")], note: "Median PFS for lorlatinib was not reached at 5 years." },

  { trial: "pacific", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Durvalumab", points: [[24, 66.3], [60, 42.9]], median: 47.5 }, { name: "Placebo", points: [[24, 55.6], [60, 33.4]], median: 29.1 }],
    sources: [nejm("NEJMoa1809697"), doi("10.1200/JCO.21.01308")] },
  { trial: "pacific", endpoint: "Progression-free survival", family: "pfs",
    arms: [{ name: "Durvalumab", points: [[12, 55.9], [60, 33.1]], median: 16.9 }, { name: "Placebo", points: [[12, 35.3], [60, 19.0]], median: 5.6 }],
    sources: [nejm("NEJMoa1709937"), doi("10.1200/JCO.21.01308")] },

  { trial: "keynote-024-189", endpoint: "Overall survival, KEYNOTE-024 (PD-L1 TPS ≥50%)", family: "os",
    arms: [{ name: "Pembrolizumab", points: [[60, 31.9]], median: 26.3 }, { name: "Platinum chemotherapy", points: [[60, 16.3]], median: 13.4 }],
    sources: [doi("10.1200/JCO.21.00174")] },
  { trial: "keynote-024-189", endpoint: "Overall survival, KEYNOTE-189 (non-squamous, any PD-L1)", family: "os",
    arms: [{ name: "Pembrolizumab + pemetrexed-platinum", points: [[60, 19.4]], median: 22.0 }, { name: "Placebo + pemetrexed-platinum", points: [[60, 11.3]], median: 10.6 }],
    sources: [doi("10.1200/JCO.22.01989")] },

  { trial: "olympia", endpoint: "Invasive disease-free survival", family: "dfs",
    arms: [{ name: "Olaparib", points: [[36, 85.9], [48, 82.7]] }, { name: "Placebo", points: [[36, 77.1], [48, 75.4]] }],
    sources: [nejm("NEJMoa2105215"), doi("10.1016/j.annonc.2022.09.159")] },
  { trial: "olympia", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Olaparib", points: [[48, 89.8]] }, { name: "Placebo", points: [[48, 86.4]] }],
    sources: [doi("10.1016/j.annonc.2022.09.159")] },

  { trial: "monarche", endpoint: "Invasive disease-free survival", family: "dfs",
    arms: [{ name: "Abemaciclib + endocrine therapy", points: [[24, 92.2], [48, 85.8], [60, 83.6]] }, { name: "Endocrine therapy alone", points: [[24, 88.7], [48, 79.4], [60, 76.0]] }],
    sources: [doi("10.1200/JCO.20.02514"), doi("10.1016/S1470-2045(22)00694-5"), doi("10.1200/JCO.23.01994")] },

  { trial: "natalee", endpoint: "Invasive disease-free survival", family: "dfs",
    arms: [{ name: "Ribociclib + aromatase inhibitor", points: [[36, 90.4]] }, { name: "Aromatase inhibitor alone", points: [[36, 87.1]] }],
    sources: [nejm("NEJMoa2305488")] },

  { trial: "eortc-26981", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Radiotherapy + temozolomide", points: [[24, 26.5], [60, 9.8]], median: 14.6 }, { name: "Radiotherapy alone", points: [[24, 10.4], [60, 1.9]], median: 12.1 }],
    sources: [nejm("NEJMoa043330"), doi("10.1016/S1470-2045(09)70025-7")] },

  { trial: "ef-14", endpoint: "Overall survival", family: "os",
    arms: [{ name: "TTFields + temozolomide", points: [[24, 43], [60, 13]], median: 20.9 }, { name: "Temozolomide alone", points: [[24, 31], [60, 5]], median: 16.0 }],
    sources: [doi("10.1001/jama.2017.18718")] },

  { trial: "checkmate-816", endpoint: "Event-free survival", family: "efs",
    arms: [{ name: "Nivolumab + chemotherapy", points: [[12, 76.1], [24, 63.8]], median: 31.6 }, { name: "Chemotherapy alone", points: [[12, 63.4], [24, 45.3]], median: 20.8 }],
    sources: [nejm("NEJMoa2202170")] },

  { trial: "keynote-671", endpoint: "Event-free survival", family: "efs",
    arms: [{ name: "Pembrolizumab + chemotherapy, then pembrolizumab", points: [[24, 62.4]] }, { name: "Placebo + chemotherapy, then placebo", points: [[24, 40.6]] }],
    sources: [nejm("NEJMoa2302983")] },

  { trial: "alina", endpoint: "Disease-free survival (intention-to-treat)", family: "dfs",
    arms: [{ name: "Alectinib", points: [[24, 93.6]] }, { name: "Platinum chemotherapy", points: [[24, 63.7]] }],
    sources: [nejm("NEJMoa2310532")] },

  { trial: "laura", endpoint: "Progression-free survival", family: "pfs",
    arms: [{ name: "Osimertinib", points: [[12, 74], [24, 65]], median: 39.1 }, { name: "Placebo", points: [[12, 22], [24, 13]], median: 5.6 }],
    sources: [nejm("NEJMoa2402614")] },

  { trial: "arasens", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Darolutamide + ADT + docetaxel", points: [[48, 62.7]] }, { name: "Placebo + ADT + docetaxel", points: [[48, 50.4]] }],
    sources: [nejm("NEJMoa2119115")] },

  { trial: "embark", endpoint: "Metastasis-free survival", family: "mfs",
    arms: [{ name: "Enzalutamide + leuprolide", points: [[60, 87.3]] }, { name: "Enzalutamide alone", points: [[60, 80.0]] }, { name: "Leuprolide alone", points: [[60, 71.4]] }],
    sources: [nejm("NEJMoa2303974")] },

  { trial: "prodige-24", endpoint: "Disease-free survival", family: "dfs",
    arms: [{ name: "Modified FOLFIRINOX", points: [[36, 39.7]], median: 21.6 }, { name: "Gemcitabine", points: [[36, 21.4]], median: 12.8 }],
    sources: [nejm("NEJMoa1809775")] },
  { trial: "prodige-24", endpoint: "Overall survival", family: "os",
    arms: [{ name: "Modified FOLFIRINOX", points: [[36, 63.4], [60, 43.2]], median: 54.4 }, { name: "Gemcitabine", points: [[36, 48.6], [60, 31.4]], median: 35.0 }],
    sources: [nejm("NEJMoa1809775"), doi("10.1001/jamaoncol.2022.3829")] },
];

/** Classify an endpoint label into a survival family, for pairing curves with outcome rows. */
export function endpointFamily(endpoint: string): EndpointFamily {
  const e = endpoint.toLowerCase();
  if (/metastasis-free|\bmfs\b/.test(e)) return "mfs";
  if (/event-free|\befs\b/.test(e)) return "efs";
  if (/disease-free|invasive disease|\bdfs\b|\bidfs\b|recurrence-free|\brfs\b/.test(e)) return "dfs";
  if (/progression-free|\bpfs\b|\brpfs\b|radiographic progression/.test(e)) return "pfs";
  if (/overall survival|\bos\b/.test(e) && !/progression|recurrence/.test(e)) return "os";
  return "other";
}

export function kmCurvesFor(trialId: string): KmCurve[] { return KM_CURVES.filter((c) => c.trial === trialId); }
export const KM_TRIAL_IDS = Array.from(new Set(KM_CURVES.map((c) => c.trial)));
