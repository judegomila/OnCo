import type { Lang } from "@/lib/layer";

/**
 * Translation review track. Every translated TL;DR in src/data/i18n/*.ts is machine-assisted and
 * unreviewed until a named speaker of the language signs it off here. `TldrText` shows
 * "MT" (machine-assisted) until an entry exists, then "Reviewed"; /review/ shows coverage per language.
 *
 * Entries are proposed through the "Translation review" issue form
 * (.github/ISSUE_TEMPLATE/translation-review.yml); a maintainer verifies identity and adds them.
 *
 * Example:
 *   "tnbc": [{ lang: "es", reviewer: "C. Ejemplo", role: "Oncology nurse, native Spanish speaker", date: "2026-10-05", note: "Terminology aligned with SEOM patient guides." }],
 */
export type TranslationReview = { lang: Exclude<Lang, "en">; reviewer: string; role?: string; date: string; note?: string; url?: string; coi?: string };

export const reviewed: Record<string, TranslationReview[]> = {};
