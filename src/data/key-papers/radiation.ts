import type { PaperInput } from "@/lib/schema";

const asOf = "2026-09-17";
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, tags: ["radiation-wave5"], ...x });

/** Radiotherapy key papers that are reviews or methods rather than disease-specific landmark RCTs. */
export const papersRadiation: PaperInput[] = [
  p({
    id: "paper-paganetti-proton-rbe-ijrobp-2014",
    name: "Paganetti 2014: proton RBE is not a fixed 1.1",
    tldr: "The number used to convert proton gray into X-ray gray (1.1) is a convention. The true relative effect is higher where the beam stops, and it depends on the tissue and the size of each dose.",
    summary: "Paganetti reviewed laboratory and clinical estimates of proton relative biological effectiveness and showed systematic variation with linear energy transfer, dose per fraction, and biological endpoint. The distal edge is the region of concern. The paper is why variable-RBE planning exists and why constant 1.1 remains a reporting rule rather than a measurement.",
    journal: "International Journal of Radiation Oncology, Biology, Physics",
    year: 2014,
    doi: "10.1016/j.ijrobp.2014.07.001",
    authors: "Paganetti H",
    paperType: "review",
    findings: [
      "Clinical proton dose is reported at a constant RBE of 1.1.",
      "RBE increases with LET toward the distal edge of the spread-out Bragg peak.",
      "RBE is larger at lower dose per fraction and for late-responding (low alpha/beta) endpoints.",
    ],
    whatItMeans: "A proton plan that looks safe on a 1.1 RBE map can still over-dose a late-responding organ sitting on the distal edge. Comparing protons with IMRT without an LET-weighted view asks the wrong physical question.",
    caveats: [
      "In vivo human RBE remains inferred, not measured lesion by lesion.",
      "No single variable-RBE model is standard in the clinic.",
      "This is a review of estimates, not a randomised comparison of RBE models.",
    ],
    changedPractice: false,
    sections: ["radiation"],
    technologies: ["proton-therapy", "intensity-modulated-proton-therapy"],
    terms: ["relative-biological-effectiveness", "linear-energy-transfer", "alpha-beta-ratio", "bragg-peak"],
    links: [{ label: "DOI", url: "https://doi.org/10.1016/j.ijrobp.2014.07.001" }],
  }),
];
