/**
 * Clinical calculators used daily in oncology. Pure functions, no rounding until display, every formula cited.
 * All inputs are SI unless the function name says otherwise; conversion helpers are provided for mg/dL.
 *
 * Citations
 *  Mosteller RD. Simplified calculation of body-surface area. N Engl J Med 1987;317:1098. doi:10.1056/NEJM198710223171717
 *  Du Bois D, Du Bois EF. A formula to estimate the approximate surface area if height and weight be known. Arch Intern Med 1916;17:863-871.
 *  Calvert AH et al. Carboplatin dosage: prospective evaluation of a simple formula based on renal function. J Clin Oncol 1989;7:1748-1756. doi:10.1200/JCO.1989.7.11.1748
 *  Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron 1976;16:31-41. doi:10.1159/000180580
 *  Eisenhauer EA et al. New response evaluation criteria in solid tumours: revised RECIST guideline (version 1.1). Eur J Cancer 2009;45:228-247. doi:10.1016/j.ejca.2008.10.026
 *  Payne RB et al. Interpretation of serum calcium in patients with abnormal serum proteins. BMJ 1973;4:643-646. doi:10.1136/bmj.4.5893.643
 *  Lyon AR et al. 2022 ESC Guidelines on cardio-oncology (anthracycline dose equivalence table). Eur Heart J 2022;43:4229-4361. doi:10.1093/eurheartj/ehac244
 *  FDA / NCI CTEP. Carboplatin dosing with capped GFR (2010 action letter): cap estimated GFR at 125 mL/min when derived from IDMS-standardised creatinine.
 *  NHS England. National dose banding tables for SACT (2016 onwards): bands within ±6% of the calculated dose.
 */

export const CITATIONS = {
  mosteller: { label: "Mosteller, NEJM 1987", url: "https://doi.org/10.1056/NEJM198710223171717" },
  dubois: { label: "Du Bois & Du Bois, Arch Intern Med 1916", url: "https://doi.org/10.1001/archinte.1916.00080130010002" },
  calvert: { label: "Calvert et al., JCO 1989", url: "https://doi.org/10.1200/JCO.1989.7.11.1748" },
  gfrCap: { label: "FDA/NCI CTEP carboplatin dosing action letter, 2010 (GFR cap 125 mL/min)", url: "https://ctep.cancer.gov/protocoldevelopment/docs/carboplatin_information_letter.pdf" },
  cockcroftGault: { label: "Cockcroft & Gault, Nephron 1976", url: "https://doi.org/10.1159/000180580" },
  recist: { label: "Eisenhauer et al., RECIST 1.1, Eur J Cancer 2009", url: "https://doi.org/10.1016/j.ejca.2008.10.026" },
  payne: { label: "Payne et al., BMJ 1973 (albumin-corrected calcium)", url: "https://doi.org/10.1136/bmj.4.5893.643" },
  esc: { label: "ESC 2022 cardio-oncology guideline (anthracycline equivalence)", url: "https://doi.org/10.1093/eurheartj/ehac244" },
  ctcae: { label: "CTCAE v5.0 (neutrophil count grades)", url: "https://ctep.cancer.gov/protocoldevelopment/electronic_applications/ctc.htm" },
  doseBanding: { label: "NHS England national dose banding for SACT", url: "https://www.england.nhs.uk/cancer/cdf/chemotherapy-dose-standardisation/" },
} as const;

/** Mosteller: BSA = sqrt(height_cm × weight_kg / 3600). */
export function bsaMosteller(heightCm: number, weightKg: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

/** Du Bois: BSA = 0.007184 × weight^0.425 × height^0.725. */
export function bsaDuBois(heightCm: number, weightKg: number): number {
  return 0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725);
}

/** Cockcroft-Gault creatinine clearance in mL/min; creatinine in µmol/L. Female × 0.85. */
export function cockcroftGault(ageYears: number, weightKg: number, creatinineUmolL: number, female: boolean): number {
  const mgdl = creatinineUmolL / 88.4;
  return ((140 - ageYears) * weightKg * (female ? 0.85 : 1)) / (72 * mgdl);
}

/** Convert creatinine mg/dL to µmol/L (× 88.4). */
export const creatinineMgdlToUmol = (mgdl: number) => mgdl * 88.4;

/**
 * Calvert: carboplatin dose (mg) = target AUC × (GFR + 25). GFR is capped at 125 mL/min by default per the
 * FDA/CTEP letter when creatinine is IDMS-standardised; pass `capGfr: false` to disable.
 */
export function calvert(targetAuc: number, gfrMlMin: number, capGfr = true): { dose: number; gfrUsed: number; capped: boolean } {
  const gfrUsed = capGfr ? Math.min(gfrMlMin, 125) : gfrMlMin;
  return { dose: targetAuc * (gfrUsed + 25), gfrUsed, capped: capGfr && gfrMlMin > 125 };
}

/** Absolute neutrophil count (× 10⁹/L) from WBC and percentages of segmented neutrophils and bands. */
export function anc(wbc: number, segPct: number, bandPct = 0): number {
  return wbc * ((segPct + bandPct) / 100);
}

/** CTCAE v5.0 grade for neutrophil count decrease (× 10⁹/L); 0 = within normal limits. */
export function ancGrade(ancValue: number): 0 | 1 | 2 | 3 | 4 {
  if (ancValue < 0.5) return 4;
  if (ancValue < 1.0) return 3;
  if (ancValue < 1.5) return 2;
  if (ancValue < 2.0) return 1;
  return 0;
}

/** Albumin-corrected calcium (mmol/L): Ca + 0.02 × (40 − albumin g/L) (Payne). */
export function correctedCalcium(calciumMmolL: number, albuminGL: number): number {
  return calciumMmolL + 0.02 * (40 - albuminGL);
}

/** Albumin-corrected calcium in mg/dL: Ca + 0.8 × (4.0 − albumin g/dL). */
export function correctedCalciumMgdl(calciumMgdl: number, albuminGdl: number): number {
  return calciumMgdl + 0.8 * (4 - albuminGdl);
}

export type RecistResponse = "CR" | "PR" | "SD" | "PD";

/**
 * RECIST 1.1 for target lesions. `baseline` and `nadir` are sums of diameters (mm). PR: ≥30% decrease from baseline.
 * PD: ≥20% increase from nadir AND ≥5 mm absolute increase (or new lesions). CR: all target lesions gone (sum 0, nodes <10 mm short axis).
 */
export function recist(baselineMm: number, nadirMm: number, currentMm: number, newLesions = false): { fromBaselinePct: number; fromNadirPct: number; absoluteFromNadirMm: number; response: RecistResponse } {
  const fromBaselinePct = baselineMm > 0 ? ((currentMm - baselineMm) / baselineMm) * 100 : 0;
  const fromNadirPct = nadirMm > 0 ? ((currentMm - nadirMm) / nadirMm) * 100 : (currentMm > 0 ? Infinity : 0);
  const absoluteFromNadirMm = currentMm - nadirMm;
  let response: RecistResponse;
  if (newLesions || (fromNadirPct >= 20 && absoluteFromNadirMm >= 5)) response = "PD";
  else if (currentMm === 0) response = "CR";
  else if (fromBaselinePct <= -30) response = "PR";
  else response = "SD";
  return { fromBaselinePct, fromNadirPct, absoluteFromNadirMm, response };
}

/** Doxorubicin-equivalent conversion factors from the ESC 2022 cardio-oncology guideline. */
export const ANTHRACYCLINE_FACTORS = { doxorubicin: 1, epirubicin: 0.8, daunorubicin: 0.6, idarubicin: 5, mitoxantrone: 10.5 } as const;
export type Anthracycline = keyof typeof ANTHRACYCLINE_FACTORS;

/** Cumulative doxorubicin-equivalent dose (mg/m²) from prior exposures. */
export function cumulativeAnthracycline(doses: Array<{ agent: Anthracycline; mgPerM2: number }>): { equivalent: number; parts: Array<{ agent: Anthracycline; mgPerM2: number; equivalent: number }> } {
  const parts = doses.map((d) => ({ ...d, equivalent: d.mgPerM2 * ANTHRACYCLINE_FACTORS[d.agent] }));
  return { equivalent: parts.reduce((a, p) => a + p.equivalent, 0), parts };
}

/** Threshold flags used by the ESC guideline: 250 mg/m² doxorubicin-equivalent marks higher cardiotoxicity risk; 400 mg/m² and above is very high. */
export function anthracyclineRisk(equivalent: number): "standard" | "raised" | "high" {
  if (equivalent >= 400) return "high";
  if (equivalent >= 250) return "raised";
  return "standard";
}

/**
 * Dose banding: round a calculated dose to the nearest band that keeps the deviation within `tolerancePct` (NHS
 * England uses 6%). `step` is the band spacing (e.g. 10 mg for most IV cytotoxics). Returns the banded dose and
 * whether it sits inside tolerance; if not, the caller should use the exact dose.
 */
export function doseBand(calculatedMg: number, step = 10, tolerancePct = 6): { banded: number; deviationPct: number; withinTolerance: boolean } {
  if (calculatedMg <= 0 || step <= 0) return { banded: calculatedMg, deviationPct: 0, withinTolerance: true };
  const banded = Math.round(calculatedMg / step) * step;
  const deviationPct = ((banded - calculatedMg) / calculatedMg) * 100;
  return { banded, deviationPct, withinTolerance: Math.abs(deviationPct) <= tolerancePct };
}

/** BSA-based dose in mg from a mg/m² dose, optionally capped at a BSA (many protocols cap at 2.0 or 2.2 m²). */
export function bsaDose(mgPerM2: number, bsa: number, capBsa?: number): { dose: number; bsaUsed: number; capped: boolean } {
  const bsaUsed = capBsa !== undefined ? Math.min(bsa, capBsa) : bsa;
  return { dose: mgPerM2 * bsaUsed, bsaUsed, capped: capBsa !== undefined && bsa > capBsa };
}

/** Weight-based dose in mg. */
export const weightDose = (mgPerKg: number, weightKg: number) => mgPerKg * weightKg;

/** Format a number with fixed decimals and en-GB grouping. */
export const fmt = (x: number, dp = 1) => (Number.isFinite(x) ? x.toLocaleString("en-GB", { minimumFractionDigits: dp, maximumFractionDigits: dp }) : "—");
