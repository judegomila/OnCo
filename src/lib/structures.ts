import structureIndex from "../../public/structures/index.json";
import type { StructureEntry } from "@/components/Molecule3D";

export const STRUCTURES = structureIndex as Record<string, StructureEntry[]>;
/** Does this product have a 3D structure to show? Safe on server and client. */
export function hasMolecule(drugId: string): boolean {
  return !!STRUCTURES[drugId]?.length;
}
