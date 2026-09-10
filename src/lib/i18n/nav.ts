import type { Lang } from "@/lib/layer";
import type { NavGroup, NavItem } from "@/lib/nav";
import { navEs } from "./nav/es";
import { navZh } from "./nav/zh";
import { navPt } from "./nav/pt";
import { navHi } from "./nav/hi";
import { navFr } from "./nav/fr";
import { navDe } from "./nav/de";
import { navJa } from "./nav/ja";
import { navAr } from "./nav/ar";

/**
 * Navigation translations. src/lib/nav.ts stays the English source of truth; each language file maps
 *   "group:<id>"  to [label, blurb, short?]   for the six groups
 *   "<href>"      to [label, blurb]           for every item (items that appear in two groups share one entry)
 * Completeness is checked in src/lib/i18n/i18n.test.ts and by `npm run check:i18n`.
 */
export type NavText = [label: string, blurb: string, short?: string];
export type NavDict = Record<string, NavText>;

export const NAV_DICTS: Record<Exclude<Lang, "en">, NavDict> = { es: navEs, zh: navZh, pt: navPt, hi: navHi, fr: navFr, de: navDe, ja: navJa, ar: navAr };

export const groupKey = (g: Pick<NavGroup, "id">) => `group:${g.id}`;

/** Group label, short header label and blurb in `lang`; English when no translation exists. */
export function navGroupText(g: NavGroup, lang: Lang): { label: string; short: string; blurb: string } {
  const en = { label: g.label, short: g.short ?? g.label, blurb: g.blurb };
  if (lang === "en") return en;
  const x = NAV_DICTS[lang]?.[groupKey(g)];
  if (!x) return en;
  return { label: x[0], short: x[2] ?? x[0], blurb: x[1] };
}

/** Item label and blurb in `lang`; English when no translation exists. */
export function navItemText(it: NavItem, lang: Lang): { label: string; blurb: string } {
  const en = { label: it.label, blurb: it.blurb };
  if (lang === "en") return en;
  const x = NAV_DICTS[lang]?.[it.href];
  return x ? { label: x[0], blurb: x[1] } : en;
}
