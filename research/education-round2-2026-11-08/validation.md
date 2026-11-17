# Validation

Checked 8 November 2026 in the isolated `codex/education-concepts-round2` worktree, based on upstream `0f8ebc2569e2dcb023364d8cb6971186f11f59ab`.

- `npm run validate`: passed, 22,719 records (36 new terms; no dangling or duplicate IDs).
- `npm run typecheck`: passed on the final source tree. After the production-build attempt, only the generated `.next/types` directory was moved outside the checkout to restore the clean standalone typecheck environment. The production route-type failure remains documented below.
- `npm run lint`: exit 0, seven pre-existing unused-variable warnings, none in changed files.
- Focused final tests: 4 files, 23 tests passed (orphans, tone, corpus rules and wave-8 animation invariants).
- Full suite: 281 files passed, 2,813 tests passed and two skipped. After the final pathway TL;DR wording change, the affected tone, corpus-rule and Ask/search tests were rerun and passed; 65 tests passed across four files.
- `npm run dedupe`: same nine baseline groups (two registry and seven name groups), zero DOI or PMID duplicate groups. No new group.
- Link-sense inventory: no increase versus the pinned baseline and within existing floors; no floor file changed.
- Actual component renders: 45 affected records, all explicit source URLs present, check dates current, no nested anchors. The small certificate-of-analysis and immunodominance pages, plus assay/binder/release/pathway pages, were read as rendered text. Release-testing labels and four animation captions were also evaluated after correction. This is not a browser screenshot or deployment review.
- Source custody: all 47 cited DOI URLs match independently captured Europe PMC DOI identities; every raw primary response hash verified. Exact official gzip archives checked after decompression against original-byte hashes. Every one of 105 Elicit result occurrences has a disposition.
- Gitleaks 8.24.3: no leaks in research artifacts or decompressed official HTML/JSON. The proposed commit range is scanned again after committing and reported with the PR.

## Production build limitation

`npm run build -- --webpack` completed the entire API/index/context pipeline for 22,719 entities and compiled the Next application successfully in 70 seconds. Next's generated route-type check then rejected the existing named `GRAPH_JSON` export in [`src/app/cancers/map/page.tsx`, line 12](https://github.com/judegomila/OnCo/blob/0f8ebc2569e2dcb023364d8cb6971186f11f59ab/src/app/cancers/map/page.tsx#L12):

```text
Property 'GRAPH_JSON' is incompatible with index signature.
Type '"/cancers/map/graph.json"' is not assignable to type 'never'.
```

That page is unchanged from the pinned upstream baseline. No build configuration, route export, test floor or budget was changed to bypass it. Webpack was selected because default Turbopack does not support this worktree's external dependency symlink. The dependency directory is shared by symlink; it was not copied.

The eight tracked generated files changed by the build were restored to the branch baseline. Generated newsletter and Next route-type artifacts were retained outside the checkout. Only authored content, corrections and research custody files are proposed. The source build did not complete; no production deployment is claimed.

## Review status

[Issue #372](https://github.com/judegomila/OnCo/issues/372) has no maintainer triage at the last check. The PR is a draft pending the contribution gate and scientific/regulatory/advocate review. No expert sign-off, reviewer identity or conflict-of-interest statement is invented. No merge or deployment is authorized by opening the draft.
