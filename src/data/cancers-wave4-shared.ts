/**
 * Wave 4 cancer pages (docs/CANCER-PAGES.md): a new page must arrive with an inbound link or the orphan ratchet
 * (src/data/orphans.test.ts) fails. Records in a family file link each other through `related`, but a hand-written list
 * can leave one record that nothing points at. `linkSiblings` closes that gap mechanically: any record no other record
 * in the file names in `related` is added to the `related` of a sibling with the same parent that still has room under
 * the six-sibling cap the cancer-families test enforces (or, failing that, of any record in the file).
 */
import type { CancerInput } from "@/lib/schema";

const MAX_SIBLINGS = 6;

export function linkSiblings(records: CancerInput[]): CancerInput[] {
  const ids = new Set(records.map((r) => r.id));
  const referenced = new Set<string>();
  for (const r of records) for (const id of r.related ?? []) if (ids.has(id)) referenced.add(id);
  const byParent = (p: string | undefined) => records.filter((r) => r.parent === p);
  for (const r of records) {
    if (referenced.has(r.id)) continue;
    const siblings = byParent(r.parent).filter((s) => s.id !== r.id);
    // Siblings outside this file (the corpus's earlier subtype pages) also count towards the cap, so every related id
    // other than the parent is treated as a possible sibling; conservative, but it never overfills a record.
    const host = siblings.find((s) => {
      const n = (s.related ?? []).filter((id) => id !== s.parent).length;
      return n < MAX_SIBLINGS && !(s.related ?? []).includes(r.id);
    }) ?? records.find((s) => s.id !== r.id && s.parent !== r.parent && !(s.related ?? []).includes(r.id));
    if (!host) continue;
    host.related = [...(host.related ?? []), r.id];
    referenced.add(r.id);
  }
  return records;
}
