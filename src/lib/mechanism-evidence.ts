import type { MechanismEvidence } from "./scoped-evidence";

type Edge = { evidence?: MechanismEvidence[] };
const bases = (edge: Edge) => new Set((edge.evidence ?? []).map(e => e.basis));

/**
 * Whether a drawn link may carry the "blocked" and "escape route" illustration. A link with no evidence is the
 * textbook relay the diagram has always drawn, and a link observed in a cited experiment is better supported than
 * that, so both carry it. Only a link that rests on a hypothesis or a model is kept out: lighting up everything
 * below it would present a proposal as an effect.
 */
export function supportsPathIllustration(edge: Edge): boolean {
  return !edge.evidence?.some(e => e.basis !== "observed");
}

/** The reader's label for what a link rests on. The context and limits are in the list under the diagram. */
export function mechanismEvidenceLabel(edge: Edge): string | undefined {
  const b = bases(edge);
  if (!b.size) return undefined;
  if (b.size !== 1) return "Mixed evidence";
  return b.has("hypothesis") ? "Hypothesis" : b.has("model-derived") ? "From a model" : "Seen in a cited experiment";
}

/** One word for the small mark beside the arrow. */
export function mechanismEvidenceMark(edge: Edge): string | undefined {
  const b = bases(edge);
  if (!b.size) return undefined;
  if (b.size !== 1) return "mixed";
  return b.has("hypothesis") ? "hypothesis" : b.has("model-derived") ? "model" : "sourced";
}
