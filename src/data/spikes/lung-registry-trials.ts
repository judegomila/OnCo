import type { TrialInput } from "@/lib/schema";
import { lungRegistryTrials1 } from "./lung-registry-trials-1";
import { lungRegistryTrials2 } from "./lung-registry-trials-2";

/**
 * LUNG CANCER: the registry snapshot, in one list. The records themselves live in ./lung-registry-trials-1.ts and
 * ./lung-registry-trials-2.ts, split only so no single file is unmanageable; the generator, the search that produced
 * them and the rules for what is left out are documented at the top of part 1. Every record here is linked from the
 * glossary term `lung-trials-open-today` (./lung-treatment.ts), so none is an orphan.
 */
export const lungRegistryTrials: TrialInput[] = [...lungRegistryTrials1, ...lungRegistryTrials2];

export const lungRegistryTrialIds = lungRegistryTrials.map((t) => t.id);
