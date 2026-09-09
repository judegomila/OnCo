/** Browser loader for the concept-search index written by scripts/embed.ts. Fetched once, cached for the session. */
import { decodeSemanticIndex, type SemanticIndex, type SemanticMeta } from "./semantic";

let cache: Promise<SemanticIndex | null> | null = null;

/** Resolves to null when the index has not been built (e.g. a dev server without `npm run build:api`). */
export function loadSemantic(): Promise<SemanticIndex | null> {
  if (!cache) {
    cache = Promise.all([fetch("/api/v1/embeddings.json"), fetch("/api/v1/embeddings.bin")])
      .then(async ([m, b]) => {
        if (!m.ok || !b.ok) return null;
        const meta = (await m.json()) as SemanticMeta;
        const bin = await b.arrayBuffer();
        return decodeSemanticIndex(bin, meta);
      })
      .catch(() => null);
  }
  return cache;
}
