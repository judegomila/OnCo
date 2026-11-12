/** Inventory selected reader summaries independently of canonical graph records. */
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { tldr_ar } from "../src/data/i18n/ar";
import { tldr_de } from "../src/data/i18n/de";
import { tldr_es } from "../src/data/i18n/es";
import { tldr_fr } from "../src/data/i18n/fr";
import { tldr_hi } from "../src/data/i18n/hi";
import { tldr_ja } from "../src/data/i18n/ja";
import { tldr_pt } from "../src/data/i18n/pt";
import { tldr_zh } from "../src/data/i18n/zh";
import { simple } from "../src/data/simple";
import { graph } from "../src/lib/graph";

export const SUMMARY_LANGUAGES = ["ar", "de", "es", "fr", "hi", "ja", "pt", "zh", "simple"] as const;
type Language = typeof SUMMARY_LANGUAGES[number];
type Table = { language: Language; entries: Readonly<Record<string, string>> };
type Owner = { id: string; name: string };

export function summarySnapshot(owners: readonly Owner[], ids: readonly string[], tables: readonly Table[]) {
  if (!ids.length || new Set(ids).size !== ids.length) throw new Error("Select distinct summary owner ids");
  for (const language of SUMMARY_LANGUAGES) {
    if (tables.filter(table => table.language === language).length !== 1) throw new Error("Expected one summary table: " + language);
  }
  if (tables.length !== SUMMARY_LANGUAGES.length) throw new Error("Unexpected summary table");
  const records = ids.flatMap(id => {
    const matches = owners.filter(owner => owner.id === id);
    if (matches.length !== 1) throw new Error(`Expected one canonical owner for ${id}; found ${matches.length}`);
    return SUMMARY_LANGUAGES.map(language => {
      const table = tables.find(table => table.language === language)!;
      const available = Object.hasOwn(table.entries, id);
      const text = available ? table.entries[id] : null;
      if (available && !text) throw new Error(`Empty summary: ${language}:${id}`);
      return { id: `${id}-${language}`, kind: "reader-summary-entry", name: `${matches[0].name} (${language})`, canonicalRecordId: id, language, available, text };
    });
  });
  return { version: "proposal-summary-consumers", state: "selected reader-summary data in draft #375; not merged; not graph entities", scope: "Available text is an actual dictionary entry. Missing entries are retained explicitly and use the English fallback; this is not evidence of a completed translation or language review. kind is an audit owner type.", records };
}

function main() {
  const args = process.argv.slice(2), ids: string[] = [];
  let output: string | undefined;
  for (let i = 0; i < args.length; i++) {
    const flag = args[i], value = args[++i];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${flag}`);
    if (flag === "--id") ids.push(value);
    else if (flag === "--out" && !output) output = value;
    else throw new Error(`Unknown or repeated argument: ${flag}`);
  }
  if (!output) throw new Error("Missing --out");
  const tables: Table[] = [{ language: "ar", entries: tldr_ar }, { language: "de", entries: tldr_de }, { language: "es", entries: tldr_es }, { language: "fr", entries: tldr_fr }, { language: "hi", entries: tldr_hi }, { language: "ja", entries: tldr_ja }, { language: "pt", entries: tldr_pt }, { language: "zh", entries: tldr_zh }, { language: "simple", entries: simple }];
  const snapshot = summarySnapshot(graph().entities, ids, tables);
  const sources = SUMMARY_LANGUAGES.map(language => ({ language, selectedEntriesSha256: createHash("sha256").update(JSON.stringify(snapshot.records.filter(record => record.language === language))).digest("hex") }));
  writeFileSync(resolve(output), JSON.stringify({ ...snapshot, sources }, null, 2) + "\n");
  console.log(`Snapshotted ${snapshot.records.length} summary consumers; no graph-entity count changed.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
