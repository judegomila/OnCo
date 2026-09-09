/** Prompts: reusable briefs that tell an assistant which OnCo tools to call and how to cite. */
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { biomarkers } from "../../src/data/biomarkers";
import { g } from "./context";

const GROUND_RULES = `Ground rules: use only what the OnCo tools return. Cite the OnCo URL after every fact. Do not add numbers, dates or claims that are not in a tool result; if something is missing, say "OnCo has no record of this". Use UK spelling. Finish with the standard note that OnCo is an orientation tool, not medical advice, and that decisions belong with the patient and their clinicians.`;

const user = (text: string) => ({ messages: [{ role: "user" as const, content: { type: "text" as const, text } }] });

export function registerPrompts(server: McpServer) {
  server.registerPrompt("tumour_board_prep", {
    title: "Tumour board preparation",
    description: "Prepare a one-page brief for a case: standard of care for the stage, biomarker-matched options, relevant trials, toxicities to weigh, and the questions to ask. Every line cited to an OnCo page.",
    argsSchema: {
      cancerId: z.string().describe(`OnCo cancer id, e.g. ${g.kind("cancer").slice(0, 6).map((c) => c.id).join(", ")}`),
      biomarkers: z.string().optional().describe(`Comma-separated biomarker ids, e.g. ${biomarkers.slice(0, 4).map((b) => b.id).join(", ")}`),
      stage: z.string().optional().describe("early, locally advanced, metastatic first line, or metastatic later lines"),
    },
  }, ({ cancerId, biomarkers: bm, stage }) => user(`Prepare a tumour board brief for ${cancerId}${stage ? ` (${stage})` : ""}${bm ? ` with biomarkers: ${bm}` : ""}.

Steps:
1. Call for_cancer("${cancerId}") and regimens("${cancerId}"${stage ? `, setting matching "${stage}"` : ""}) for the standard of care and state of the art.
${bm ? `2. Call biomarker_match with biomarkers [${bm.split(",").map((s) => `"${s.trim()}"`).join(", ")}] and cancerId "${cancerId}" for matched options; note cautions.` : "2. Skip biomarker matching (none given) and say which biomarkers the cancer record says to test."}
3. For the top three products, call toxicity_compare with their ids and summarise grade 3+ events side by side.
4. Call list_kind("trial", status "recruiting") and keep those linked to the cancer, or use trials_near if a location is known.
5. Call ask with the two or three open questions the case raises and quote the cited sentences.

Write: Standard of care (by setting) / Biomarker-matched options / Trials / Toxicity trade-offs / Questions for the board. ${GROUND_RULES}`));

  server.registerPrompt("investor_brief", {
    title: "Investor brief on a target, product or company",
    description: "A competitive brief: the record, its competitors (similar and linked products), pivotal trial results, approvals by region, upcoming catalysts, and the bottlenecks in play. Cited to OnCo pages, no invented numbers.",
    argsSchema: { id: z.string().describe("OnCo id of a target, product or company, e.g. trop2, datopotamab-deruxtecan, astrazeneca"), horizonMonths: z.string().optional().describe("Catalyst horizon in months, default 12") },
  }, ({ id, horizonMonths }) => user(`Write an investor brief on OnCo record "${id}" with a ${horizonMonths ?? "12"}-month catalyst horizon.

Steps:
1. get_entity("${id}") for the record, neighbours and similar records.
2. If it is a target: rank(kind "drug", limit 15) filtered to products linking the target; if a product: compare it with its two closest competitors from "similar"; if a company: list its products via neighbours and rank them.
3. For each key product, get_entity for approvals and pivotal trials; get_entity on those trials for outcomes.
4. calendar(from today, to today plus ${horizonMonths ?? "12"} months) and keep events whose refs include these ids.
5. path_between the record and any bottleneck ids in its neighbours to explain structural risks.

Write: What it is / Competitive set / Evidence (trial outcomes with numbers only as returned) / Approvals by region / Catalysts with dates and confidence / Risks and bottlenecks. Mark every estimate from OnCo as "expected" where the calendar does. ${GROUND_RULES}`));

  server.registerPrompt("plain_language_explainer", {
    title: "Plain-language explainer",
    description: "Explain a record for a patient or carer in plain words using the TL;DR and simple-language fields, with the questions to ask a clinician.",
    argsSchema: { id: z.string().describe("OnCo id of any record") },
  }, ({ id }) => user(`Explain OnCo record "${id}" to someone with no medical background. Call get_entity("${id}") and use its tldr and simple fields first, then ask("what should a patient ask about ${id}") for cited sentences. Keep to short sentences, define every technical word once, and end with three questions to bring to the clinic. ${GROUND_RULES}`));
}
