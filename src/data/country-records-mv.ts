import type { EntityInput } from "@/lib/schema";

/**
 * Records behind /countries/mv/ (wave 15). Deliberately empty. The two bodies the page relies on already exist and are
 * linked, not repeated: `igmh-maldives` (src/data/institutions/countries-2026-11-asia-pacific.ts) and
 * `cancer-society-of-maldives` (src/data/institutions/uicc-societies.ts).
 *
 * No new record was written on 16 November 2026 because no primary source could be read for the bodies that would
 * deserve one: the insurer Aasandha's site refused a script (HTTP 403), the Maldives Food and Drug Authority's site
 * showed a maintenance notice, and the National Social Protection Agency's scheme pages were not read. What the page says
 * about them comes from the National Cancer Control Plan 2022-2026 and the Ministry of Health's publications pages,
 * which is enough for a card and too thin for a record. The one Maldivian cancer paper found with a DOI
 * (10.1055/s-0043-1764158) has no indexed abstract, so it was not made a record either.
 */
export const recordsMV: EntityInput[] = [];
