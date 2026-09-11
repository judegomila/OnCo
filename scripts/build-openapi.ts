/**
 * Writes public/api/v1/openapi.json, the OpenAPI 3.1 description of the static API, from the file layout in
 * scripts/api-layout.ts (shared with scripts/build-api.ts, which writes the files it describes). Runs inside
 * `npm run build:api` after build-api.ts; output is gitignored with the rest of /api/v1/.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";
import { KINDS, type Kind } from "../src/lib/schema";
import { openApiDocument } from "./api-layout";

const out = join(process.cwd(), "public", "api", "v1");
mkdirSync(out, { recursive: true });
const g = graph();
const counts = Object.fromEntries(KINDS.map((k) => [k, g.kind(k).length])) as Record<Kind, number>;
const doc = openApiDocument(counts, { version: process.env.npm_package_version ?? null });
writeFileSync(join(out, "openapi.json"), JSON.stringify(doc, null, 2));
console.log(`openapi: wrote public/api/v1/openapi.json (${Object.keys(doc.paths as object).length} paths, ${g.entities.length} entities)`);
