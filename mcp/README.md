# onco-mcp

An MCP (Model Context Protocol) server that gives AI assistants structured, cited access to [OnCo](https://onco.cc), the public knowledge graph of oncology. Everything is computed from the same data files the site is built from. The one exception is `trials_near`, which queries ClinicalTrials.gov live.

Data is CC BY 4.0: name OnCo and link to https://onco.cc wherever the output is used.

## Run

From a checkout of the repository (the server reads `src/data` and `src/lib` directly):

```sh
git clone https://github.com/judegomila/OnCo.git
cd OnCo && npm ci
npm run mcp          # stdio transport
```

Or `node mcp/bin.mjs`. For a zero-install route that needs no checkout, `packages/onco-mcp` publishes `npx -y onco-mcp`: it reads the public API and covers search, records, lists, cited answers, Markdown context and comparison (see `packages/onco-mcp/README.md` and `docs/ACCESS.md`). The server in this folder remains the one with biomarker matching, regimens, calendar, toxicity comparison, graph paths and live trials.

## Configure

Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "onco": { "command": "npm", "args": ["run", "--silent", "mcp"], "cwd": "/path/to/OnCo" }
  }
}
```

Claude Code:

```sh
claude mcp add onco -- npm run --silent --prefix /path/to/OnCo mcp
```

Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "onco": { "command": "npm", "args": ["run", "--silent", "--prefix", "/path/to/OnCo", "mcp"] }
  }
}
```

## Tools

| Tool | What it does |
|---|---|
| `search` | Word search plus concept search, fused; each hit says why it matched. Optional kind filter. |
| `ask` | Grounded, cited answer: the best sentences from the top records, copied verbatim, one citation each, with source URLs. No language model. |
| `get_entity` | Full record, neighbours by kind, and similar (not directly linked) records with the shared links that explain them. |
| `list_kind` | All records of a kind, optionally by status. |
| `for_cancer` | Everything relevant to a cancer, grouped by kind, plus state of the art and standard of care. |
| `rank` | The Explore power view: ranked records of a kind, optionally for a cancer, with the disclosed score. |
| `similar` | Pages like this for one record. |
| `biomarker_match` | Tumour-board matching: biomarker ids (and optional cancer) to products, technologies, trials, pairings, ideas and targets. |
| `compare` | Two to five records of one kind side by side, with the fields that differ. |
| `regimens` | Standard-of-care rows for a cancer with cited products and trials and guideline mapping. |
| `calendar` | PDUFA dates, advisory committees, expected readouts, congresses, policy dates; filter by range, kind or record. |
| `toxicity_compare` | Grade 3+ and any-grade adverse-event rates across products or a modality, grouped by event family. |
| `path_between` | Shortest routes between two records, every hop labelled with its relationship. |
| `trials_near` | Live ClinicalTrials.gov query for recruiting studies by condition or intervention near a country or coordinates, cross-referenced to OnCo trial records. |

## Resources

- `onco://kinds/{kind}`: JSON list of every record of a kind (cancer, drug, target, trial, ...).
- `onco://entity/{id}`: one record as JSON with neighbours (completion on id).
- `onco://context/{id}`: one record as clean Markdown (TL;DR, summary, sources, connected records), the same content as `https://onco.cc/api/v1/context/<id>.md`.

## Prompts

- `tumour_board_prep(cancerId, biomarkers?, stage?)`: a one-page case brief, every line cited.
- `investor_brief(id, horizonMonths?)`: competitive set, evidence, approvals, catalysts, bottlenecks.
- `plain_language_explainer(id)`: a patient-facing explanation with questions for the clinic.

Each prompt ends with the same ground rules: use only tool output, cite an OnCo URL after every fact, never add numbers that are not in a result, and close with the note that OnCo is an orientation tool, not medical advice.

## Design notes

- Search and `ask` share the browser's indexes: MiniSearch for words, a TF-IDF concept index over each record plus the names of everything it links to for meaning. Results are fused by reciprocal rank.
- `ask` is extractive by construction, so it cannot invent. It scores sentences by coverage of the question's informative words and returns at most two per record.
- Scores in `rank` and `biomarker_match` are the disclosed formulas from the site (see https://onco.cc/about/); they rank documentation and evidence, not clinical benefit.
