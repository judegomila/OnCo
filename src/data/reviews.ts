/**
 * Review sign-offs, keyed by entity id. Two tracks:
 *
 *  - expert:   a named clinician or scientist read the page on the date given and considers it
 *              accurate and fairly framed as of that date. Not an endorsement of any product.
 *  - advocate: a named patient advocate (or advocacy organisation) reviewed the TL;DR and
 *              patient-facing sections for clarity, tone, and completeness from a patient's view.
 *
 * `coi` is a plain-language conflict-of-interest statement (funding, employment, advisory
 * roles, equity) and is displayed next to the badge. "None declared" is a valid value.
 *
 * `personId` is optional: when the reviewer has a `person` record in the corpus, set it and the
 * badge and the roster at /reviewers/ link to that page.
 *
 * Reviews are proposed through the "Review this page" issue form (.github/ISSUE_TEMPLATE/review.yml,
 * opened from /review/ or from the badge on any unreviewed page); a maintainer verifies identity
 * and adds the entry here. See CONTRIBUTING.md, "Review tracks".
 *
 * Example:
 *   "tnbc": [
 *     { track: "expert", reviewer: "Dr A. Example", role: "Breast medical oncologist, Example Cancer Center", date: "2026-10-01", coi: "Advisory boards for Gilead and AstraZeneca (2024-26)", note: "Standard-of-care table checked against NCCN v3.2026.", personId: "a-example" },
 *     { track: "advocate", reviewer: "B. Example", role: "Living Beyond Breast Cancer", date: "2026-10-03", coi: "None declared", note: "TL;DRs and questions list reviewed for clarity." },
 *   ],
 */
export type Review = { track: "expert" | "advocate"; reviewer: string; role: string; date: string; coi: string; note?: string; url?: string; personId?: string };

export const reviews: Record<string, Review[]> = {};
