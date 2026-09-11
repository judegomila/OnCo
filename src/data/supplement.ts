import type { EntityInput } from "@/lib/schema";

/**
 * A partial record for an entity that another spike defines in full.
 *
 * Spikes overlap: the colorectal spike owns bevacizumab, and the ovarian spike also needs to attach
 * its trials, terms and a few extra approval rows to it. Writing a second full record leaves two
 * summaries, two mechanisms and two sets of approvals for one molecule, of which only the first is
 * ever shown (see mergeDuplicates in ./spikes/index.ts). A supplement carries only what the second spike
 * adds: relationship arrays, links, notes and approval rows the full record lacks. Scalar fields come
 * from the full record at merge time, whichever spike is registered first.
 *
 * Validation happens on the merged record, so a supplement whose full record disappears fails the
 * build loudly with the entity id in the message.
 */
export function supplement<T extends EntityInput>(partial: { id: string; kind: T["kind"] } & Partial<T>): T {
  return partial as unknown as T;
}
