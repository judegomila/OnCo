/**
 * Bake the GitHub star count into the site at build time, so the header badge is never empty and never flickers.
 * Writes src/data/github-stars.json. When GitHub cannot be reached the previous value is kept.
 * Runs at the front of `npm run build:api`.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const REPO = "judegomila/OnCo";
const OUT = "src/data/github-stars.json";

async function main() {
  const previous = existsSync(OUT) ? (JSON.parse(readFileSync(OUT, "utf8")) as { stars: number; fetched: string }) : { stars: 0, fetched: "" };
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}`, { headers: { Accept: "application/vnd.github+json", "User-Agent": "onco-build" }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const j = (await r.json()) as { stargazers_count?: number };
    if (typeof j.stargazers_count !== "number") throw new Error("no stargazers_count");
    writeFileSync(OUT, JSON.stringify({ stars: j.stargazers_count, fetched: new Date().toISOString().slice(0, 10) }) + "\n");
    console.log(`github-stars: ${j.stargazers_count} (was ${previous.stars})`);
  } catch (e) {
    console.log(`github-stars: kept ${previous.stars}; fetch failed (${e instanceof Error ? e.message : e})`);
    if (!existsSync(OUT)) writeFileSync(OUT, JSON.stringify(previous) + "\n");
  }
}
main();
