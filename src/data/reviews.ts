/**
 * Expert review sign-offs, keyed by entity id.
 *
 * A review means a named clinician, scientist, or patient advocate read the page on the
 * date given and considers it accurate and fairly framed as of that date. It is not an
 * endorsement of any product. Reviewers are credited by name and role; add yourself via PR
 * after reviewing (see CONTRIBUTING.md, "Expert review track").
 *
 * Example:
 *   "tnbc": { reviewer: "Dr A. Example", role: "Breast medical oncologist, Example Cancer Center", date: "2026-10-01", note: "Standard-of-care table checked against NCCN v3.2026." },
 */
export type Review = { reviewer: string; role: string; date: string; note?: string; url?: string };

export const reviews: Record<string, Review> = {};
