/** Helpers for the forest plot: comparable setting buckets and endpoint family labels. */
export const FAMILY_LABEL: Record<string, string> = { os: "Overall survival", pfs: "Progression-free survival", efs: "Event-free survival", dfs: "Disease-free survival", mfs: "Metastasis-free survival", other: "Other time-to-event" };

/** Bucket the free-text trial setting into a handful of comparable stages. */
export function settingClass(setting: string): string {
  const s = setting.toLowerCase();
  if (/neoadjuvant|perioperative|before surgery|pre-?operative/.test(s)) return "Neoadjuvant or perioperative";
  if (/adjuvant|after surgery|post-?operative|early-stage|early stage|stage i\b|stage ii\b|stage iii\b|resect|localised|localized|consolidation|maintenance after/.test(s)) return "Adjuvant, early stage or consolidation";
  if (/screening|detection|surveillance/.test(s)) return "Screening or detection";
  if (/first-line|\b1l\b|untreated|newly diagnosed|front-line|treatment-na[iï]ve|hormone-sensitive|castration-sensitive/.test(s)) return "First-line advanced";
  if (/second-line|third-line|later-line|previously treated|relapsed|refractory|pretreated|after progression|\b2l\b|\b3l\b|castration-resistant|prior/.test(s)) return "Later-line advanced";
  if (/metastatic|advanced|unresectable/.test(s)) return "Advanced, line unspecified";
  return "Other or unspecified";
}
