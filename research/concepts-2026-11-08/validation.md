# Validation and rendered-page review

Checked 8 November 2026 against baseline `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`. This contribution changes data and research artifacts. It does not change the schema, renderer, navigation or deployment configuration.

| Check | Observed result |
|---|---|
| `npm run validate` | Pass: 22,712 records, including 29 new terms; no duplicate IDs or dangling references |
| `SLOW_TEST_MS=240000 npm test -- --maxWorkers=2` | Pass: 281 test files, 2,813 tests passed, two skipped; 271.26 seconds |
| Final focused tone, corpus-rule and link-sense files | Pass: three files, 77 tests, after the last prose/source-link correction |
| `npm run lint` | Exit 0: no errors, seven existing unused-variable warnings in untouched files |
| `npm run typecheck`, before Next generated route types | Pass; no data/schema errors |
| `npm run dedupe` | Same nine pre-existing groups; zero paper DOI or PubMed duplicate groups. Output differs from baseline only in total entity count |
| Link-sense ratchet | Pass: no class/rule count increased above the checked-in floor; no floor or budget changed |
| Actual `EntityDetail` rendering | All 34 new/augmented records rendered; every explicit source URL present; no nested anchors |
| API/context generation | Completed for 22,712 records; all 34 affected entity JSON files present |
| Raw-source integrity | JSON parses and captured response hashes verified; publication identities and supporting abstracts resolved/read separately from Elicit discovery |

The [render review](render-review.json) records the affected IDs, HTML byte sizes and source URLs. Qualification, agreement, growth-rate and external-validation pages were read as rendered text, including the smaller pages' related cards and source panels. These checks cover record rendering; they do not establish a complete static export, browser hydration or a live deployment.

## Production build blocker

`npm run build` completed its API/context/search phase, then Turbopack rejected the worktree's external `node_modules` symlink. Dependencies are shared to comply with the worktree instructions; none were copied or changed.

The supported fallback, `npx next build --webpack`, compiled successfully in 69 seconds, then failed Next's generated route-type check:

```text
.next/types/app/cancers/map/page.ts(14,13): error TS2344
Property 'GRAPH_JSON' is incompatible with index signature.
Type '"/cancers/map/graph.json"' is not assignable to type 'never'.
```

The named export is at `src/app/cancers/map/page.tsx:12`. The entire file is byte-identical to upstream main; [build-blocker.json](build-blocker.json) preserves the baseline SHA and matching file hash. No product change was included to work around this unrelated error. Running the standalone typecheck after generating Next route types reproduces that same error, so the initial clean-checkout typecheck pass must not be read as a successful production build. Full export and live-page verification remain uncompleted.

Build-generated changes to changelog, star metadata, freshness and newsletter files were removed from the contribution. The research artifacts and authored records are explicitly staged.

The three exact FDA HTML responses are stored as deterministic gzip archives. Their original response SHA-256 and archive SHA-256 are both retained in `primary/official-manifest.json`; decompression was verified to reproduce each original hash. This preserves source whitespace without treating it as authored code.
