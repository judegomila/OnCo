/** Snapshot explicitly reviewed directory entries, separately from knowledge-graph entities. */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { freeServices, type FreeService } from "../src/data/free-wave";

export function serviceSnapshot(services: readonly FreeService[], ids: readonly string[], sourceSha256: string) {
  if (!ids.length) throw new Error("Select at least one reviewed service id");
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate selected service id");
  const selected = ids.map(id => {
    const matches = services.filter(service => service.id === id);
    if (matches.length !== 1) throw new Error(`Expected one directory owner for ${id}; found ${matches.length}`);
    return { ...matches[0], kind: "service-directory-entry" };
  });
  return {
    version: "proposal-service-directory",
    state: "directory data implemented in draft #375; not merged; not knowledge-graph entities",
    source: { path: "src/data/free-wave.ts", sha256: sourceSha256 },
    scope: "Only the selected directory entries are represented by this snapshot. kind is an audit owner type, not a graph schema kind.",
    records: selected,
  };
}

function main() {
  const args = process.argv.slice(2);
  const ids: string[] = [];
  let output: string | undefined;
  for (let i = 0; i < args.length; i++) {
    const flag = args[i], value = args[++i];
    if (!value || value.startsWith("--")) throw new Error(`Missing value for ${flag}`);
    if (flag === "--id") ids.push(value);
    else if (flag === "--out" && !output) output = value;
    else throw new Error(`Unknown or repeated argument: ${flag}`);
  }
  if (!output) throw new Error("Missing --out");
  const source = readFileSync(resolve("src/data/free-wave.ts"));
  const snapshot = serviceSnapshot(freeServices, ids, createHash("sha256").update(source).digest("hex"));
  writeFileSync(resolve(output), JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`Snapshotted ${snapshot.records.length} directory consumers; no graph-entity count changed.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main();
