/**
 * Radiation wave 5 (17 Sept 2026): linear energy transfer, relative biological effectiveness and the
 * Bragg peak, plus the two adult proton-versus-photon randomised trials that can test whether those
 * quantities, with tissue alpha/beta, pick when protons beat IMRT. No calculator, no literature dump.
 * Registered in src/data/index.ts as radiationTermsWave5, radiationTrialsWave5 and radiationPapersWave5 (the PARTIQoL
 * readout, added 21 Sept 2026 from the ASTRO 2024 late-breaking abstract in IJROBP).
 */
import type { PaperInput, TermInput, TrialInput } from "@/lib/schema";

const asOf = "2026-09-17";
const tags = ["radiation-wave5"];
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

type Tm = Omit<TermInput, "kind" | "asOf">;
const tm = (x: Tm): TermInput => ({ kind: "term", asOf, tags, ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, tags, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf: "2026-09-21", tags, ...x });

export const radiationTermsWave5: TermInput[] = [
  tm({
    id: "linear-energy-transfer",
    name: "Linear energy transfer (LET)",
    aka: ["LET", "linear energy transfer", "high-LET", "low-LET", "keV/µm", "keV per micrometre"],
    category: "Treatment jargon",
    wikipedia: W("Linear_energy_transfer"),
    tldr: "How densely a radiation track dumps energy along its path. Sparse tracks (X-rays, most of a proton beam) are easier to repair; dense tracks (the proton's stop-point, carbon ions, alpha particles) punch clustered holes in DNA.",
    summary: "Linear energy transfer is the energy a charged particle deposits per unit length of track, usually in keV per micrometre. Photons and electrons are low-LET. Protons are mostly low-LET along the entrance plateau and rise at the Bragg peak and just beyond it, which is why a constant relative biological effectiveness of 1.1 is only a reporting convention. Carbon ions and alpha particles (around 100 keV per micrometre) are high-LET: they cause clustered double-strand breaks, work in hypoxia, and are less sensitive to fraction size. LET is the physical input to relative biological effectiveness; the two are not the same number.",
    sections: ["radiation"],
    technologies: ["proton-therapy", "carbon-ion", "imrt-igrt", "targeted-alpha-therapy", "bnct", "intensity-modulated-proton-therapy"],
    terms: ["relative-biological-effectiveness", "alpha-beta-ratio", "alpha-vs-beta", "oxygen-enhancement-ratio", "bragg-peak"],
    links: [
      { label: "Wikipedia", url: W("Linear_energy_transfer") },
      { label: "Paganetti, RBE values for proton beam therapy (Physics in Medicine and Biology 2014)", url: "https://doi.org/10.1088/0031-9155/59/22/R419" },
    ],
  }),
  tm({
    id: "relative-biological-effectiveness",
    name: "Relative biological effectiveness (RBE)",
    aka: ["RBE", "relative biological effectiveness", "RBE 1.1", "variable RBE", "Gy(RBE)"],
    category: "Treatment jargon",
    wikipedia: W("Relative_biological_effectiveness"),
    tldr: "How many grays of ordinary X-rays you would need to match the damage from one gray of this radiation. Protons are treated as 1.1 times as damaging as X-rays; that number is a convention, and the true value is higher where the beam stops.",
    summary: "Relative biological effectiveness is the photon dose divided by the particle dose that produces the same biological effect. Clinical proton therapy reports dose as Gy(RBE) using a constant 1.1 (ICRU 78). Laboratory and modelling work show RBE rising above 1.1 at the distal edge, where linear energy transfer is highest, which can put extra biological dose in tissue just beyond the target. Carbon-ion therapy uses higher, model-dependent RBE (often around 2 to 3; local effect model or microdosimetric kinetic model). RBE depends on endpoint, dose per fraction, and the tissue's alpha/beta ratio: late-responding tissues with low alpha/beta are more sensitive to high-LET increments. Constant 1.1 is a reporting rule, not a measurement.",
    sections: ["radiation"],
    technologies: ["proton-therapy", "carbon-ion", "imrt-igrt", "intensity-modulated-proton-therapy"],
    terms: ["linear-energy-transfer", "alpha-beta-ratio", "bragg-peak", "biologically-effective-dose", "oxygen-enhancement-ratio"],
    trials: ["partiqol", "radcomp"],
    keyPapers: ["paper-paganetti-proton-rbe-ijrobp-2014"],
    links: [
      { label: "Wikipedia", url: W("Relative_biological_effectiveness") },
      { label: "Paganetti, RBE values for proton beam therapy (Physics in Medicine and Biology 2014)", url: "https://doi.org/10.1088/0031-9155/59/22/R419" },
    ],
  }),
  tm({
    id: "bragg-peak",
    name: "Bragg peak",
    aka: ["Bragg peak", "spread-out Bragg peak", "SOBP", "distal edge", "no exit dose"],
    category: "Treatment jargon",
    wikipedia: W("Bragg_peak"),
    tldr: "The spot where a proton or carbon-ion beam dumps most of its energy and then stops, so tissue behind the tumour gets almost no dose.",
    summary: "A charged particle slows as it travels through tissue and deposits most of its energy in a narrow peak just before it stops. That Bragg peak is why protons and carbon ions have no exit dose compared with X-rays. The spread-out Bragg peak stacks several energies to cover a tumour's depth. Linear energy transfer, and therefore relative biological effectiveness, is highest at the distal edge of the peak, which is why a constant proton RBE of 1.1 can understate dose just beyond the target. Range uncertainty of a few millimetres is the planning counterpart of that edge.",
    sections: ["radiation"],
    technologies: ["proton-therapy", "carbon-ion", "intensity-modulated-proton-therapy", "proton-arc-therapy"],
    terms: ["linear-energy-transfer", "relative-biological-effectiveness"],
    links: [{ label: "Wikipedia", url: W("Bragg_peak") }],
  }),
];

export const radiationTrialsWave5: TrialInput[] = [
  t({
    id: "partiqol",
    name: "PARTIQoL",
    nct: "NCT01617161",
    phase: "3",
    status: "completed",
    yearReported: 2024,
    enrolled: 450,
    sponsor: "Massachusetts General Hospital",
    setting: "Low- and intermediate-risk localised prostate cancer: proton beam therapy versus intensity-modulated photon radiotherapy",
    tldr: "The first multicentre randomised trial of protons versus IMRT for localised prostate cancer found no difference in bowel, urinary or sexual quality of life and the same cancer control at five years.",
    summary: "PARTIQoL (NCT01617161) randomised 450 men with low- or intermediate-risk localised prostate cancer at 29 centres between 2012 and 2021 to proton beam therapy or intensity-modulated photon radiotherapy, without hormone therapy, with the change in EPIC bowel quality of life at 24 months as the primary endpoint. It is one of the few adult proton-versus-photon trials able to test whether a distal LET and RBE difference near rectum and bladder is clinically real, and accrual was slow in a field where patients can obtain protons off-trial.\n\nReported as a late-breaking abstract at ASTRO 2024 with a median follow-up of 60.3 months: bowel scores fell only slightly in both arms (91.8 with protons and 91.9 with IMRT at 24 months, from 93.7 and 93.5 at baseline; p=0.836), with no differences in urinary incontinence, urinary irritation or sexual function at any time point and five-year progression-free survival of 93.4% with protons and 93.7% with IMRT (p=0.706). Neither technique beat the other, so the adult proton case in prostate cancer rests on other arguments than a wider therapeutic window.",
    result: "No difference between protons and IMRT in EPIC bowel quality of life at 24 months (primary endpoint, p=0.836) or in urinary or sexual function; five-year progression-free survival 93.4% vs 93.7%.",
    outcomes: [
      { endpoint: "EPIC bowel quality of life at 24 months", primary: true, unit: "score (0-100)", arms: [{ name: "Proton beam therapy", value: 91.8, note: "Baseline 93.7" }, { name: "IMRT", value: 91.9, note: "Baseline 93.5" }], p: "0.836", source: "https://doi.org/10.1016/j.ijrobp.2024.08.012" },
      { endpoint: "Progression-free survival at 5 years", unit: "%", arms: [{ name: "Proton beam therapy", value: 93.4 }, { name: "IMRT", value: 93.7 }], p: "0.706", source: "https://doi.org/10.1016/j.ijrobp.2024.08.012" },
    ],
    cancers: ["prostate"],
    technologies: ["proton-therapy", "imrt-igrt"],
    terms: ["relative-biological-effectiveness", "linear-energy-transfer", "alpha-beta-ratio", "bragg-peak"],
    institutions: ["mgh"],
    keyPapers: ["paper-partiqol-astro-2024"],
    links: [ct("NCT01617161"), { label: "ASTRO 2024 late-breaking abstract (IJROBP)", url: "https://doi.org/10.1016/j.ijrobp.2024.08.012" }],
  }),
  t({
    id: "radcomp",
    name: "RADCOMP",
    nct: "NCT02603341",
    phase: "3",
    status: "active",
    sponsor: "Abramson Cancer Center at Penn Medicine",
    setting: "Non-metastatic breast cancer: proton versus photon radiotherapy",
    tldr: "A randomised trial of protons versus photons for non-metastatic breast cancer, asking whether protons spare the heart and lung when the breast and nodes need radiation.",
    summary: "RADCOMP (NCT02603341) randomises non-metastatic breast cancer to proton or photon radiotherapy, with major cardiovascular events as a long-horizon endpoint. The anatomy (left chest wall, internal mammary nodes, heart, lung) is where exit dose and a distal Bragg peak could matter. It tests integral dose and whether variable RBE at the chest-wall/heart interface helps or hurts. ClinicalTrials.gov listed the study as active, not recruiting, with primary completion estimated in 2036; no primary readout is in the corpus.",
    cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"],
    technologies: ["proton-therapy", "imrt-igrt"],
    terms: ["relative-biological-effectiveness", "linear-energy-transfer", "bragg-peak"],
    links: [ct("NCT02603341")],
  }),
];

export const radiationPapersWave5: PaperInput[] = [
  p({
    id: "paper-partiqol-astro-2024",
    name: "PARTIQoL: phase 3 randomised trial of proton therapy versus IMRT for localised prostate cancer (ASTRO 2024 late-breaking abstract)",
    tldr: "In the first multicentre randomised comparison of protons and IMRT for localised prostate cancer, bowel, urinary and sexual quality of life and five-year cancer control were the same with either technique.",
    summary: "Late-breaking abstract LBA01 at the 2024 ASTRO Annual Meeting, published in the meeting supplement of the International Journal of Radiation Oncology, Biology, Physics. PARTIQoL (NCT01617161) randomised 450 men with low- or intermediate-risk localised prostate cancer at 29 centres between June 2012 and November 2021 to proton beam therapy or intensity-modulated radiotherapy, without hormone therapy, stratified by institution, age, rectal spacer use and fractionation. The primary endpoint was the change in EPIC bowel quality of life at 24 months.\n\nWith a median follow-up of 60.3 months, bowel scores declined only slightly in both arms: from 93.7 to 91.8 with protons and from 93.5 to 91.9 with IMRT at 24 months (p=0.836), a difference that was neither statistically significant nor clinically meaningful. Urinary incontinence, urinary irritation and sexual function did not differ at any time point, and there were no sustained differences in subgroups by risk group, age, rectal spacer or fractionation. Five-year progression-free survival was 93.4% with protons and 93.7% with IMRT (p=0.706). This record carries the abstract's figures only.",
    journal: "International Journal of Radiation Oncology, Biology, Physics", year: 2024, doi: "10.1016/j.ijrobp.2024.08.012",
    authors: "Efstathiou JA, Yeap BY, Michalski JM, et al.", paperType: "rct", participants: 450, changedPractice: false,
    findings: [
      "EPIC bowel quality of life at 24 months 91.8 with protons vs 91.9 with IMRT (baseline 93.7 and 93.5); p=0.836 for the primary endpoint.",
      "No significant differences in urinary incontinence, urinary irritation or sexual function at any time point over 60 months.",
      "Five-year progression-free survival 93.4% with protons vs 93.7% with IMRT (p=0.706).",
      "Median follow-up 60.3 months; 450 men randomised at 29 centres, median age 68.",
    ],
    whatItMeans: "For men with low- or intermediate-risk prostate cancer, protons and modern IMRT give the same excellent quality of life and cancer control, so the choice can rest on access, cost and convenience rather than on an expected sparing of bowel or bladder. The result removes prostate cancer from the list of adult indications where a proton advantage was assumed but untested.",
    caveats: [
      "Abstract figures only; the peer-reviewed full paper carries the definitive numbers.",
      "Patient-reported quality of life was the primary endpoint, not toxicity graded by clinicians or long-term second cancers.",
      "Low- and intermediate-risk disease without hormone therapy; high-risk and node-positive disease were not studied.",
      "Rectal spacers and hypofractionation were allowed in both arms, which may have narrowed any difference.",
    ],
    links: [
      { label: "IJROBP 2024 supplement (LBA01)", url: "https://doi.org/10.1016/j.ijrobp.2024.08.012" },
      { label: "ClinicalTrials.gov NCT01617161", url: "https://clinicaltrials.gov/study/NCT01617161" },
    ],
    cancers: ["prostate"], trials: ["partiqol"], technologies: ["proton-therapy", "imrt-igrt"],
    terms: ["relative-biological-effectiveness", "linear-energy-transfer", "bragg-peak"], institutions: ["mgh"], people: ["anthony-zietman"], journals: ["ijrobp"],
  }),
];
