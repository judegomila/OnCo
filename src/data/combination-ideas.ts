import type { CombinationIdea } from "@/lib/modular";

/**
 * Combinations of parts that have been proposed but not yet tried in a medicine the corpus knows: the
 * "Proposed, not yet tried" rows of each format page under /pipeline/engine/<format>/.
 *
 * One entry per proposal. `format` is the engine format id (adc, radioligand, car-t, tcr-t, bispecific, degrader,
 * small-molecule, antibody, cytokine, vaccine, oncolytic-virus, cell-therapy); `a` and `b` are the component ids of
 * that format's two grid axes exactly as the engine names them (a target id such as "her2", a payload class such
 * as "topoisomerase-i-payloads", an isotope such as "ac-225", a costimulatory domain such as "4-1bb", an E3 ligase
 * such as "cereblon"), so the proposal lands in the cell it belongs to and the page can say whether the corpus has
 * since recorded a medicine there. `rationale` is one or two plain sentences; `evidence` links the paper, patent,
 * abstract or preprint that makes the case (never empty: a proposal without a source is not recorded); `refs` names
 * corpus records that carry it (an idea, a key paper, a trial); `proposedBy` and `on` (YYYY-MM-DD) say who and when.
 *
 * Nothing here is a fact about a medicine: these are proposals, shown apart from the recorded grid.
 */
export const combinationIdeas: CombinationIdea[] = [];
