/** Executable entry: `npx -y onco-mcp` (stdio). Bundled to dist/onco-mcp.mjs by scripts/build-packages.ts. */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { OncoClient, resolveApi } from "../../onco-cli/src/client";
import { createServer, VERSION } from "./server";

const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  process.stdout.write(`onco-mcp ${VERSION}: Model Context Protocol server for OnCo (stdio).\n\nUsage: onco-mcp [--api <url|path>]\n  ONCO_API or --api points at another copy of /api/v1 (default https://onco.cc/api/v1); a directory such as out/api/v1 works offline.\n\nTools: search, get_entity, list_kind, ask, context, compare. Resources: onco://kinds, onco://kinds/{kind}. Prompt: onco-brief.\n`);
  process.exit(0);
}
if (args.includes("--version") || args.includes("-v")) { process.stdout.write(`${VERSION}\n`); process.exit(0); }

const apiFlag = args.indexOf("--api") >= 0 ? args[args.indexOf("--api") + 1] : args.find((a) => a.startsWith("--api="))?.slice(6);
const server = createServer(new OncoClient(resolveApi(apiFlag)));
server.connect(new StdioServerTransport()).catch((err: Error) => { process.stderr.write(`onco-mcp: ${err.message}\n`); process.exit(1); });
