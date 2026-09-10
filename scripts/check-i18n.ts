/**
 * Site chrome translation check: every key in the English UI dictionary and every navigation group and item
 * must exist in all eight other languages, with the same {placeholders} and no banned phrasing.
 *
 *   npm run check:i18n            exit 1 on any gap, print counts per language
 *
 * TL;DR body translations are a separate concern: see scripts/i18n-coverage.ts.
 */
import { EN, UI_DICTS, type UiKey } from "../src/lib/i18n/ui";
import { NAV_DICTS, groupKey } from "../src/lib/i18n/nav";
import { NAV_GROUPS } from "../src/lib/nav";
import { LANGS } from "../src/lib/layer";

const OTHER = LANGS.map((l) => l.code).filter((c) => c !== "en");
const KEYS = Object.keys(EN) as UiKey[];
const holes = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");
const banned = (s: string) => /—|\bas of\b|\bspike\b/i.test(s);

let problems = 0;
const report = (msg: string) => { problems++; console.error(`  ${msg}`); };

const navKeys = [...NAV_GROUPS.map(groupKey), ...NAV_GROUPS.flatMap((g) => g.items.map((i) => i.href))];
console.log(`English: ${KEYS.length} chrome keys, ${NAV_GROUPS.length} nav groups, ${new Set(NAV_GROUPS.flatMap((g) => g.items.map((i) => i.href))).size} nav items`);
for (const l of OTHER) {
  const ui = UI_DICTS[l] as Record<string, string>;
  const nav = NAV_DICTS[l];
  console.log(`\n${l}:`);
  let uiCount = 0, navCount = 0;
  for (const k of KEYS) {
    const v = ui[k];
    if (typeof v !== "string" || !v.trim()) { report(`missing ui key ${k}`); continue; }
    uiCount++;
    if (holes(v) !== holes(EN[k])) report(`placeholder mismatch in ${k}: "${v}"`);
    if (banned(v)) report(`banned phrasing in ${k}: "${v}"`);
  }
  for (const k of Object.keys(ui)) if (!(k in EN)) report(`ui key not in English: ${k}`);
  for (const k of new Set(navKeys)) {
    const v = nav[k];
    if (!v?.[0] || !v?.[1]) { report(`missing nav entry ${k}`); continue; }
    navCount += v.filter(Boolean).length;
    for (const s of v) if (s && banned(s)) report(`banned phrasing in nav ${k}: "${s}"`);
  }
  for (const g of NAV_GROUPS) if (g.short && !nav[groupKey(g)]?.[2]) report(`missing short label for ${groupKey(g)}`);
  for (const k of Object.keys(nav)) if (!navKeys.includes(k)) report(`nav entry for unknown href: ${k}`);
  console.log(`  ${uiCount}/${KEYS.length} chrome strings, ${navCount} nav strings`);
}

if (problems) { console.error(`\n${problems} problem${problems === 1 ? "" : "s"}.`); process.exit(1); }
console.log("\nAll languages complete.");
