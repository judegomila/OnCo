/**
 * trials_near: the one tool that leaves the machine. It queries ClinicalTrials.gov API v2 (the same calls
 * the site makes from the browser) for recruiting studies near a place, and enriches hits with OnCo records
 * where the NCT id is known to the corpus.
 */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { buildGeoApiUrl, buildGeoSearchUrl, parseGeoStudies } from "../../src/lib/ctgov-geo";
import { brief, fail, g, text } from "./context";

export function registerTrialsNear(server: McpServer) {
  const byNct = new Map(g.kind("trial").filter((t) => t.nct).map((t) => [t.nct!, t]));
  server.registerTool("trials_near", {
    title: "Recruiting trials near a place (live)",
    description: "Live query to ClinicalTrials.gov for recruiting studies matching a condition and/or intervention, restricted to a country or to a radius around coordinates. Returns NCT id, title, phase, sponsor, nearest site and distance, plus the OnCo trial record when the NCT id is in the corpus. Network call; results are not curated by OnCo.",
    inputSchema: {
      condition: z.string().optional().describe("e.g. triple negative breast cancer"),
      intervention: z.string().optional().describe("e.g. sacituzumab govitecan"),
      country: z.string().optional().describe("Country or city name as ClinicalTrials.gov lists it, e.g. United Kingdom"),
      lat: z.number().optional(), lon: z.number().optional(), radiusMi: z.number().min(1).max(500).default(50),
      pageSize: z.number().int().min(1).max(50).default(15),
    },
  }, async ({ condition, intervention, country, lat, lon, radiusMi, pageSize }) => {
    if (!condition && !intervention) return fail("Give a condition and/or an intervention.");
    const center = lat !== undefined && lon !== undefined ? { lat, lon, radiusMi } : undefined;
    const api = buildGeoApiUrl({ condition, intervention, country, center, pageSize });
    try {
      const r = await fetch(api, { headers: { Accept: "application/json", "User-Agent": "OnCo MCP (https://github.com/judegomila/OnCo)" } });
      if (!r.ok) return fail(`ClinicalTrials.gov returned ${r.status}`);
      const studies = parseGeoStudies((await r.json()) as { studies?: unknown[] } as Parameters<typeof parseGeoStudies>[0], center);
      return text({ query: { condition, intervention, country, center }, searchUrl: buildGeoSearchUrl({ condition, intervention, country }), studies: studies.map((s) => ({ ...s, sites: s.sites.length, onco: byNct.has(s.nctId) ? brief(byNct.get(s.nctId)!) : undefined })) });
    } catch (e) {
      return fail(`ClinicalTrials.gov request failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  });
}
