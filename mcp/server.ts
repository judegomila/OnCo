/**
 * OnCo MCP server: exposes the corpus to AI assistants over stdio.
 *
 *   npm run mcp            (from the repository root)
 *
 * Tools: search, ask, get_entity, list_kind, for_cancer, rank, similar, biomarker_match, compare, regimens,
 *        calendar, toxicity_compare, path_between, trials_near (live ClinicalTrials.gov).
 * Resources: onco://kinds/{kind}, onco://entity/{id}, onco://context/{id}.
 * Prompts: tumour_board_prep, investor_brief, plain_language_explainer.
 *
 * Everything except trials_near is computed from the same graph the site is built from, with no network
 * calls. See mcp/README.md for Claude Desktop, Claude Code and Cursor configuration.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerLookup } from "./tools/lookup";
import { registerPower } from "./tools/power";
import { registerTrialsNear } from "./tools/trials-near";
import { registerResources } from "./tools/resources";
import { registerPrompts } from "./tools/prompts";

const server = new McpServer({ name: "onco", version: "0.3.0" });
registerLookup(server);
registerPower(server);
registerTrialsNear(server);
registerResources(server);
registerPrompts(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main().catch((e) => { console.error(e); process.exit(1); });
