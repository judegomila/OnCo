import { openmedical, type OpenMedicalEntry } from "@/data/openmedical";

/** Registry entries mapped to a front (section id), verified records first, then by name. */
export function openMedicalForSection(sectionId: string): OpenMedicalEntry[] {
  return rank(openmedical.filter((e) => e.sections.includes(sectionId)));
}

/** Registry entries mapped directly to a technology id. */
export function openMedicalForTechnology(technologyId: string): OpenMedicalEntry[] {
  return rank(openmedical.filter((e) => e.technologies?.includes(technologyId)));
}

/** Registry entries mapped to a cancer id. */
export function openMedicalForCancer(cancerId: string): OpenMedicalEntry[] {
  return rank(openmedical.filter((e) => e.cancers?.includes(cancerId)));
}

/** Entries grouped by front, in the order of the given section ids; fronts with no entries are omitted. */
export function openMedicalBySection(sectionIds: string[]): Array<{ sectionId: string; entries: OpenMedicalEntry[] }> {
  return sectionIds.map((sectionId) => ({ sectionId, entries: openMedicalForSection(sectionId) })).filter((g) => g.entries.length > 0);
}

function rank(list: OpenMedicalEntry[]): OpenMedicalEntry[] {
  return [...list].sort((a, b) => Number(b.verified) - Number(a.verified) || a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}
