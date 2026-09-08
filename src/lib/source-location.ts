import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Kind } from "./schema";

/**
 * Where does an entity live in the repository? Used to build "Edit on GitHub" links with a
 * line anchor. Scans src/data/*.ts and src/data/spikes/*.ts once at build time for `id: "<id>"`.
 */
export type SourceLocation = { file: string; line: number; url: string; editUrl: string };

const REPO = "https://github.com/judegomila/OnCo";
const KIND_FILE: Record<Kind, string> = {
  cancer: "cancers.ts", section: "sections.ts", technology: "technologies.ts", target: "targets.ts", drug: "drugs.ts", company: "companies.ts",
  institution: "institutions.ts", pathway: "pathways.ts", term: "terms.ts", trial: "trials.ts", pairing: "pairings.ts", roadmap: "roadmaps.ts", idea: "ideas.ts", collection: "collections.ts", person: "people/index.ts",
};

let index: Map<string, { file: string; line: number }> | null = null;

function scan(): Map<string, { file: string; line: number }> {
  if (index) return index;
  index = new Map();
  const root = join(process.cwd(), "src", "data");
  const files: string[] = [];
  const walk = (dir: string, rel: string) => {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      if (name.isDirectory()) walk(join(dir, name.name), `${rel}${name.name}/`);
      else if (name.name.endsWith(".ts")) files.push(`${rel}${name.name}`);
    }
  };
  walk(root, "");
  const re = /\bid:\s*"([a-z0-9-]+)"/g;
  for (const f of files) {
    const text = readFileSync(join(root, f), "utf8");
    const lines = text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let m: RegExpExecArray | null;
      re.lastIndex = 0;
      while ((m = re.exec(lines[i]))) {
        // Keep the first occurrence; entity ids are unique so later matches are nested node ids etc.
        if (!index.has(m[1])) index.set(m[1], { file: `src/data/${f}`, line: i + 1 });
      }
    }
  }
  return index;
}

export function sourceLocation(id: string, kind: Kind): SourceLocation {
  const hit = scan().get(id);
  const file = hit?.file ?? `src/data/${KIND_FILE[kind]}`;
  const line = hit?.line ?? 1;
  return { file, line, url: `${REPO}/blob/main/${file}#L${line}`, editUrl: `${REPO}/edit/main/${file}#L${line}` };
}
