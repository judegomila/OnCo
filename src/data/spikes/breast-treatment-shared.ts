import type { TermInput, TrialInput } from "@/lib/schema";

/**
 * Constants shared by the breast treatment files (./breast-treatment.ts and ./breast-treatment-trials-*.ts).
 * Not a spike: registered in NON_SPIKE_FILES in scripts/spike-sources.ts.
 *
 * Scope. These files carry the part of breast cancer treatment that is the same whichever receptor result comes
 * back: the operation on the breast, the operation on the axilla, radiotherapy, reconstruction, and the choice
 * between giving drugs before or after surgery. The drugs themselves belong to the receptor subtype pages
 * (./breast-hr-positive.ts, ./breast-her2-positive.ts, ./tnbc-treatment.ts) and are not repeated here.
 *
 * Every publication below was read through Europe PMC on 25 September 2026 and every figure is quoted from that
 * paper's own results text. Each long-term report was read in preference to the first one: the point of the
 * conservation and axillary trials is that the answer held at twenty and twenty-five years, and the five-year
 * papers cannot show that.
 *
 * Every NICE recommendation number below was read from the guidance page itself on 25 September 2026, not recalled.
 * Three of those readings are worth stating here because they surprise people:
 *
 *   - NICE NG101 recommendation 1.13.13 offers 26 Gy in five fractions over one week as the default schedule for
 *     partial-breast, whole-breast or chest-wall radiotherapy without nodal irradiation. England moved to one week
 *     as standard, not as an option.
 *   - NICE NG101 recommendation 1.13.16 keeps 40 Gy in fifteen fractions whenever the regional nodes are treated,
 *     so the one-week schedule stops at the edge of the axilla.
 *   - NICE TA501 does NOT recommend the Intrabeam intraoperative radiotherapy system for routine commissioning,
 *     although the TARGIT-A trial met its non-inferiority margin and the device is used in 35 countries.
 */
export const asOf = "2026-09-25";
export const BREAST = "breast-cancer";
/** The three receptor subtype pages this layer points at rather than repeating. */
export const SUBTYPES = ["breast-hr-positive", "breast-her2-positive", "tnbc"];

export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const isrctn = (n: string) => ({ label: `ISRCTN${n}`, url: `https://www.isrctn.com/ISRCTN${n}` });
export const doi = (label: string, id: string) => ({ label, url: `https://doi.org/${id}` });
export const nice = (ref: string, label: string) => ({ label, url: `https://www.nice.org.uk/guidance/${ref}` });
const D = (id: string) => `https://doi.org/${id}`;

export const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
export const term = (x: Omit<TermInput, "kind" | "asOf">): TermInput => ({ kind: "term", asOf, ...x });

/** Papers quoted more than once, as DOIs read through Europe PMC on 25 September 2026. */
export const SRC = {
  // Breast conservation against mastectomy: the long-term reports
  nsabpB06: D("10.1056/NEJMoa022152"), milan: D("10.1056/NEJMoa020989"),
  eortc10801: D("10.1016/S1470-2045(12)70042-6"), nsabpB04: D("10.1056/NEJMoa020128"),
  // The axilla
  nsabpB32: D("10.1016/S1470-2045(10)70207-2"), almanac: D("10.1093/jnci/djj158"),
  z0011: D("10.1001/jama.2017.11470"), amaros: D("10.1200/JCO.22.01565"),
  ibcsg2301: D("10.1016/S1470-2045(18)30380-2"), sound: D("10.1001/jamaoncol.2023.3759"),
  senomac: D("10.1056/NEJMoa2313487"), insema: D("10.1056/NEJMoa2412063"),
  posnocProtocol: D("10.1136/bmjopen-2021-054365"),
  z1071: D("10.1001/jama.2013.278932"), tad: D("10.1200/JCO.2015.64.0094"),
  // Radiotherapy
  ebctcgBcs: D("10.1016/S0140-6736(11)61629-2"), ebctcgPmrt: D("10.1016/S0140-6736(14)60488-8"),
  boost: D("10.1016/S1470-2045(14)71156-8"), startTenYear: D("10.1016/S1470-2045(13)70386-3"),
  fast: D("10.1200/JCO.19.02750"), rapid: D("10.1016/S0140-6736(19)32515-2"),
  targit: D("10.1136/bmj.m2836"), supremo: D("10.1056/NEJMoa2412225"), b51: D("10.1056/NEJMoa2414859"),
  darbyHeart: D("10.1056/NEJMoa1209825"),
  // Reconstruction
  ibra: D("10.1016/S1470-2045(18)30781-2"), preBra: D("10.1093/bjs/znac077"), preBraPro: D("10.1093/bjs/znaf032"),
  bestBra: D("10.1136/bmjopen-2021-050886"),
  mrocOutcomes: D("10.1001/jamasurg.2018.1677"), mrocComplications: D("10.1001/jamasurg.2018.1687"),
  biaAlcl: D("10.1001/jamaoncol.2017.4510"),
  // Sequencing
  ebctcgNeoadjuvant: D("10.1016/S1470-2045(17)30777-5"),
  // The de-escalation portfolio itself
  deEscalationMap: D("10.1038/s41523-025-00744-9"),
  // Guidelines (reference number and recommendation chapter read on nice.org.uk, 25 September 2026)
  ng101: "https://www.nice.org.uk/guidance/ng101",
  ta501: "https://www.nice.org.uk/guidance/ta501",
  nccnBreast: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1419",
  esmoBreast: "https://www.esmo.org/guidelines/esmo-clinical-practice-guidelines-breast-cancer",
};
