"use client";

import dynamic from "next/dynamic";
import { STRUCTURES } from "@/lib/structures";
export { hasMolecule } from "@/lib/structures";

// The canvas drawing code (Molecule3D, molecule-draw, molecule-render, Wireframe3D) loads with the first thumbnail
// that actually has a structure, not with every page that mentions a drug. The server still prerenders the canvas
// (ssr stays on), so the markup and the slot's size are unchanged while the chunk arrives.
const Molecule3D = dynamic(() => import("./Molecule3D").then((m) => m.Molecule3D), {
  loading: () => <span className="block h-full w-full" aria-hidden />,
});

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
