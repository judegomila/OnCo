/**
 * Builds the concept-search index (src/lib/semantic.ts) for the whole corpus and writes it to
 * public/api/v1/embeddings.bin (sparse unit vectors) and public/api/v1/embeddings.json (ids, vocabulary, idf).
 * Deterministic, offline, no model download. Run after scripts/build-api.ts (which clears public/api/v1).
 *
 *   npx tsx scripts/embed.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildSemanticIndex, encodeSemanticIndex, semanticSearch } from "../src/lib/semantic";
import { semanticDocs } from "../src/lib/semantic-docs";

const out = join(process.cwd(), "public", "api", "v1");
mkdirSync(out, { recursive: true });

const docs = semanticDocs();
const index = buildSemanticIndex(docs);
const { bin, meta } = encodeSemanticIndex(index);
writeFileSync(join(out, "embeddings.bin"), bin);
writeFileSync(join(out, "embeddings.json"), JSON.stringify({ ...meta, built: new Date().toISOString(), method: "TF-IDF over name, aliases, tags, TL;DR, summary, fields and neighbour names; sparse unit vectors, top 96 features; cosine similarity." }));

const smoke = semanticSearch(index, "drug for HER2-low breast cancer", 3).map((h) => h.id).join(", ");
console.log(`embed: ${docs.length} docs, ${index.vocab.length} tokens, ${(bin.byteLength / 1024).toFixed(0)} KB binary; smoke test -> ${smoke}`);
