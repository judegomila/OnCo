/**
 * Translation coverage: how many TL;DRs exist per kind and per language, and which ids are missing.
 *
 *   npx tsx scripts/i18n-coverage.ts                     table per kind and language
 *   npx tsx scripts/i18n-coverage.ts --json out.json     also write the numbers as JSON
 *   npx tsx scripts/i18n-coverage.ts --missing fr cancer  ids and English TL;DRs still to translate (tab-separated)
 *
 * Languages are discovered from src/data/i18n/<code>.ts, each exporting `tldr_<code>: Record<string, string>`.
 * Translations are machine-assisted and marked unreviewed until an expert or native-speaker review clears them.
 */
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { KIND_META, KINDS, type Kind } from "../src/lib/schema";

const args = process.argv.slice(2);
const opt = (name: string) => { const i = args.indexOf(name); return i >= 0 ? args.slice(i + 1).filter((a) => !a.startsWith("--")) : null; };

async function loadTables(): Promise<Record<string, Record<string, string>>> {
  const dir = join(process.cwd(), "src", "data", "i18n");
  const tables: Record<string, Record<string, string>> = {};
  for (const f of readdirSync(dir).filter((x) => /^[a-z]{2}\.ts$/.test(x)).sort()) {
    const code = f.slice(0, 2);
    const mod = (await import(join(dir, f))) as Record<string, unknown>;
    const table = mod[`tldr_${code}`];
    if (table && typeof table === "object") tables[code] = table as Record<string, string>;
    else console.warn(`i18n: ${f} does not export tldr_${code}`);
  }
  return tables;
}

async function main() {
  const g = graph();
  const tables = await loadTables();
  const langs = Object.keys(tables);
  const missing = opt("--missing");
  if (missing) {
    const [lang, kind] = missing;
    if (!tables[lang]) { console.error(`unknown language ${lang}; have ${langs.join(", ")}`); process.exit(2); }
    const list = kind ? g.kind(kind as Kind) : g.entities;
    for (const e of list) if (!(e.id in tables[lang])) console.log(`${e.id}\t${e.name}\t${e.tldr}`);
    return;
  }

  const rows: Array<{ kind: string; total: number; byLang: Record<string, number> }> = [];
  for (const k of KINDS) {
    const ids = g.kind(k).map((e) => e.id);
    rows.push({ kind: k, total: ids.length, byLang: Object.fromEntries(langs.map((l) => [l, ids.filter((id) => id in tables[l]).length])) });
  }
  const total = g.entities.length;
  const totals = Object.fromEntries(langs.map((l) => [l, g.entities.filter((e) => e.id in tables[l]).length]));
  const orphans = Object.fromEntries(langs.map((l) => [l, Object.keys(tables[l]).filter((id) => !g.get(id))]));

  const pct = (n: number, d: number) => (d ? `${Math.round((100 * n) / d)}%` : "-");
  const w = 14;
  console.log(["kind".padEnd(w), "total".padStart(6), ...langs.map((l) => l.padStart(11))].join(" "));
  for (const r of rows) console.log([r.kind.padEnd(w), String(r.total).padStart(6), ...langs.map((l) => `${r.byLang[l]} ${pct(r.byLang[l], r.total)}`.padStart(11))].join(" "));
  console.log(["all".padEnd(w), String(total).padStart(6), ...langs.map((l) => `${totals[l]} ${pct(totals[l], total)}`.padStart(11))].join(" "));
  for (const l of langs) if (orphans[l].length) console.log(`\n${l}: ${orphans[l].length} translation${orphans[l].length === 1 ? "" : "s"} for ids not in the corpus: ${orphans[l].slice(0, 10).join(", ")}${orphans[l].length > 10 ? "..." : ""}`);
  const fullyCovered = KINDS.filter((k) => rows.find((r) => r.kind === k)!.total > 0 && langs.every((l) => rows.find((r) => r.kind === k)!.byLang[l] === rows.find((r) => r.kind === k)!.total));
  console.log(`\nKinds complete in every language: ${fullyCovered.length ? fullyCovered.map((k) => KIND_META[k].plural).join(", ") : "none"}`);

  const json = opt("--json");
  if (json) {
    const path = json[0] ?? "i18n-coverage.json";
    writeFileSync(path, JSON.stringify({ generated: new Date().toISOString(), languages: langs, total, totals, kinds: rows, orphans }, null, 2));
    console.log(`wrote ${path}`);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
