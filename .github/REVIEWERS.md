# Review tracks

Who checks what before a change to `src/data/` is merged. Names are added as reviewers join; until then the maintainer (@judegomila) reviews everything and says so in the PR.

| Track | Scope | What the reviewer checks | Badge |
|---|---|---|---|
| Maintainer | Everything | Schema validity, sources present, no patient data, licence | none |
| Expert (clinical) | `cancers.ts`, `spikes/*.ts` standard-of-care rows, `trials.ts` outcomes | Against current NCCN/ESMO guidance and the primary publication | `reviewedBy` in `src/data/reviews.ts`, track `expert` |
| Expert (scientific) | `targets.ts`, `pathways.ts`, `technologies.ts`, `payloads.ts`, `resistance.ts` | Mechanism, biology, and evidence tier are accurately stated | `expert` |
| Expert (regulatory) | `drugs.ts` approvals, `regulatoryEvents`, `calendar.ts` | Dates and indications match the label or agency notice | `expert` |
| Patient advocate | `tldr`, `simple`, `questions.ts`, `paths.ts` | Clear, non-alarming, accurate at the stated reading level | `advocate` |
| Organisation (self) | The organisation's own `companies.ts` / `institutions.ts` record | Facts only; no promotional language; COI declared | none (edit is attributed in `provenance`) |

## Process

1. Suggested edits arrive as issues (template `suggest-edit.yml`) or as pull requests.
2. The maintainer triages within a week, asks for a source if missing, and assigns a track.
3. For organisation self-edits: identity is verified by an email from the official domain or a message from an official account. The merged record's `provenance` names the organisation.
4. Reviewers record their sign-off in `src/data/reviews.ts` (name, role, track, date, note, optional conflicts of interest). The page shows the badge and the date.
5. Anything speculative (roadmap steps marked speculative, ideas) may carry a `confidence` estimate with a named author; reviewers do not "approve" speculation, they check it is labelled.

## Conflicts of interest

Every reviewer and every organisation contributor states employment, consulting, equity, and grants relevant to the record. The statement is displayed next to the badge. Undeclared conflicts discovered later lead to the review being removed and noted in `CORRECTIONS.md`.
