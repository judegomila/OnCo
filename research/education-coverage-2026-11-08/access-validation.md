# First domain implementation checks

The access/regulatory batch adds four terms and updates 13 existing owners, including a scoped PRIME clarification on the existing EU owner. All 17 records have a 2026-11-08 check date. The diagnostic schematic receives a wording correction only.

- Validate: passed, 22,687 entities, no dangling or duplicate IDs.
- Typecheck: passed.
- Lint: exit 0 with seven existing warnings outside the contribution.
- Full suite: 282 files and 2,817 tests passed, two skipped. Subsequent wording changes passed three focused files (24 tests); the latest coverage-closure checks passed all six helper tests.
- Dedupe: same nine baseline groups, zero duplicate DOI/PMID groups.
- Render: all 17 affected records include their explicit sources and current dates, with no nested anchors. Small new pages and the changed companion-diagnostic/approval/access text were read. The diagram says “Corresponding labeled treatment.”

The full production build compiled and generated the 22,687-record API, then failed on the unchanged named `GRAPH_JSON` export in `src/app/cancers/map/page.tsx:12`. The same export is present at the pinned main baseline. No route or build configuration is changed in this content proposal. Generated build artifacts were excluded.

The full audit remains active. Nine curriculum sources have completed first-pass semantic review. The source ledger distinguishes proposed implementation from main. Two concrete schema questions remain open; 514 content items and 14 navigation sources are not closed. The adjacent searches retain 135 discovery results that still need concept screening. No expert sign-off or deployment is claimed.

Security/source custody: the research tree and source patch passed gitleaks. Full downloaded HTML produced three matches in unrelated public browser configuration. Those scripts are excluded from published captures: CMS retains its exact main element and the two inaccessible eCFR responses retain their exact title plus full-response hashes. No regulatory claim uses those blocked responses.
