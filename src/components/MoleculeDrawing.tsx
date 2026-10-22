"use client";

import { Molecule3D } from "./Molecule3D";
import { STRUCTURES } from "@/lib/structures";

/** The drawing half of MoleculeThumb: loaded with the canvas code, so the 120 KB structure index travels with it rather than with every page. */
export default function MoleculeDrawing({ drugId, className }: { drugId: string; className?: string }) {
  const entry = STRUCTURES[drugId]?.[0];
  if (!entry) return null;
  return <Molecule3D entry={entry} compact className={className} />;
}
