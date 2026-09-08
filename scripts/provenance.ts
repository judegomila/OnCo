/**
 * Provenance: map every entity id to the last commit that touched its record.
 *
 * Method: for each data file, `git blame --line-porcelain` once; find each `id: "<id>"` line and
 * the extent of its record (until the next `id: "` at the same or shallower indentation, or the
 * next top-level `}),` / `},`), then take the newest blamed commit inside that range.
 *
 * Writes public/provenance.json { [id]: { commit, date, author, message, file } }.
 * Run: npm run provenance
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

type Prov = { commit: string; date: string; author: string; message: string; file: string };

const root = process.cwd();
const files = [
  ...readdirSync(join(root, "src", "data")).filter((f) => f.endsWith(".ts")).map((f) => join(root, "src", "data", f)),
  ...readdirSync(join(root, "src", "data", "spikes")).filter((f) => f.endsWith(".ts")).map((f) => join(root, "src", "data", "spikes", f)),
];

type BlameLine = { commit: string; author: string; time: number; summary: string };

function blame(file: string): BlameLine[] {
  const out = execFileSync("git", ["blame", "--line-porcelain", "--", file], { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] });
  const lines: BlameLine[] = [];
  const meta = new Map<string, { author: string; time: number; summary: string }>();
  let cur: string | null = null;
  for (const l of out.split("\n")) {
    const m = /^([0-9a-f]{40}) \d+ \d+(?: \d+)?$/.exec(l);
    if (m) { cur = m[1]; if (!meta.has(cur)) meta.set(cur, { author: "", time: 0, summary: "" }); continue; }
    if (!cur) continue;
    const mm = meta.get(cur)!;
    if (l.startsWith("author ")) mm.author = l.slice(7);
    else if (l.startsWith("author-time ")) mm.time = Number(l.slice(12));
    else if (l.startsWith("summary ")) mm.summary = l.slice(8);
    else if (l.startsWith("\t")) { lines.push({ commit: cur, ...mm }); }
  }
  return lines;
}

const prov: Record<string, Prov> = {};
for (const file of files) {
  const src = readFileSync(file, "utf8").split("\n");
  let bl: BlameLine[];
  try { bl = blame(file); } catch { continue; }
  const idLines: Array<{ id: string; line: number; indent: number }> = [];
  // An entity record starts on a line with `id: "<kebab>"` that also carries `kind:` or `name:` (pathway nodes carry `label:` instead).
  src.forEach((l, i) => { const m = /^(\s*).*?\bid: "([a-z0-9-]+)"/.exec(l); if (m && /\b(kind|name):/.test(l)) idLines.push({ id: m[2], line: i, indent: m[1].length }); });
  for (let k = 0; k < idLines.length; k++) {
    const { id, line } = idLines[k];
    const end = k + 1 < idLines.length ? idLines[k + 1].line : src.length;
    let best: BlameLine | null = null;
    for (let i = line; i < end && i < bl.length; i++) if (!best || bl[i].time > best.time) best = bl[i];
    if (!best) continue;
    if (prov[id] && prov[id].date >= new Date(best.time * 1000).toISOString()) continue; // keep newest across files
    prov[id] = { commit: best.commit.slice(0, 10), date: new Date(best.time * 1000).toISOString().slice(0, 10), author: best.author, message: best.summary.slice(0, 120), file: relative(root, file) };
  }
}

mkdirSync(join(root, "public"), { recursive: true });
writeFileSync(join(root, "public", "provenance.json"), JSON.stringify(prov, null, 0));
console.log(`provenance: ${Object.keys(prov).length} entities mapped from ${files.length} files`);
