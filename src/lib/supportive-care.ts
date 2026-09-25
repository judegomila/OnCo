import type { Graph } from "./graph";
import type { Drug, Entity } from "./schema";

/**
 * Supportive care medicines: products whose approved indications are symptom control, toxicity rescue or prophylaxis,
 * or infection prophylaxis rather than treatment of the cancer. They stay in the corpus as drugs (the side-effect,
 * living-with and regimen pages need them) but carry `supportive: true`, set from src/data/supportive-drugs.ts, so
 * that they never read as cancer treatments: a "Supportive care" pill on the record page, a Purpose facet on /drugs/,
 * and exclusion from every count or ranking labelled treatments or products.
 *
 * Pure module: safe on the server, the client and in scripts.
 */

export const SUPPORTIVE_LABEL = "Supportive care";
export const TREATMENT_LABEL = "Treatment or test";
/** Facet key on the /drugs/ browser. */
export const SUPPORTIVE_FACET = "purpose";

/** A hand holding a heart, drawn at 24 by 24 with a 2 px stroke like the other pill glyphs. */
export const SUPPORTIVE_GLYPH = "M12 20l-6.5-6.5a3.5 3.5 0 0 1 5-5L12 10l1.5-1.5a3.5 3.5 0 0 1 5 5L12 20z M4 14H2M22 14h-2";

export const supportiveTip = () =>
  "A supportive care medicine: approved to control symptoms, prevent or rescue treatment toxicity, or prevent infection. It does not treat the cancer itself, so it is left out of treatment counts and rankings.";

export const supportiveTableHref = () => `/drugs/?${SUPPORTIVE_FACET}=${encodeURIComponent(SUPPORTIVE_LABEL)}`;

/**
 * The rule the EMA and FDA fetchers apply to a label indication: supportive when the text names symptom control,
 * toxicity rescue or prophylaxis, or infection prophylaxis, and names no antitumour purpose (a cancer, tumour, disease
 * or malignancy as the thing treated). A text that names both (megestrol: appetite and palliative treatment of breast
 * cancer; dexamethasone: antiemetic and multiple myeloma) is not supportive, and an editor decides.
 */
const SUPPORTIVE_TEXT = /\b(nausea|vomiting|emetogenic|antiemetic|neutropeni[ac]|febrile|anaemia|anemia|erythropoie|transfusion|thrombocytopeni[ac]|mucositis|stomatitis|xerostomia|dry mouth|ototoxicity|cardiotoxicity|cardiomyopathy|nephrotoxicity|renal toxicity|haemorrhagic cystitis|hemorrhagic cystitis|extravasation|overdose|antidote|rescue|toxic plasma|delayed clearance|hypercalc[ae]mia|skeletal-related events|bone loss|osteoporosis|bone metastases|bone pain|pain\b|analgesi|opioid|constipation|diarrh(?:o)?ea|appetite|cachexia|anorexia|weight loss|mobili[sz]ation|stem cell collection|graft-versus-host|gvhd|veno-occlusive|cytokine release|infections?|prophylaxis|hypogammaglobulin|immunoglobulin|myelosuppression|myeloprotect|radioprotect|neuroprotect|tumou?r lysis|uric acid|carcinoid syndrome|pleural effusion|pleurodesis)/i;
const DISEASE = "(?:cancers?|carcinomas?|tumou?rs?|neoplasms?|malignanc(?:y|ies)|leuk(?:a)?emias?|lymphomas?|myeloma|sarcomas?|melanoma|gliomas?|glioblastoma|blastomas?|myelodysplastic syndromes?|myelofibrosis|polycyth(?:a)?emia|mesothelioma)";
/** The disease word names the thing treated, not a setting: "cancer pain", "cancer patients", "malignancies receiving chemotherapy" do not count. */
const NOT_SETTING = "(?![ -](?:pain|patients?|related|induced|associated|chemotherapy|therapy|treatment|on |receiving|undergoing|with bone|who))";
const ANTITUMOUR_TEXT = new RegExp(`\\b(?:treatment of|therapy of|therapy for|management of|first-line|second-line|later-line|adjuvant|neoadjuvant|maintenance treatment|consolidation)\\b[^.;]{0,60}?\\b${DISEASE}${NOT_SETTING}|\\b(?:metastatic|advanced|relapsed|refractory|unresectable|newly diagnosed|recurrent|locally advanced|high-risk|early)\\b(?: [a-z0-9+-]+){0,4} ${DISEASE}${NOT_SETTING}`, "i");

/** A disease word that is the head of its clause (no setting preposition in the 40 characters before it) names the thing treated: "Squamous cell carcinomas, Hodgkin lymphoma, malignant pleural effusion". */
const DISEASE_HEAD = new RegExp(`(?:^|[,;:] ?)(?:(?!\\b(?:in|with|from|of|for|due to|receiving|on|after|at risk|associated|related|undergoing|treated)\\b)[^,;:]){0,40}?\\b${DISEASE}${NOT_SETTING}`, "i");

/** True when an indication text reads as supportive care under the stated rule. */
export function isSupportiveIndication(text: string): boolean {
  const t = text.replace(/\s+/g, " ");
  if (!SUPPORTIVE_TEXT.test(t)) return false;
  // "Prevention of skeletal-related events in bone metastases from solid tumours" and "chronic cancer pain" name a tumour
  // as the setting, not as the thing treated; the antitumour tests ask for a treatment phrase or disease-stage word
  // before the disease word, or for the disease word to head its clause, and for it not to qualify pain, patients or therapy.
  return !ANTITUMOUR_TEXT.test(t) && !DISEASE_HEAD.test(t);
}

/** True when a drug record carries the supportive care flag. */
export const isSupportive = (d: Pick<Drug, "supportive">): boolean => d.supportive === true;

/** Drug records that are treatments or tests: the corpus drugs minus the supportive care medicines. */
export function treatments(g: Graph): Drug[] {
  return g.kind("drug").filter((d) => !isSupportive(d));
}

/** Split a list of referenced ids into treatments (and non-drug records) and supportive care medicines. */
export function splitSupportive(g: Graph, ids: string[]): { treatments: string[]; supportive: string[] } {
  const supportive: string[] = [], rest: string[] = [];
  for (const id of ids) {
    const e: Entity | undefined = g.get(id);
    (e?.kind === "drug" && isSupportive(e) ? supportive : rest).push(id);
  }
  return { treatments: rest, supportive };
}
