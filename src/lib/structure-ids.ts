import ids from "../data/structure-ids.json";

/**
 * Which products have a structure to draw, as ids only: about 10 KB against the 120 KB of public/structures/index.json.
 * MoleculeSlot and MoleculeThumb are client components mounted wherever a drug is named, including the command palette
 * in the header, so importing the full index put it on every page. They need only this answer to lay out the slot;
 * the entry itself is read by MoleculeDrawing, which loads with the drawing code. Kept in step with the index by
 * scripts/fetch-structures.ts and scripts/fill-structures.ts, and checked by src/lib/structure-ids.test.ts.
 */
const HAS = new Set<string>(ids as string[]);
export function hasStructure(drugId: string): boolean {
  return HAS.has(drugId);
}
