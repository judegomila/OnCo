import type { Lang } from "@/lib/layer";
import { EN, type UiDict } from "./ui";
import type { NavDict } from "./nav";
import { registerLang, type Other } from "./dict-store";
import { es } from "./ui/es";
import { zh } from "./ui/zh";
import { pt } from "./ui/pt";
import { hi } from "./ui/hi";
import { fr } from "./ui/fr";
import { de } from "./ui/de";
import { ja } from "./ui/ja";
import { ar } from "./ui/ar";
import { navEs } from "./nav/es";
import { navZh } from "./nav/zh";
import { navPt } from "./nav/pt";
import { navHi } from "./nav/hi";
import { navFr } from "./nav/fr";
import { navDe } from "./nav/de";
import { navJa } from "./nav/ja";
import { navAr } from "./nav/ar";

/**
 * Every chrome dictionary at once, for tests and scripts (src/lib/i18n/i18n.test.ts, scripts/check-i18n.ts).
 * The site itself must never import this module: the app loads one language at a time through dict-store.ts,
 * and src/app/layout-imports.test.ts fails if this file becomes reachable from the root layout.
 * Importing it also fills the caches, so `t(key, lang)` answers in every language synchronously in tests.
 */
export const UI_DICTS: Record<Lang, UiDict> = { en: EN, es, zh, pt, hi, fr, de, ja, ar };
export const NAV_DICTS: Record<Other, NavDict> = { es: navEs, zh: navZh, pt: navPt, hi: navHi, fr: navFr, de: navDe, ja: navJa, ar: navAr };

for (const l of Object.keys(NAV_DICTS) as Other[]) registerLang(l, UI_DICTS[l], NAV_DICTS[l]);
