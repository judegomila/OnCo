/**
 * The file layout of the static API under public/api/v1/, in one place, so that meta.json (scripts/build-api.ts)
 * and the OpenAPI description (scripts/build-openapi.ts) describe the same files. Pure functions, no I/O.
 */
import { KINDS, KIND_META, STATUSES, type Kind } from "../src/lib/schema";
import { EXPORT_LICENCE } from "../src/lib/csv";
import { EXPLORE_KINDS } from "../src/lib/explore-kinds";
import { EDGE_KINDS, edgeTypeSlug } from "../src/lib/edge-kinds";
import { COST_ORDER, MATURITY_ORDER, RANK_PAGE, VIEW_IDS } from "../src/lib/idea-rankings-views";

export const SITE = "https://onco.cc";
export const LICENCE_URL = "https://creativecommons.org/licenses/by-nc/4.0/";
export const REPO = "https://github.com/judegomila/OnCo";

export type ApiFile = { path: string; contents: string };

/** Every file the build writes under /api/v1/, in the order meta.json lists them. */
export function apiFiles(counts: Record<Kind, number>): ApiFile[] {
  return [
    { path: "/api/v1/all.json", contents: "All entities plus an incoming map of backlinks per id" },
    { path: "/api/v1/all.ndjson", contents: "All entities, one JSON object per line" },
    { path: "/api/v1/schema.json", contents: "JSON Schema (draft 2020-12) of one entity" },
    { path: "/api/v1/openapi.json", contents: "OpenAPI 3.1 description of this API" },
    { path: "/api/v1/search.json", contents: "Compact search documents" },
    { path: "/api/v1/entities/<id>.json", contents: "One entity with its neighbours" },
    { path: "/api/v1/for-me/<id>.json", contents: "One cancer's situation data for the For me page: standard-of-care rows with decision anchors, biomarkers resolved to targets, drugs with regional approvals, recruiting trials, red cards, questions" },
    { path: "/api/v1/my-cancers.json", contents: "Every cancer as id, name, site route and hub group: the chooser list the header and welcome step fetch on demand" },
    { path: "/api/v1/spotlight.json", contents: "The home page spotlight: one hero record per kind in rotation (the most connected record, with TL;DR, three facts, connected pills and two runners-up), the rule, the daily schedule and the build day's kind" },
    { path: "/api/v1/explore/<plural>.json", contents: "Every row of one kind for the Explore page (name, TL;DR, status, evidence, links, per-cancer relevance signals), in the page's default order; the page itself carries the first 30 and fetches the rest" },
    { path: "/api/v1/ideas/rankings/<view>.json", contents: `Every idea one view of the Idea rankings page can order, in rank order (rank, score, the score parts the formula reads, the editorial reason for Cherry picked); the page itself carries the first ${RANK_PAGE} and fetches the rest` },
    { path: "/api/v1/tables/<table>.json", contents: "Every row of one paged table (kind-<route> for the kind browsers such as kind-trials and kind-key-papers, evidence, china-trials, university-output, university-output-grouped, university-score, audit-*, pathway-matrix, pathway-nodes, dossier-trials-<target>), in the table's default order; the page carries the first 30 rows (60 for a kind browser) and fetches the rest" },
    { path: "/api/v1/for-me/<id>.related.json", contents: "Everything in OnCo that touches one cancer for the For me picker: state of the art, red cards, pipeline, the hopeful records grouped by kind, and edgeIds, the record ids the Edge 'For you' filter matches items against (the cancer, its parent and subtypes, drugs approved or in phase 3 for it with those trials, its roadmaps and technologies)" },
    { path: "/api/v1/navigator/<id>.json", contents: "One cancer's line-of-therapy data for the navigator: standard-of-care rows, the products and technologies relevant to it with biomarker fields, caution pairings, caregiver details and questions" },
    { path: "/api/v1/explained/<id>.json", contents: "One cancer's section of Trials in plain words (or 'other' for trials not yet linked to a cancer): every trial row (heading, status, phase, year, summary, registry id), the cross-reference pills, and the outcomes, setting and enrolment of every trial with structured results keyed by trial id; the page carries the first 10 rows and fetches the rest and the explainers from here" },
    { path: "/api/v1/navigator/lines.json", contents: "Every product and technology with the cancers it is relevant to: the 'already tried' chooser of the navigator" },
    { path: "/api/v1/context/<id>.md", contents: "One entity as clean Markdown for language models" },
    { path: "/api/v1/context/index.md", contents: "Index of the Markdown context files" },
    { path: "/api/v1/onco.nt", contents: "The graph as RDF N-Triples (schema.org, owl:sameAs to Wikidata)" },
    { path: "/api/v1/rdf/<id>.ttl", contents: "One entity as RDF Turtle: its own triples, outgoing relations and owl:sameAs, prefixes declared once" },
    { path: "/api/v1/similar.json", contents: "Up to eight similar records per id with the shared links" },
    { path: "/api/v1/embeddings.json", contents: "Concept-search index: ids, vocabulary, idf (vectors in embeddings.bin)" },
    { path: "/api/v1/ask-index.json", contents: "Names, aliases and curated question pairs for Ask OnCo" },
    { path: "/api/v1/ranking.json", contents: "Institution ranking rows with score components" },
    { path: "/api/v1/benchmark.json", contents: "The open evaluation question set" },
    { path: "/api/v1/meta.json", contents: "Build date, counts, licence and this file list" },
    ...KINDS.map((k) => ({ path: `/api/v1/${KIND_META[k].plural}.json`, contents: `${counts[k]} ${KIND_META[k].plural} as JSON` })),
    ...KINDS.map((k) => ({ path: `/api/v1/${KIND_META[k].plural}.csv`, contents: `${counts[k]} ${KIND_META[k].plural} as CSV` })),
  ];
}

export const FEEDS = ["/edge/feed.xml", "/edge/feed.json", "/edge/{type}/feed.xml", "/edge/{type}/feed.json", "/feeds/changelog.xml", "/feeds/regulatory.xml", "/feeds/calendar.xml", "/feeds/pulse.xml", "/newsletter/feed.xml"];

type Json = Record<string, unknown>;
const ok = (schema: Json, mediaType = "application/json", description = "OK"): Json => ({ "200": { description, content: { [mediaType]: { schema } } } });
const ref = (name: string): Json => ({ $ref: `#/components/schemas/${name}` });
const get = (operationId: string, summary: string, responses: Json, extra: Json = {}): Json => ({ get: { operationId, summary, tags: ["corpus"], ...extra, responses } });
const idParam = (description?: string): Json => ({ name: "id", in: "path", required: true, ...(description ? { description } : {}), schema: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" } });

/**
 * OpenAPI 3.1 description of the static API. Everything is GET, unauthenticated and served from the CDN with
 * permissive CORS. The entity schema is not repeated here: it points at /api/v1/schema.json, which is generated
 * from the same Zod schema that validates the corpus, so the two cannot drift.
 */
export function openApiDocument(counts: Record<Kind, number>, opts: { version?: string | null; built?: string } = {}): Json {
  const total = KINDS.reduce((n, k) => n + counts[k], 0);
  const plurals = KINDS.map((k) => KIND_META[k].plural);
  const pluralParam: Json = { name: "plural", in: "path", required: true, description: "The plural name of the kind, as used in the file name.", schema: { type: "string", enum: plurals } };
  const kindLines = KINDS.map((k) => `- ${KIND_META[k].plural} (${counts[k]}): ${KIND_META[k].blurb}`).join("\n");
  const paths: Json = {
    "/api/v1/meta.json": get("getMeta", "Build date, counts per kind, licence and the list of files", ok(ref("Meta"))),
    "/api/v1/openapi.json": get("getOpenApi", "This description", ok({ type: "object", additionalProperties: true })),
    "/api/v1/schema.json": get("getSchema", "JSON Schema (draft 2020-12) of one entity, generated from the Zod schema that validates the corpus", ok({ type: "object", additionalProperties: true }, "application/schema+json")),
    "/api/v1/all.json": get("getAll", "Every entity plus a backlink map", ok({ type: "object", required: ["entities", "incoming"], properties: { entities: { type: "array", items: ref("Entity") }, incoming: { type: "object", description: "For each id, the entities that link to it.", additionalProperties: { type: "array", items: ref("EntityRef") } } } }), { description: "Several megabytes. Prefer the per-kind files unless you need the whole graph." }),
    "/api/v1/all.ndjson": get("getAllNdjson", "Every entity, one JSON object per line, each with its site route", ok({ type: "string" }, "application/x-ndjson")),
    "/api/v1/search.json": get("getSearchDocs", "Compact search documents (id, kind, name, TL;DR, route)", ok({ type: "array", items: ref("SearchDoc") })),
    "/api/v1/similar.json": get("getSimilar", "Up to eight similar records per id, with the links they share", ok({ type: "object", additionalProperties: { type: "array", items: { type: "object", required: ["id"], properties: { id: { type: "string" }, kind: ref("Kind"), score: { type: "number" }, shared: { type: "array", items: { type: "string" } } }, additionalProperties: true } } })),
    "/api/v1/embeddings.json": get("getEmbeddings", "The concept-search index: ids, vocabulary and idf weights; the sparse unit vectors are in embeddings.bin", ok({ type: "object", additionalProperties: true })),
    "/api/v1/ask-index.json": get("getAskIndex", "Names, aliases and curated question pairs used by Ask OnCo, the CLI and the MCP server", ok({ type: "object", additionalProperties: true })),
    "/api/v1/onco.nt": get("getTriples", "The graph as RDF N-Triples using schema.org terms, with owl:sameAs links to Wikidata", ok({ type: "string" }, "application/n-triples")),
    "/api/v1/rdf/{id}.ttl": get("getEntityTurtle", "One entity as RDF Turtle: its own properties, its outgoing relations as the IRIs of the neighbours' pages, and owl:sameAs to Wikidata; the subject is the record's page URL", { ...ok({ type: "string" }, "text/turtle"), "404": { description: "No such id." } }, { parameters: [idParam()] }),
    "/api/v1/ranking.json": get("getRanking", "Institution ranking rows with the score components", ok({ type: "array", items: ref("RankingRow") })),
    "/api/v1/benchmark.json": get("getBenchmark", "The open evaluation question set", ok({ type: "array", items: { type: "object", additionalProperties: true } })),
    "/api/v1/{plural}.json": get("listKind", "All entities of one kind", ok({ type: "array", items: ref("Entity") }), { parameters: [pluralParam] }),
    "/api/v1/{plural}.csv": get("listKindCsv", "All entities of one kind as CSV: scalars as-is, arrays joined with '; ', nested records as JSON; the first line is a licence comment", ok({ type: "string" }, "text/csv"), { parameters: [pluralParam] }),
    "/api/v1/entities/{id}.json": get("getEntity", "One entity with its site route and its neighbours grouped by kind", { ...ok(ref("EntityResponse")), "404": { description: "No such id; the CDN returns the site's 404 page." } }, { parameters: [idParam("Kebab-case entity id, for example tnbc, trop2 or trastuzumab-deruxtecan.")] }),
    "/api/v1/for-me/{id}.json": get("getForMeSituation", "One cancer's situation data for the For me page: standard-of-care rows with decision-page anchors, biomarkers resolved to target records, drugs with regional approval rows, recruiting trials, red cards and questions; assembled in the browser by src/lib/for-me-situation.ts", { ...ok({ type: "object", additionalProperties: true }), "404": { description: "No such cancer id." } }, { parameters: [idParam("Kebab-case cancer id, for example tnbc or nsclc.")] }),
    "/api/v1/explore/{plural}.json": get("listExploreRows", "Every row of one kind as the Explore page ranks it: id, name, TL;DR, route, status, evidence tier, link count, year, tags, and the per-cancer relevance signals the page scores from; the page carries the first 30 rows of each kind and fetches this file for the rest", ok({ type: "array", items: { type: "object", required: ["id", "kind", "name", "route", "rel"], properties: { id: { type: "string" }, kind: ref("Kind"), name: { type: "string" }, tldr: { type: "string" }, route: { type: "string" }, status: ref("Status"), degree: { type: "integer" }, evidence: { type: "number" }, year: { type: "integer" }, tags: { type: "array", items: { type: "string" } }, meta: { type: "string" }, rel: { type: "object", description: "Per cancer id, which relevance signals apply (soc, pipeline, history, direct, indirect).", additionalProperties: { type: "object", additionalProperties: { type: "integer" } } } }, additionalProperties: true } }), { parameters: [{ name: "plural", in: "path", required: true, description: "The plural name of the kind, as used in the file name; only the kinds Explore shows exist here.", schema: { type: "string", enum: EXPLORE_KINDS.map((k) => KIND_META[k].plural) } }] }),
    "/api/v1/ideas/rankings/{view}.json": get("listIdeaRankings", `Every idea one view of the Idea rankings page can order, in rank order: rank, score (null for the editorial Cherry picked list), the score parts the formula reads (GLOBOCAN burden with the sites it was read from, linked cancers, breadth, evidence counts, cost band, horizon, maturity) and, for Cherry picked, the one-sentence reason; the page carries the first ${RANK_PAGE} rows of each view and fetches this file for the rest. Most wanted is an empty list until a discussion thread has a thumbs-up`, ok({ type: "array", items: { type: "object", required: ["rank", "parts", "score"], properties: { rank: { type: "integer" }, score: { type: ["number", "null"] }, reason: { type: "string" }, parts: { type: "object", required: ["id", "name", "tldr", "route", "cancers", "burden", "sites", "breadth", "evidence", "trials", "phase3", "drugs", "papers", "costRank", "maturity", "maturityRank"], properties: { id: { type: "string" }, name: { type: "string" }, tldr: { type: "string" }, route: { type: "string" }, cancers: { type: "array", items: { type: "object", required: ["id", "name", "route"], properties: { id: { type: "string" }, name: { type: "string" }, route: { type: "string" }, site: { type: "string" }, viaParent: { type: "string" } } } }, burden: { type: "integer", description: "Annual new cases, world, both sexes, all ages, summed over the distinct GLOBOCAN sites of the linked cancers." }, sites: { type: "array", items: { type: "object", required: ["code", "label", "cases", "cancerIds"], properties: { code: { type: "integer" }, label: { type: "string" }, cases: { type: ["integer", "null"] }, cancerIds: { type: "array", items: { type: "string" } } } } }, breadth: { type: "integer" }, evidence: { type: "integer" }, trials: { type: "integer" }, phase3: { type: "integer" }, drugs: { type: "integer" }, papers: { type: "integer" }, cost: { type: "string", enum: [...COST_ORDER] }, costRank: { type: "integer" }, horizon: { type: "number" }, maturity: { type: "string", enum: [...MATURITY_ORDER] }, maturityRank: { type: "integer" } } } } } }), { parameters: [{ name: "view", in: "path", required: true, description: "The view id, as used in the page's ?view= deep link.", schema: { type: "string", enum: [...VIEW_IDS] } }] }),
    "/api/v1/tables/{table}.json": get("listTableRows", "Every row of one paged table, as plain cells (strings, numbers, or objects with text, href, chip, sub and v; the kind browsers' rows carry id, name, tldr, route, status, facets and cols) in the table's default order; the page carries the first 30 rows (60 for a kind browser) and fetches this file for the rest. Tables: kind-<route> for the kind browsers (kind-trials, kind-key-papers, kind-people, kind-companies, kind-drugs, kind-ideas, kind-institutions, kind-targets, kind-terms, kind-technologies, kind-cancers), evidence (trials by evidence score), china-trials, university-output, university-output-grouped, university-score, audit-findings-<check>, audit-mismatches, audit-patches, audit-broken, audit-stale, pathway-matrix, pathway-nodes (one object per pathway with its nodes and products), dossier-trials-<target id>", { ...ok({ type: "array", items: { type: "object", additionalProperties: true } }), "404": { description: "No such table, or the table fits in one page and has no file." } }, { parameters: [{ name: "table", in: "path", required: true, description: "The table id, as listed in the summary.", schema: { type: "string", pattern: "^[a-z0-9]+(-[a-z0-9]+)*$" } }] }),
    "/api/v1/for-me/{id}.related.json": get("getForMeRelated", "Everything in OnCo that touches one cancer, for the For me picker: state of the art, red cards, the pipeline, the hopeful records (failures, withdrawals and historic items left out) grouped by kind as id, name, TL;DR, route and status, and edgeIds, the sorted record ids the Edge 'For you' filter (/edge/?for=<id>) matches feed items against: the cancer, its parent and subtypes, drugs approved or in phase 3 for it with those trials, its roadmaps and technologies", { ...ok({ type: "object", required: ["stateOfArt", "redCards", "pipeline", "groups", "edgeIds"], properties: { stateOfArt: { type: "array", items: { type: "string" } }, redCards: { type: "array", items: { type: "object", additionalProperties: true } }, pipeline: { type: "array", items: { type: "object", additionalProperties: true } }, groups: { type: "object", additionalProperties: true }, edgeIds: { type: "array", items: { type: "string" } } } }), "404": { description: "No such cancer id." } }, { parameters: [idParam("Kebab-case cancer id, for example tnbc or nsclc.")] }),
    "/api/v1/navigator/{id}.json": get("getNavigatorCancer", "One cancer's data for the line-of-therapy navigator: its standard-of-care rows with resolved references, the products, technologies, trials, pairings, ideas and targets relevant to it with their biomarker fields, every caution pairing, caregiver details (toxicity, limitations, monitoring) for its products, and the questions to ask", { ...ok({ type: "object", additionalProperties: true }), "404": { description: "No such cancer id." } }, { parameters: [idParam("Kebab-case cancer id, for example tnbc or nsclc.")] }),
    "/api/v1/explained/{id}.json": get("getExplainedSection", "One cancer's section of Trials in plain words (or 'other'): rows, every trial whose full row is in this section as id, name, status, phase, year, tldr and nct in page order (the page carries the first 10 and fetches the rest); refs, the trials also studied in this cancer whose row is in an earlier section, as id, name and in (that section's key); trials, every trial with structured results as id, outcomes, setting and enrolment keyed by trial id, the records the page turns into sentences when a heading is opened", { ...ok({ type: "object", required: ["rows", "refs", "trials"], properties: { rows: { type: "array", items: { type: "object", required: ["id", "name", "phase", "tldr"], properties: { id: { type: "string" }, name: { type: "string" }, status: { type: "string" }, phase: { type: "string" }, year: { type: "integer" }, tldr: { type: "string" }, nct: { type: "string" } } } }, refs: { type: "array", items: { type: "object", required: ["id", "name", "in"], properties: { id: { type: "string" }, name: { type: "string" }, in: { type: "string" } } } }, trials: { type: "object", additionalProperties: { type: "object", additionalProperties: true } } } }), "404": { description: "No such cancer id, or no trials with results for it." } }, { parameters: [idParam("Kebab-case cancer id, for example tnbc or nsclc, or 'other'.")] }),
    "/api/v1/navigator/lines.json": get("getNavigatorLines", "Every product and technology as id, name, kind and the cancer ids it is relevant to: the navigator's 'already tried' chooser", ok({ type: "array", items: { type: "object", required: ["id", "name", "kind", "cancers"], properties: { id: { type: "string" }, name: { type: "string" }, kind: { type: "string", enum: ["drug", "technology"] }, cancers: { type: "array", items: { type: "string" } } } } })),
    "/api/v1/my-cancers.json": get("getMyCancers", "Every cancer as id, name, site route and hub group; the small chooser list the site's header chip, account menu and welcome step fetch on demand", ok({ type: "array", items: { type: "object", required: ["id", "name", "route", "group"], properties: { id: { type: "string" }, name: { type: "string" }, route: { type: "string" }, group: { type: "string" } } } })),
    "/api/v1/spotlight.json": get("getSpotlight", "The home page spotlight: for every kind in the daily rotation, the most connected record as hero (id, name, route, TL;DR, three facts, up to eight connected records as pills, the connection count) plus two runners-up; with the selection rule, the schedule (day of year modulo the kinds list, reader's local date, ?spotlight=<kind> overrides) and buildKind, the set rendered into the home page HTML", ok({ type: "object", required: ["rule", "schedule", "kinds", "buildKind", "sets"], properties: { rule: { type: "string" }, schedule: { type: "string" }, kinds: { type: "array", items: ref("Kind") }, buildKind: ref("Kind"), sets: { type: "object", additionalProperties: { type: "object", required: ["kind", "label", "hero", "runnersUp"], properties: { kind: ref("Kind"), label: { type: "string" }, hero: { type: "object", required: ["id", "kind", "name", "route", "tldr", "facts", "pills", "connected"], additionalProperties: true }, runnersUp: { type: "array", items: { type: "object", required: ["id", "name", "route"], properties: { id: { type: "string" }, name: { type: "string" }, route: { type: "string" } } } } } } } } })),
    "/api/v1/context/{id}.md": get("getContext", "One entity as clean Markdown for language models: TL;DR, summary, fields, sources and connected records", { ...ok({ type: "string" }, "text/markdown"), "404": { description: "No such id." } }, { parameters: [idParam()] }),
    "/api/v1/context/index.md": get("getContextIndex", "Index of every Markdown context file with the record's TL;DR", ok({ type: "string" }, "text/markdown")),
    "/llms.txt": get("getLlmsTxt", "llms.txt: what the site is, the licence and the best entry points, for language models", ok({ type: "string" }, "text/plain"), { tags: ["site"] }),
    "/llms-full.txt": get("getLlmsFullTxt", "llms-full.txt: every record on one line with its TL;DR and the URL of its context file", ok({ type: "string" }, "text/plain"), { tags: ["site"] }),
    "/sitemap.xml": get("getSitemap", "Sitemap of every page", ok({ type: "string" }, "application/xml"), { tags: ["site"] }),
    "/feeds/{feed}.xml": get("getFeed", "Atom feeds: changelog, regulatory events, readout calendar, research pulse", ok({ type: "string" }, "application/atom+xml"), { tags: ["feeds"], parameters: [{ name: "feed", in: "path", required: true, schema: { type: "string", enum: ["changelog", "regulatory", "calendar", "pulse"] } }] }),
    "/edge/feed.xml": get("getEdgeFeed", "Atom feed of Edge: the freshest papers, trial results, approvals, withdrawals, law, proposals and issues, ranked newest first; 500 items", ok({ type: "string" }, "application/atom+xml"), { tags: ["feeds"] }),
    "/edge/feed.json": get("getEdgeFeedJson", "JSON Feed 1.1 of Edge with an _onco extension per item (kind, date precision, venue, DOI, linked records); 500 items", ok({ type: "object" }, "application/feed+json"), { tags: ["feeds"] }),
    "/edge/{type}/feed.xml": get("getEdgeTypeFeed", "Atom feed of one kind of Edge item only, the same ranking restricted to the kind; 100 items", ok({ type: "string" }, "application/atom+xml"), { tags: ["feeds"], parameters: [{ name: "type", in: "path", required: true, description: "The kind's plural slug, as in the page's ?type= deep link.", schema: { type: "string", enum: EDGE_KINDS.map(edgeTypeSlug) } }] }),
    "/edge/{type}/feed.json": get("getEdgeTypeFeedJson", "JSON Feed 1.1 of one kind of Edge item only, with the _onco extension; 100 items", ok({ type: "object" }, "application/feed+json"), { tags: ["feeds"], parameters: [{ name: "type", in: "path", required: true, description: "The kind's plural slug, as in the page's ?type= deep link.", schema: { type: "string", enum: EDGE_KINDS.map(edgeTypeSlug) } }] }),
    "/newsletter/feed.xml": get("getNewsletterFeed", "Atom feed of the weekly issue: what changed, regulatory events, upcoming readouts, what the journals said", ok({ type: "string" }, "application/atom+xml"), { tags: ["feeds"] }),
    "/catalysts/feed.ics": get("getCatalystFeed", "iCalendar feed of regulatory decisions, expected readouts and congresses", ok({ type: "string" }, "text/calendar"), { tags: ["feeds"] }),
  };
  const built = opts.built ?? new Date().toISOString().slice(0, 10);
  return {
    openapi: "3.1.0",
    jsonSchemaDialect: "https://json-schema.org/draft/2020-12/schema",
    info: {
      title: "OnCo Open API",
      version: opts.version ?? "1",
      summary: "The OnCo oncology knowledge graph as static files.",
      description: [
        `OnCo is a public, cited knowledge graph of oncology: ${total.toLocaleString("en-GB")} records in ${KINDS.length} kinds, one page per object, each with a plain-English TL;DR, a technical summary, dated facts and links to primary sources.`,
        "Every file here is written at build time and served from the CDN: no authentication, no rate limit beyond the CDN, permissive CORS. Files are regenerated on every deploy; meta.json carries the build time so clients can cache on it.",
        "Field names and enums come from the Zod schema in src/lib/schema.ts in the repository. The Entity schema below points at /api/v1/schema.json, which is generated from that file, so the two cannot drift.",
        `Kinds:\n${kindLines}`,
        "Licence: code MIT; data CC BY-NC 4.0, free for individual and educational use with attribution (\"Data from OnCo (onco.cc)\" with a link to https://onco.cc); commercial use must contact OnCo to pay for the data. Nothing here is medical advice: facts may be incomplete or out of date, verify at the primary source each record links.",
        `Description generated on ${built} from scripts/api-layout.ts.`,
      ].join("\n\n"),
      termsOfService: `${SITE}/about/#licence`,
      contact: { name: "OnCo on GitHub", url: `${REPO}/issues` },
      license: { name: "CC BY-NC 4.0 (data); MIT (code)", url: LICENCE_URL },
    },
    externalDocs: { description: "Endpoint list with live links, recipes and the MCP server", url: `${SITE}/build/` },
    servers: [{ url: SITE, description: "Production" }],
    tags: [
      { name: "corpus", description: "The records, under /api/v1/" },
      { name: "feeds", description: "Atom and iCalendar feeds for what changes" },
      { name: "site", description: "Discovery files for crawlers and language models" },
    ],
    paths,
    components: {
      schemas: {
        Kind: { type: "string", enum: [...KINDS], description: KINDS.map((k) => `${k}: ${KIND_META[k].plural}`).join("; ") },
        Status: { type: "string", enum: [...STATUSES] },
        EntityRef: { type: "object", required: ["id", "kind"], properties: { id: { type: "string" }, kind: ref("Kind") } },
        NeighbourRef: { type: "object", required: ["id", "kind", "name", "route"], properties: { id: { type: "string" }, kind: ref("Kind"), name: { type: "string" }, route: { type: "string", description: "Site-relative URL of the entity page, for example /targets/trop2/." } } },
        Entity: { $ref: `${SITE}/api/v1/schema.json`, description: "One record. The full schema (shared and kind-specific fields) is the generated JSON Schema at /api/v1/schema.json." },
        EntityResponse: { type: "object", required: ["entity", "route", "neighbours"], properties: { entity: ref("Entity"), route: { type: "string" }, neighbours: { type: "object", description: "Outgoing plus incoming neighbours, keyed by kind.", additionalProperties: { type: "array", items: ref("NeighbourRef") } } } },
        SearchDoc: { type: "object", required: ["id", "kind", "name", "tldr", "route"], properties: { id: { type: "string" }, kind: ref("Kind"), name: { type: "string" }, tldr: { type: "string" }, route: { type: "string" }, status: ref("Status") }, additionalProperties: true },
        RankingRow: { type: "object", required: ["rank", "id", "name", "score"], properties: { rank: { type: "integer" }, id: { type: "string" }, name: { type: "string" }, city: { type: "string" }, country: { type: "string", description: "ISO 3166-1 alpha-2" }, newsweekOncology2026: { type: ["integer", "null"] }, nci: { type: ["string", "null"] }, links: { type: "integer" }, newsweekPoints: { type: "integer" }, nciPoints: { type: "integer" }, linkPoints: { type: "integer" }, score: { type: "integer" } } },
        Meta: {
          type: "object",
          required: ["built", "schema", "counts", "total", "license", "attribution", "files"],
          properties: {
            built: { type: "string", format: "date-time" }, schema: { type: "integer" }, version: { type: ["string", "null"] },
            attribution: { type: "string", examples: [EXPORT_LICENCE] }, licenseUrl: { type: "string", format: "uri" }, license: { type: "string", examples: ["CC BY-NC 4.0"] },
            source: { type: "string", format: "uri" }, total: { type: "integer" },
            counts: { type: "object", properties: Object.fromEntries(KINDS.map((k) => [k, { type: "integer" }])), additionalProperties: { type: "integer" } },
            files: { type: "array", items: { type: "object", required: ["path", "contents"], properties: { path: { type: "string" }, contents: { type: "string" } } } },
            feeds: { type: "array", items: { type: "string" } }, releases: { type: "string", format: "uri" }, openapi: { type: "string" },
          },
        },
      },
    },
  };
}
