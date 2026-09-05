/**
 * Validates the corpus: schema, duplicate ids, dangling references.
 * Run: npm run validate
 */
import { graph } from "../src/lib/graph";

try {
  const g = graph();
  const counts = [...g.byKind.entries()].map(([k, v]) => `${k}: ${v.length}`).join(", ");
  console.log(`OK — ${g.entities.length} entities (${counts})`);
} catch (e) {
  console.error(String(e instanceof Error ? e.message : e));
  process.exit(1);
}
