/**
 * Radiation wave 5 (17 Sept 2026): linear energy transfer, relative biological effectiveness and the
 * Bragg peak, plus the two adult proton-versus-photon randomised trials that can test whether those
 * quantities, with tissue alpha/beta, pick when protons beat IMRT. No calculator, no literature dump.
 * Registered in src/data/index.ts as radiationTermsWave5 and radiationTrialsWave5.
 */
import type { TermInput, TrialInput } from "@/lib/schema";

const asOf = "2026-09-17";
const tags = ["radiation-wave5"];
const W = (s: string) => `https://en.wikipedia.org/wiki/${s}`;
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });

type Tm = Omit<TermInput, "kind" | "asOf">;
const tm = (x: Tm): TermInput => ({ kind: "term", asOf, tags, ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, tags, ...x });

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
    status: "active",
    sponsor: "Massachusetts General Hospital",
    setting: "Low- and intermediate-risk localised prostate cancer: proton beam therapy versus intensity-modulated photon radiotherapy",
    tldr: "A randomised trial of protons versus IMRT for localised prostate cancer, built to see whether protons cause less bowel and bladder harm at the same cancer control.",
    summary: "PARTIQoL (NCT01617161) randomises men with low- or intermediate-risk localised prostate cancer to proton beam therapy or intensity-modulated photon radiotherapy, with bowel quality of life among the leading endpoints. It is one of the few adult proton-versus-photon trials that can test whether a distal LET and RBE difference near rectum and bladder is clinically real. Accrual has been slow in a field where patients can obtain protons off-trial. ClinicalTrials.gov listed the study as active, not recruiting, with primary completion in December 2025; the primary readout is not yet in the corpus.",
    cancers: ["prostate"],
    technologies: ["proton-therapy", "imrt-igrt"],
    terms: ["relative-biological-effectiveness", "linear-energy-transfer", "alpha-beta-ratio", "bragg-peak"],
    institutions: ["mgh"],
    links: [ct("NCT01617161")],
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
