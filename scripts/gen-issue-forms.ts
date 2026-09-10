/**
 * Keep the issue forms' dropdowns in sync with the code.
 *
 *  - any dropdown with `id: kind`     gets the kinds from src/lib/schema.ts (KINDS, labelled via KIND_META)
 *  - any dropdown with `id: language` gets the languages from src/lib/layer.ts (LANGS minus English)
 *
 * Run: npx tsx scripts/gen-issue-forms.ts          rewrites the forms in place
 *      npx tsx scripts/gen-issue-forms.ts --check  exits 1 if any form is out of date (used by the test)
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { KINDS, KIND_META } from "../src/lib/schema";
import { LANGS } from "../src/lib/layer";

export const FORMS_DIR = join(process.cwd(), ".github", "ISSUE_TEMPLATE");

export const KIND_OPTIONS = KINDS.map((k) => KIND_META[k].label.toLowerCase());
export const LANGUAGE_OPTIONS = LANGS.filter((l) => l.code !== "en").map((l) => l.label);

const SYNCED: Record<string, string[]> = { kind: KIND_OPTIONS, language: LANGUAGE_OPTIONS };

/** Rewrite `options: [...]` lines inside dropdown blocks whose id is one we manage. Returns the new text. */
export function syncForm(text: string): string {
  const lines = text.split("\n");
  let inDropdown = false;
  let dropdownId: string | null = null;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    const type = /^\s*-\s*type:\s*(\S+)/.exec(l);
    if (type) { inDropdown = type[1] === "dropdown"; dropdownId = null; continue; }
    if (!inDropdown) continue;
    const id = /^\s*id:\s*(\S+)/.exec(l);
    if (id) { dropdownId = id[1]; continue; }
    const opts = /^(\s*)options:\s*\[.*\]\s*$/.exec(l);
    if (opts && dropdownId && SYNCED[dropdownId]) lines[i] = `${opts[1]}options: [${SYNCED[dropdownId].join(", ")}]`;
  }
  return lines.join("\n");
}

/** Files that differ from their synced form. Writes them when `write` is true. */
export function syncIssueForms(dir = FORMS_DIR, write = false): string[] {
  const changed: string[] = [];
  for (const f of readdirSync(dir).filter((x) => x.endsWith(".yml") && x !== "config.yml")) {
    const p = join(dir, f);
    const before = readFileSync(p, "utf8");
    const after = syncForm(before);
    if (after !== before) { changed.push(f); if (write) writeFileSync(p, after); }
  }
  return changed;
}

const isMain = process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/gen-issue-forms.ts");
if (isMain) {
  const check = process.argv.includes("--check");
  const changed = syncIssueForms(FORMS_DIR, !check);
  if (check) {
    if (changed.length) { console.error(`issue forms out of date: ${changed.join(", ")} (run npx tsx scripts/gen-issue-forms.ts)`); process.exit(1); }
    console.log("issue forms in sync");
  } else {
    console.log(changed.length ? `updated: ${changed.join(", ")}` : "issue forms already in sync");
  }
}
