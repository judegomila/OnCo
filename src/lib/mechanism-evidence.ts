import type { MechanismEvidence } from "./scoped-evidence";

type Edge = { evidence?: MechanismEvidence[] };

/** Existing unscoped illustrations have no context join; do not propagate through newly scoped claims. */
export function supportsPathIllustration(edge: Edge): boolean {
  return !edge.evidence?.length;
}

export function mechanismEvidenceLabel(edge: Edge): string | undefined {
  if (!edge.evidence?.length) return undefined;
  const bases = new Set(edge.evidence.map(e => e.basis));
  if (bases.size !== 1) return "Scoped evidence";
  return bases.has("hypothesis") ? "Hypothesis" : bases.has("model-derived") ? "Model-derived" : "Reported in a specified context";
}
