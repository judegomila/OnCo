import { norm } from "../src/lib/completeness";
import { graph } from "../src/lib/graph";
/**
 * A match key that names only a radiolabel ("177lu", "68ga", "18f") is not a product. drugKeys() splits a bracketed
 * qualifier into keys of its own, so "FAP-2286 (177Lu / 68Ga)" gave "177lu" and "68ga", and the trial fetchers then
 * matched every intervention written "Lutetium (177Lu) ..." to FAP-2286: six of its seven trials were Lutathera,
 * Pluvicto, rhPSMA-10.1, TLX591 and a GE imaging agent, each with a TL;DR saying it was a trial of FAP-2286
 * (found 19 October 2026). Every fetcher that matches interventions by drugKeys() drops these keys.
 */

/** The radionuclides used in oncology imaging and therapy, as "mass symbol". A code that merely looks like one (AT-101, TH-302, N-803) is not listed. */
const ISOTOPES = new Set(["177 lu", "68 ga", "67 ga", "18 f", "225 ac", "131 i", "123 i", "124 i", "125 i", "90 y", "86 y", "64 cu", "67 cu", "212 pb", "203 pb", "89 zr", "99m tc", "99 tc", "111 in", "223 ra", "153 sm", "89 sr", "166 ho", "188 re", "186 re", "211 at", "213 bi", "212 bi", "227 th", "161 tb", "44 sc", "47 sc", "11 c", "13 n", "15 o"]);

/** Element symbol and mass number only, in either order: "177lu", "lu 177", "68ga", "18f", "i 131". */
export function isLabelKey(k: string): boolean {
  const s = k.trim();
  const massFirst = s.match(/^(\d{1,3}m?)\s?([a-z]{1,2})$/);
  if (massFirst) return ISOTOPES.has(`${massFirst[1]} ${massFirst[2]}`);
  const symbolFirst = s.match(/^([a-z]{1,2})\s?(\d{1,3}m?)$/);
  return !!symbolFirst && ISOTOPES.has(`${symbolFirst[2]} ${symbolFirst[1]}`);
}

/**
 * A key that is the name of a target is not a product either. The alias "Mesothelin/FAP Dual-Target CAR-NK Cells"
 * splits into "mesothelin", which matched a mesothelin and Claudin 18.2 CAR-T trial to EB-MF-CAR-NK-01; a companion
 * diagnostic named for its genes gave "egfr", "kras" and "braf". Built once from the corpus targets.
 */
let targetNames: Set<string> | null = null;
export function isTargetKey(k: string): boolean {
  if (!targetNames) {
    targetNames = new Set();
    for (const t of graph().kind("target")) for (const s of [t.name, t.name.replace(/\s*\(.*\)$/, ""), ...t.aka, t.id]) targetNames.add(norm(s));
  }
  return targetNames.has(k.trim());
}

/** Keys a fetcher must not match an intervention on. */
export const isNotAProductKey = (k: string): boolean => isLabelKey(k) || isTargetKey(k);
