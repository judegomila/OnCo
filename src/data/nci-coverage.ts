/**
 * NCI A to Z coverage (September 2026): cancer types from https://www.cancer.gov/types that had
 * no record in the corpus, with depth on paediatric and rare cancers, plus the paediatric-specific
 * fronts (landmark trials, cooperative groups, regulatory levers, survivorship).
 *
 * The diff that produced this set is src/data/universe-lists/nci-cancer-types.json.
 * Baseline records, not deep dives: each has a summary, standard of care, state of the art,
 * a dated history and sourced links. Deep dives can be layered on later via spikes/<id>.ts.
 */
import type { EntityInput } from "@/lib/schema";
import { nciPaediatricCancers } from "./spikes/nci-paediatric";
import { nciRareSolidCancers } from "./spikes/nci-rare-solid";
import { nciRareOtherCancers } from "./spikes/nci-rare-other";
import { paediatricFronts } from "./paediatric-fronts";

export const nciCoverage: EntityInput[] = [
  ...nciPaediatricCancers,
  ...nciRareSolidCancers,
  ...nciRareOtherCancers,
  ...paediatricFronts,
];
