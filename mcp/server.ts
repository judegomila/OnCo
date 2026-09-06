/**
 * OnCo MCP server: exposes the corpus to AI assistants over stdio.
 *
 *   npm run mcp
 *
 * Tools: search, get_entity, list_kind, for_cancer, rank.
 * Everything is computed from the same graph the site is built from; no network calls.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import MiniSearch from "minisearch";
import { z } from "zod";
import { graph } from "../src/lib/graph";
import { KINDS, routeFor, type Kind } from "../src/lib/schema";
import { searchDocs, type SearchDoc } from "../src/lib/search-index";
import { powerRows, scoreRow } from "../src/lib/relevance";

const SITE = "https://onco-umber.vercel.app";
const g = graph();

const ms = new MiniSearch<SearchDoc>({ fields: ["name", "aka", "tldr", "tags", "id"], storeFields: ["id", "kind", "name", "tldr", "route", "status"], searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 } });
ms.addAll(searchDocs());
const rows = powerRows();

const text = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });

const server = new McpServer({ name: "onco", version: "0.2.0" });

server.registerTool("search", {
  title: "Search OnCo",
  description: "Full-text search across all OnCo objects (cancers, technologies, targets, products, companies, institutions, pathways, terms, trials, pairings, roadmaps, ideas, collections). Returns id, kind, name, tldr, url.",
  inputSchema: { query: z.string().min(1), limit: z.number().int().min(1).max(50).default(10) },
}, async ({ query, limit }) => {
  const hits = ms.search(query).slice(0, limit) as unknown as SearchDoc[];
  return text(hits.map((h) => ({ id: h.id, kind: h.kind, name: h.name, tldr: h.tldr, status: h.status, url: SITE + h.route })));
});

server.registerTool("get_entity", {
  title: "Get an OnCo object",
  description: "Full record for one object by id, plus its neighbours grouped by kind.",
  inputSchema: { id: z.string().min(1) },
}, async ({ id }) => {
  const e = g.get(id);
  if (!e) return text({ error: `Unknown id "${id}". Use search to find ids.` });
  const neighbours: Record<string, Array<{ id: string; name: string; url: string }>> = {};
  for (const [k, list] of g.neighbours(id)) neighbours[k] = list.map((x) => ({ id: x.id, name: x.name, url: SITE + routeFor(x) }));
  return text({ entity: e, url: SITE + routeFor(e), neighbours });
});

server.registerTool("list_kind", {
  title: "List objects of a kind",
  description: `List all objects of one kind. Kinds: ${KINDS.join(", ")}. Returns id, name, tldr, status.`,
  inputSchema: { kind: z.enum(KINDS) },
}, async ({ kind }) => text(g.kind(kind as Kind).map((e) => ({ id: e.id, name: e.name, tldr: e.tldr, status: e.status, url: SITE + routeFor(e) }))));

server.registerTool("for_cancer", {
  title: "Everything relevant to a cancer",
  description: "For a cancer id (e.g. tnbc, nsclc, pancreatic), returns the cancer record and every relevant object grouped by kind: direct links plus the targets, companies, and technologies of its drugs.",
  inputSchema: { cancerId: z.string().min(1) },
}, async ({ cancerId }) => {
  const c = g.get(cancerId);
  if (!c || c.kind !== "cancer") return text({ error: `Unknown cancer "${cancerId}". Cancers: ${g.kind("cancer").map((x) => x.id).join(", ")}` });
  const rel: Record<string, Array<{ id: string; name: string; status?: string; url: string }>> = {};
  for (const [k, list] of g.forCancer(cancerId)) rel[k] = list.map((x) => ({ id: x.id, name: x.name, status: x.status, url: SITE + routeFor(x) }));
  return text({ cancer: { id: c.id, name: c.name, tldr: c.tldr, stateOfArt: c.stateOfArt, standardOfCare: c.standardOfCare, pipeline: c.pipeline, openProblems: c.openProblems }, relevant: rel });
});

server.registerTool("rank", {
  title: "Ranked list for a cancer and kind",
  description: "The Explore power view: rank objects of one kind (default drug) by OnCo's disclosed relevance score, optionally for a specific cancer id. Score = standard-of-care +40, pipeline +25, history +10, direct link +15, indirect +5, plus evidence tier and connectivity.",
  inputSchema: { kind: z.enum(KINDS).default("drug"), cancerId: z.string().optional(), limit: z.number().int().min(1).max(100).default(25) },
}, async ({ kind, cancerId, limit }) => {
  if (cancerId && !g.get(cancerId)) return text({ error: `Unknown cancer "${cancerId}"` });
  const list = rows.filter((r) => r.kind === kind).map((r) => ({ r, score: scoreRow(r, cancerId ?? null) })).filter((x) => x.score >= 0).sort((a, b) => b.score - a.score || a.r.name.localeCompare(b.r.name)).slice(0, limit);
  return text(list.map(({ r, score }, i) => ({ rank: i + 1, id: r.id, name: r.name, status: r.status, score, signals: cancerId ? r.rel[cancerId] : undefined, tldr: r.tldr, url: SITE + r.route })));
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main().catch((e) => { console.error(e); process.exit(1); });
