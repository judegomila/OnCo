"use client";

import { Molecule3D } from "./Molecule3D";
import { STRUCTURES } from "@/lib/structures";
export { hasMolecule } from "@/lib/structures";

/**
 * Tiny slowly rotating model of a product's molecule (first structure entry: the payload for ADCs, the drug itself
 * for small molecules, the antibody backbone for biologics). Ball-and-stick for small molecules, backbone ribbon for
 * proteins; no toolbar or legend, about 30 fps, pauses off-screen, static under prefers-reduced-motion.
 * Used wherever a drug is mentioned.
 */
export function MoleculeThumb({ drugId, className = "h-24" }: { drugId: string; className?: string }) {
  const entry = STRUCTURES[drugId]?.[0];
  if (!entry) return null;
  return <Molecule3D entry={entry} compact className={className} />;
}
