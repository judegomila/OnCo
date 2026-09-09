/** Resources: one per kind (JSON lists), one template per record (JSON), one template per record as Markdown context. */
import { ResourceTemplate, type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { KIND_META, KINDS, type Entity } from "../../src/lib/schema";
import { paragraphs } from "../../src/lib/text";
import { brief, g, url } from "./context";

function contextMarkdown(e: Entity): string {
  const parts = [`# ${e.name}`, "", `Source: ${url(e)}`, `OnCo record \`${e.id}\` (${KIND_META[e.kind].label}). Last checked ${e.asOf}. Data CC BY 4.0, attribute "OnCo (onco.cc)".`, "", "## TL;DR", "", e.tldr, "", "## Summary", "", ...paragraphs(e.summary).flatMap((p) => [p, ""])];
  if (e.status) parts.push(`Status: ${e.status}`, "");
  if (e.links.length || e.wikipedia) parts.push("## Sources", "", ...(e.wikipedia ? [`- Wikipedia: ${e.wikipedia}`] : []), ...e.links.map((l) => `- ${l.label}: ${l.url}`), "");
  const nb: string[] = [];
  for (const [k, list] of g.neighbours(e.id)) nb.push(`- ${KIND_META[k].plural}: ${list.map((x) => `[${x.name}](${url(x)})`).join(", ")}`);
  if (nb.length) parts.push("## Connected records", "", ...nb, "");
  return parts.join("\n");
}

export function registerResources(server: McpServer) {
  for (const k of KINDS) {
    server.registerResource(`kind-${k}`, `onco://kinds/${k}`, { title: `OnCo ${KIND_META[k].plural}`, description: `${KIND_META[k].blurb} (${g.kind(k).length} records: id, name, status, tldr, url)`, mimeType: "application/json" },
      async (uri) => ({ contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify(g.kind(k).map(brief), null, 1) }] }));
  }

  const ids = g.entities.map((e) => e.id);
  const completeId = (value: string) => ids.filter((id) => id.startsWith(value.toLowerCase())).slice(0, 50);

  server.registerResource("entity", new ResourceTemplate("onco://entity/{id}", {
    list: async () => ({ resources: g.entities.map((e) => ({ uri: `onco://entity/${e.id}`, name: e.name, description: `${KIND_META[e.kind].label}: ${e.tldr}`, mimeType: "application/json" })) }),
    complete: { id: completeId },
  }), { title: "OnCo record (JSON)", description: "Full record by id, with neighbours grouped by kind and the page URL.", mimeType: "application/json" },
  async (uri, { id }) => {
    const e = g.get(String(id));
    if (!e) throw new Error(`Unknown id "${id}"`);
    const neighbours: Record<string, Array<{ id: string; name: string; url: string }>> = {};
    for (const [k, list] of g.neighbours(e.id)) neighbours[k] = list.map((x) => ({ id: x.id, name: x.name, url: url(x) }));
    return { contents: [{ uri: uri.href, mimeType: "application/json", text: JSON.stringify({ entity: e, url: url(e), neighbours }, null, 1) }] };
  });

  server.registerResource("context", new ResourceTemplate("onco://context/{id}", { list: undefined, complete: { id: completeId } }),
    { title: "OnCo record (Markdown context)", description: "Clean Markdown for one record: TL;DR, summary, sources, connected records. Same content as https://onco.cc/api/v1/context/<id>.md.", mimeType: "text/markdown" },
    async (uri, { id }) => {
      const e = g.get(String(id));
      if (!e) throw new Error(`Unknown id "${id}"`);
      return { contents: [{ uri: uri.href, mimeType: "text/markdown", text: contextMarkdown(e) }] };
    });
}
