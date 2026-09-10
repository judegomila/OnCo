/**
 * Idea votes: read reactions and comment counts on GitHub Discussions threads in the "Objects"
 * category, match each thread to an entity id (from the title "<id>: <name>" or the form's Entity
 * field in the body), and write public/votes.json for /idea-votes/.
 *
 *   GITHUB_TOKEN=... npx tsx scripts/fetch-votes.ts
 *
 * Needs a token with read access to discussions (the default Actions token has it when the
 * workflow grants `discussions: read`). Without a token the script exits 0 without writing, so a
 * local build never loses the last good snapshot.
 * Refreshed weekly by .github/workflows/refresh-votes.yml.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "../src/lib/graph";

const OWNER = "judegomila";
const NAME = "OnCo";
const CATEGORIES = new Set(["objects", "ideas"]);

type Vote = { up: number; reactions: number; comments: number; url: string; title: string; updated: string };
type VotesFile = { generated: string; source: string; total: number; votes: Record<string, Vote> };

type Node = { title: string; url: string; body: string; updatedAt: string; upvoteCount: number; comments: { totalCount: number }; reactionGroups: Array<{ content: string; reactors: { totalCount: number } }>; category: { slug: string } };
type Page = { data?: { repository?: { discussions: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: Node[] } } }; errors?: Array<{ message: string }> };

const QUERY = `query($owner: String!, $name: String!, $after: String) {
  repository(owner: $owner, name: $name) {
    discussions(first: 100, after: $after, orderBy: { field: UPDATED_AT, direction: DESC }) {
      pageInfo { hasNextPage endCursor }
      nodes {
        title url body updatedAt upvoteCount
        comments { totalCount }
        reactionGroups { content reactors { totalCount } }
        category { slug }
      }
    }
  }
}`;

/** Entity id from a thread: "<id>: <name>" title, or the form's Entity field "id (kind)" in the body. */
export function idFromThread(title: string, body: string, known: Set<string>): string | null {
  const t = /^\s*([a-z0-9]+(?:-[a-z0-9]+)*)\s*[:·|-]/.exec(title);
  if (t && known.has(t[1])) return t[1];
  const b = /###\s*Entity\s*\n+\s*`?([a-z0-9]+(?:-[a-z0-9]+)*)`?/i.exec(body);
  if (b && known.has(b[1])) return b[1];
  const anywhere = title.toLowerCase().match(/[a-z0-9]+(?:-[a-z0-9]+)+/g) ?? [];
  for (const w of anywhere) if (known.has(w)) return w;
  return null;
}

async function main() {
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (!token) { console.log("fetch-votes: no GITHUB_TOKEN; skipping (public/votes.json left as is)"); return; }
  const known = new Set(graph().entities.map((e) => e.id));
  const votes: Record<string, Vote> = {};
  let after: string | null = null;
  let pages = 0;
  for (;;) {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "OnCo/1.0 (fetch-votes)" },
      body: JSON.stringify({ query: QUERY, variables: { owner: OWNER, name: NAME, after } }),
    });
    if (!res.ok) throw new Error(`GraphQL HTTP ${res.status}`);
    const page = (await res.json()) as Page;
    if (page.errors?.length) throw new Error(page.errors.map((e) => e.message).join("; "));
    const d = page.data?.repository?.discussions;
    if (!d) break;
    for (const n of d.nodes) {
      if (!CATEGORIES.has(n.category.slug)) continue;
      const id = idFromThread(n.title, n.body ?? "", known);
      if (!id) continue;
      const up = n.reactionGroups.filter((r) => r.content === "THUMBS_UP" || r.content === "HEART" || r.content === "ROCKET").reduce((a, r) => a + r.reactors.totalCount, 0) + n.upvoteCount;
      const reactions = n.reactionGroups.reduce((a, r) => a + r.reactors.totalCount, 0);
      const cur = votes[id];
      // Several threads can name the same id; keep the sum of votes and the most recently updated URL.
      votes[id] = { up: (cur?.up ?? 0) + up, reactions: (cur?.reactions ?? 0) + reactions, comments: (cur?.comments ?? 0) + n.comments.totalCount, url: cur && cur.updated > n.updatedAt ? cur.url : n.url, title: cur && cur.updated > n.updatedAt ? cur.title : n.title, updated: cur && cur.updated > n.updatedAt ? cur.updated : n.updatedAt };
    }
    pages++;
    if (!d.pageInfo.hasNextPage || pages > 50) break;
    after = d.pageInfo.endCursor;
  }
  const out: VotesFile = { generated: new Date().toISOString(), source: `https://github.com/${OWNER}/${NAME}/discussions`, total: Object.keys(votes).length, votes };
  mkdirSync(join(process.cwd(), "public"), { recursive: true });
  writeFileSync(join(process.cwd(), "public", "votes.json"), JSON.stringify(out, null, 0));
  console.log(`fetch-votes: ${out.total} entities with threads across ${pages} page(s)`);
}

const isMain = process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/fetch-votes.ts");
if (isMain) main().catch((e) => { console.error(String(e instanceof Error ? e.message : e)); process.exit(1); });
