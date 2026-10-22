"use client";

import dynamic from "next/dynamic";
import { hasStructure } from "@/lib/structure-ids";
export { hasStructure as hasMolecule } from "@/lib/structure-ids";

// The canvas drawing code (Molecule3D, molecule-draw, molecule-render, Wireframe3D) loads with the first thumbnail
// that actually has a structure, not with every page that mentions a drug. The server still prerenders the canvas
// (ssr stays on), so the markup and the slot's size are unchanged while the chunk arrives.
const MoleculeDrawing = dynamic(() => import("./MoleculeDrawing"), {
  loading: () => <span className="block h-full w-full" aria-hidden />,
});

/**
 * Tiny slowly rotating model of a product's molecule (first structure entry: the payload for ADCs, the drug itself
 * for small molecules, the antibody backbone for biologics). Ball-and-stick for small molecules, backbone ribbon for
 * proteins; no toolbar or legend, about 30 fps, pauses off-screen, static under prefers-reduced-motion.
 * Used wherever a drug is mentioned.
 */
export function MoleculeThumb({ drugId, className = "h-24" }: { drugId: string; className?: string }) {
  if (!hasStructure(drugId)) return null;
  return <MoleculeDrawing drugId={drugId} className={className} />;
}
