/**
 * Builds the Ask OnCo name index (src/lib/ask-index.ts): one entry per record with id, kind, name, aliases,
 * route, short TL;DR and status, plus the curated question pairs (open benchmark and per-cancer patient
 * questions). Writes public/api/v1/ask-index.json. Deterministic, offline. Run after scripts/build-api.ts
 * (which clears public/api/v1); see docs/wiring/ASK.md for the build:api line.
 *
 *   npx tsx scripts/build-ask.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildAskIndex, unknownLexiconIds } from "../src/lib/ask-index-build";
import { analyseQuestion } from "../src/lib/ask-intent";
import { encodeAskIndex } from "../src/lib/ask-index";

const out = join(process.cwd(), "public", "api", "v1");
mkdirSync(out, { recursive: true });

const unknown = unknownLexiconIds();
if (unknown.length) throw new Error(`ask-lexicon.ts names records that do not exist: ${unknown.join(", ")}`);

const index = buildAskIndex();
const json = JSON.stringify(encodeAskIndex({ ...index, built: new Date().toISOString() }));
writeFileSync(join(out, "ask-index.json"), json);

const aliases = index.entries.reduce((s, e) => s + e.aliases.length, 0);
const smokeQ = "What does 'triple-negative' mean in breast cancer?";
const a = analyseQuestion(smokeQ, index);
console.log(`ask: ${index.entries.length} entries, ${aliases} aliases, ${index.pairs.length} curated pairs, ${(json.length / 1024).toFixed(0)} KB; smoke test "${smokeQ}" -> intent ${a.intent}, ${a.entities.map((e) => `${e.entry.id} (“${e.pattern}”)`).join(", ") || "no entity"}${a.pair ? `, pair ${a.pair.pair.source} ${a.pair.similarity.toFixed(2)}` : ""}`);
