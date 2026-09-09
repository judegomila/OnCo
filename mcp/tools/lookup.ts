/** Lookup tools: search, ask, get_entity, list_kind, for_cancer, rank, similar. */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { KINDS, routeFor, type Kind } from "../../src/lib/schema";
import { scoreRow } from "../../src/lib/relevance";
import { answerText, composeAnswer, recordFromEntity } from "../../src/lib/ask";
import { similarLinks } from "../../src/lib/similar";
import { brief, fail, g, retrieve, rows, text, url } from "./context";

export function registerLookup(server: McpServer) {
  server.registerTool("search", {
    title: "Search OnCo",
    description: "Find OnCo records by name or meaning. Runs a word search (names, aliases, TL;DRs, tags) and a concept search (full text plus the names of linked records) and fuses them, so paraphrases such as 'drug for HER2-low breast cancer' work. Returns id, kind, name, tldr, url and why each matched.",
    inputSchema: { query: z.string().min(1), limit: z.number().int().min(1).max(50).default(10), kind: z.enum(KINDS).optional().describe("Restrict to one kind") },
  }, async ({ query, limit, kind }) => {
    const hits = retrieve(query, kind ? limit * 3 : limit).map((r) => ({ r, e: g.must(r.id) })).filter(({ e }) => !kind || e.kind === kind).slice(0, limit);
    return text(hits.map(({ r, e }) => ({ ...brief(e), matched: { words: r.lexical, concepts: r.concept } })));
  });

  server.registerTool("ask", {
    title: "Ask OnCo (grounded, cited)",
    description: "Answer a question using only sentences copied from OnCo records. Retrieves the best records, extracts the sentences that answer the question, and returns them with a numbered citation each plus the source URLs. Nothing is generated or inferred; if the corpus has no sentence on the point it says so. Use this before summarising anything about oncology so every claim carries an OnCo URL.",
    inputSchema: { question: z.string().min(3), records: z.number().int().min(1).max(12).default(6), sentences: z.number().int().min(1).max(12).default(6) },
  }, async ({ question, records, sentences }) => {
    const recs = retrieve(question, records).map((r) => { const e = g.must(r.id); return recordFromEntity(e, routeFor(e)); });
    const a = composeAnswer(question, recs, { maxSentences: sentences });
    return text({ confidence: a.confidence, note: a.note, answer: a.sentences.map((s) => ({ text: s.text, cite: s.cite, field: s.field })), sources: a.sources.map((s, i) => ({ n: i + 1, id: s.id, kind: s.kind, name: s.name, url: url(s) })), plain: answerText(a) });
  });

  server.registerTool("get_entity", {
    title: "Get an OnCo record",
    description: "Full record for one object by id, plus its neighbours grouped by kind and up to eight similar (not directly linked) records with the shared links that explain each.",
    inputSchema: { id: z.string().min(1) },
  }, async ({ id }) => {
    const e = g.get(id);
    if (!e) return fail(`Unknown id "${id}". Use search to find ids.`);
    const neighbours: Record<string, Array<{ id: string; name: string; url: string }>> = {};
    for (const [k, list] of g.neighbours(id)) neighbours[k] = list.map((x) => ({ id: x.id, name: x.name, url: url(x) }));
    const similar = similarLinks(id).map((s) => ({ id: s.id, kind: s.kind, name: s.name, url: url(s), score: s.score, shared: s.shared.map((x) => x.name), sharedTags: s.sharedTags }));
    return text({ entity: e, url: url(e), neighbours, similar });
  });

  server.registerTool("list_kind", {
    title: "List records of a kind",
    description: `List all records of one kind. Kinds: ${KINDS.join(", ")}. Returns id, name, tldr, status, url.`,
    inputSchema: { kind: z.enum(KINDS), status: z.string().optional().describe("Filter by status, e.g. approved, phase-3, recruiting") },
  }, async ({ kind, status }) => text(g.kind(kind as Kind).filter((e) => !status || e.status === status).map(brief)));

  server.registerTool("for_cancer", {
    title: "Everything relevant to a cancer",
    description: "For a cancer id (e.g. tnbc, nsclc, pancreatic), returns the cancer record (state of the art, standard of care, pipeline, open problems) and every relevant object grouped by kind: direct links plus the targets, companies and technologies of its drugs.",
    inputSchema: { cancerId: z.string().min(1) },
  }, async ({ cancerId }) => {
    const c = g.get(cancerId);
    if (!c || c.kind !== "cancer") return fail(`Unknown cancer "${cancerId}". Cancers: ${g.kind("cancer").map((x) => x.id).join(", ")}`);
    const rel: Record<string, Array<{ id: string; name: string; status?: string; url: string }>> = {};
    for (const [k, list] of g.forCancer(cancerId)) rel[k] = list.map((x) => ({ id: x.id, name: x.name, status: x.status, url: url(x) }));
    return text({ cancer: { id: c.id, name: c.name, tldr: c.tldr, url: url(c), stateOfArt: c.stateOfArt, standardOfCare: c.standardOfCare, pipeline: c.pipeline, openProblems: c.openProblems }, relevant: rel });
  });

  server.registerTool("rank", {
    title: "Ranked list for a cancer and kind",
    description: "The Explore power view: rank objects of one kind (default drug) by OnCo's disclosed relevance score, optionally for a specific cancer id. Score = standard-of-care +40, pipeline +25, history +10, direct link +15, indirect +5, plus evidence tier and connectivity. Ranks documentation and evidence, not clinical benefit.",
    inputSchema: { kind: z.enum(KINDS).default("drug"), cancerId: z.string().optional(), limit: z.number().int().min(1).max(100).default(25) },
  }, async ({ kind, cancerId, limit }) => {
    if (cancerId && !g.get(cancerId)) return fail(`Unknown cancer "${cancerId}"`);
    const list = rows.filter((r) => r.kind === kind).map((r) => ({ r, score: scoreRow(r, cancerId ?? null) })).filter((x) => x.score >= 0).sort((a, b) => b.score - a.score || a.r.name.localeCompare(b.r.name)).slice(0, limit);
    return text(list.map(({ r, score }, i) => ({ rank: i + 1, id: r.id, name: r.name, status: r.status, score, signals: cancerId ? r.rel[cancerId] : undefined, tldr: r.tldr, url: SITE_URL(r.route) })));
  });

  server.registerTool("similar", {
    title: "Pages like this",
    description: "Records similar to a given one that are not directly linked to it, found by shared links and tags (weighted Jaccard). Each result lists the shared links that explain the match.",
    inputSchema: { id: z.string().min(1) },
  }, async ({ id }) => {
    if (!g.get(id)) return fail(`Unknown id "${id}"`);
    return text(similarLinks(id, 6).map((s) => ({ id: s.id, kind: s.kind, name: s.name, url: url(s), score: s.score, shared: s.shared.map((x) => x.name), sharedTags: s.sharedTags })));
  });
}

const SITE_URL = (route: string) => `https://onco.cc${route}`;
