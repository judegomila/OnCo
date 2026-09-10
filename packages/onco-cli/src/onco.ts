/**
 * `onco`: the OnCo knowledge graph from the terminal, read straight from the static API.
 *
 *   onco search "HER2-low breast cancer" --kind drug
 *   onco get trastuzumab-deruxtecan            onco get /drugs/enhertu/ --json
 *   onco list trial --filter status=recruiting --limit 20
 *   onco ask "What are the side effects of Enhertu?" --region UK
 *   onco context tnbc                          onco kinds
 *   onco export cancer --csv > cancers.csv
 *
 * ONCO_API (or --api) points at another copy of /api/v1, for example a local `out/api/v1` after `npm run build`.
 */
import { bool, int, list, parseArgs, str, type Parsed } from "./args";
import { applyFilters, ATTRIBUTION, DEFAULT_API, kindsTable, OncoClient, OncoError, parseKind, REGIONS, resolveApi, urlFor, type Env, type Kind, type Region } from "./client";
import { entityJson, formatAsk, formatEntity, formatSearch, formatTable } from "./format";

export const VERSION = process.env.ONCO_PACKAGE_VERSION ?? "0.1.0";

export const HELP = `onco ${VERSION}: OnCo, the public cited knowledge graph of oncology, from the terminal.

Usage
  onco search <query> [--kind <kind>] [--limit N] [--json]
  onco get <id|route|url> [--json]
  onco list <kind> [--filter key=value ...] [--limit N] [--json]
  onco ask "<question>" [--region US|EU|UK|JP|CN|AU] [--pin <id>] [--json]
  onco context <id>
  onco kinds [--json]
  onco export <kind> --csv|--json
  onco meta

Options
  --api <url|path>   API root (default ${DEFAULT_API}); ONCO_API does the same. A directory such as out/api/v1 works offline.
  --json             Machine output; the attribution line then goes to stderr.
  --quiet            No attribution line at all (you still owe the attribution wherever the data appears).
  --help, --version

Kinds: cancer, section (fronts), technology, target, drug, company, institution, pathway, term, trial, pairing,
roadmap, idea, collection, person, bottleneck, paper (key papers), journal. Plurals and route names work too.

${ATTRIBUTION}`;

type Io = { out: (s: string) => void; err: (s: string) => void };

/** Runs one invocation and returns the exit code. Pure apart from the client's reads, so it is testable. */
export async function run(argv: string[], io: Io = { out: (s) => process.stdout.write(`${s}\n`), err: (s) => process.stderr.write(`${s}\n`) }, env: Env = process.env): Promise<number> {
  let parsed: Parsed;
  try { parsed = parseArgs(argv); } catch (err) { io.err((err as Error).message); return 2; }
  const { command, positionals, flags } = parsed;
  if (bool(flags, "version") || bool(flags, "v")) { io.out(VERSION); return 0; }
  if (!command || bool(flags, "help") || bool(flags, "h") || command === "help") { io.out(HELP); return command || bool(flags, "help") || bool(flags, "h") ? 0 : 2; }

  const machine = bool(flags, "json") || bool(flags, "csv");
  const quiet = bool(flags, "quiet") || bool(flags, "no-attribution");
  const attribute = () => { if (quiet) return; if (machine) io.err(ATTRIBUTION); else io.out(`\n${ATTRIBUTION}`); };
  const emitJson = (data: unknown) => io.out(JSON.stringify(data, null, 2));

  let client: OncoClient;
  try { client = new OncoClient(resolveApi(str(flags, "api"), env)); } catch (err) { io.err((err as Error).message); return 2; }

  const needKind = (input: string | undefined): Kind => {
    if (!input) throw new OncoError("A kind is required. Run `onco kinds` to list them.", "usage");
    const k = parseKind(input);
    if (!k) throw new OncoError(`Unknown kind "${input}". Run \`onco kinds\` to list them.`, "usage");
    return k;
  };

  try {
    switch (command) {
      case "search": {
        const query = positionals.join(" ");
        if (!query.trim()) throw new OncoError("Usage: onco search <query> [--kind <kind>]", "usage");
        const kind = str(flags, "kind") ? needKind(str(flags, "kind")) : undefined;
        const hits = await client.search(query, { kind, limit: int(flags, "limit", 10) });
        if (bool(flags, "json")) emitJson({ query, kind: kind ?? null, results: hits }); else io.out(formatSearch(hits));
        break;
      }
      case "get": case "show": {
        if (!positionals[0]) throw new OncoError("Usage: onco get <id|route|url> [--json]", "usage");
        const rec = await client.entity(positionals[0]);
        if (bool(flags, "json")) emitJson(entityJson(rec)); else io.out(formatEntity(rec));
        break;
      }
      case "list": case "ls": {
        const kind = needKind(positionals[0]);
        const rows = applyFilters(await client.list(kind), list(flags, "filter"));
        const limit = str(flags, "limit") ? int(flags, "limit", 50) : rows.length;
        const shown = rows.slice(0, limit);
        if (bool(flags, "json")) emitJson({ kind, total: rows.length, shown: shown.length, results: shown.map((e) => ({ id: e.id, kind: e.kind, name: e.name, status: e.status, tldr: e.tldr, url: urlFor(e) })) });
        else {
          io.out(formatTable(shown.map((e) => ({ id: e.id, name: e.name, status: e.status ?? "", tldr: e.tldr })), ["id", "name", "status", "tldr"], { id: 36, name: 40, status: 14, tldr: 80 }));
          io.out(`\n${shown.length} of ${rows.length} ${rows.length === 1 ? "record" : "records"}${list(flags, "filter").length ? ` matching ${list(flags, "filter").join(", ")}` : ""}.`);
        }
        break;
      }
      case "ask": {
        const question = positionals.join(" ");
        if (question.trim().length < 3) throw new OncoError('Usage: onco ask "<question>" [--region UK]', "usage");
        const regionFlag = str(flags, "region")?.toUpperCase();
        if (regionFlag && !REGIONS.includes(regionFlag as Region)) throw new OncoError(`--region must be one of ${REGIONS.join(", ")}`, "usage");
        const result = await client.ask(question, { region: regionFlag as Region | undefined, pin: str(flags, "pin"), onStep: machine || quiet ? undefined : (s) => io.err(`… ${s}`) });
        if (bool(flags, "json")) {
          const { analysis, ...rest } = result;
          emitJson({ question, ...rest, sources: rest.sources.map((s) => ({ ...s, url: urlFor(s) })), analysis: { intent: analysis.intent, entities: analysis.entities.map((e) => ({ id: e.entry.id, name: e.entry.name, matched: e.pattern, strong: e.strong })) } });
        } else io.out(formatAsk(result));
        break;
      }
      case "context": {
        if (!positionals[0]) throw new OncoError("Usage: onco context <id>", "usage");
        io.out((await client.context(positionals[0])).trimEnd());
        break;
      }
      case "kinds": {
        const rows = await kindsTable(client);
        if (bool(flags, "json")) emitJson(rows);
        else io.out(formatTable(rows.map((r) => ({ kind: r.kind, plural: r.plural, count: r.count ?? "", about: r.blurb })), ["kind", "plural", "count", "about"], { about: 90 }));
        break;
      }
      case "export": {
        const kind = needKind(positionals[0]);
        if (bool(flags, "csv")) io.out((await client.csv(kind)).trimEnd());
        else if (bool(flags, "json")) io.out(JSON.stringify(await client.list(kind)));
        else throw new OncoError("Usage: onco export <kind> --csv|--json", "usage");
        break;
      }
      case "meta": {
        const m = await client.meta();
        if (bool(flags, "json")) emitJson(m);
        else io.out([`Built: ${m.built}`, `Version: ${m.version ?? "n/a"}`, `Records: ${m.total}`, `API: ${client.source.base}`, "", formatTable(Object.entries(m.counts).map(([kind, count]) => ({ kind, count })), ["kind", "count"])].join("\n"));
        break;
      }
      default:
        io.err(`Unknown command "${command}". Run \`onco --help\`.`);
        return 2;
    }
  } catch (err) {
    if (err instanceof OncoError) { io.err(err.message); return err.code === "usage" ? 2 : 1; }
    io.err(`onco: ${(err as Error).message}`);
    return 1;
  }
  attribute();
  return 0;
}
