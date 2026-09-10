# Wiring for batch H (Community)

Exact edits to shared files that batch H could not touch. Everything below is additive except the removals in section 4, which enforce the owner rule: **no direct "edit the record on GitHub" links anywhere; every correction and improvement goes through the suggest-an-edit issue gate.**

## 1. `src/lib/nav.ts`

Add to the `learn` group's `items` (after `/gaps/`):

```ts
      { href: "/review/", label: "Review queue", blurb: "Which pages most need a named reviewer, coverage by kind and track, translation coverage." },
      { href: "/reviewers/", label: "Reviewer roster", blurb: "Who has signed off pages, on which track, with declared conflicts of interest." },
      { href: "/contributors/", label: "Contributors", blurb: "Everyone who wrote or reviewed records, from the repository history." },
      { href: "/idea-votes/", label: "Idea votes", blurb: "Which ideas people want tested, and which have been picked up, with sources." },
      { href: "/teach/", label: "Teaching packs", blurb: "A slide deck and quiz per cancer and front; print to PDF." },
      { href: "/newsletter/", label: "Weekly issue", blurb: "What changed, regulatory events, upcoming readouts, what the journals said. No tracking." },
```

Change the GitHub item's blurb so it no longer invites direct edits:

```ts
      { href: "https://github.com/judegomila/OnCo", label: "GitHub", blurb: "Code and data. Propose changes through the issue forms." },
```

## 2. `package.json` scripts

```json
    "new": "tsx scripts/new-record.ts",
    "issue-forms": "tsx scripts/gen-issue-forms.ts",
    "issue-forms:check": "tsx scripts/gen-issue-forms.ts --check",
    "fetch:votes": "tsx scripts/fetch-votes.ts",
    "newsletter": "tsx scripts/newsletter.ts"
```

`.github/workflows/refresh-votes.yml` and `newsletter.yml` call the scripts with `npx tsx` so they work before this lands.

## 3. `src/components/EntityDetail.tsx`

`SuggestEdit` already renders `DiscussLink` inside its card, so item 75 needs no new import there. Two edits:

a) `SuggestEdit`'s `kind` prop is now typed `Kind` (it was `string`); the existing call `<SuggestEdit id={e.id} kind={e.kind} name={e.name} fields={Object.keys(e)} source={sourceLocation(e.id, e.kind)} />` already passes a `Kind`, so no change is needed unless the prop is widened elsewhere.

b) **Remove** the direct-edit link in the "Data" row of the sidebar (around line 146):

```tsx
                <span className="text-muted"> · </span>
                <a className="underline" href={`https://github.com/judegomila/OnCo/blob/main/src/data/${meta.plural === "products" ? "drugs" : meta.plural === "fronts" ? "sections" : meta.plural}.ts`} rel="noopener" title="Opens the TypeScript data file that holds this record on GitHub. Change it and open a pull request; every edit is reviewed and validated before it goes live.">Edit source on GitHub</a>
```

Replace with a read-only "View record" link if wanted (it is a blob URL, not an edit URL, so it is allowed; the exact line is available from `sourceLocation`):

```tsx
                <span className="text-muted"> · </span>
                <a className="underline" href={sourceLocation(e.id, e.kind).url} rel="noopener" title="Read-only view of this record's source line. To change it, use Suggest an edit below.">View record</a>
```

## 4. `src/lib/source-location.ts`

Drop the `editUrl` field (the only consumer was the removed button in `SuggestEdit`):

```ts
export type SourceLocation = { file: string; line: number; url: string };
...
  return { file, line, url: `${REPO}/blob/main/${file}#L${line}` };
```

and change the doc comment from "Used to build "Edit on GitHub" links" to "Used to point maintainers at the record's line in issue bodies". `src/lib/review-queue.test.ts` currently allow-lists this file in its "no editor links" scan; remove the allow-list entry once this lands.

## 5. `README.md` (line 48)

"Open a pull request. Suggested edits from the site arrive as GitHub issues using the templates in `.github/ISSUE_TEMPLATE/`." should read: "Open an issue first (the site's forms prefill it); pull requests that change data reference the triaged issue."

## 6. `.github/PULL_REQUEST_TEMPLATE.md` (owned by batch E)

Add a checklist line: `- [ ] This PR references a triaged issue (data changes are not accepted without one).`

## 7. Repository settings (not code)

- Create a Discussions category **Objects** (slug `objects`, format "Open-ended discussion"). `DiscussLink`, `.github/DISCUSSION_TEMPLATE/objects.yml`, `scripts/fetch-votes.ts` and `/idea-votes/` all assume this slug.
- Create labels used by the new forms: `stale`, `trial-readout`, `regional-approval`, `translation`, `review`, `accessibility`, `community`.
- `refresh-votes.yml` needs Actions permission `discussions: read` (declared in the workflow; check the repository's default token permissions allow it).

## 8. `/newsletter/` signup

`src/app/newsletter/page.tsx` has `const SIGNUP_ACTION = ""`. Set it to the Buttondown embed endpoint (`https://buttondown.com/api/emails/embed-subscribe/<username>`) or a Listmonk form URL once an account exists; until then the page offers the Atom feed and archive only. No tracking is added either way.

## 9. Sitemap

`src/lib/sitemap-urls.ts` discovers static routes from `src/app`, so `/review/`, `/reviewers/`, `/idea-votes/`, `/teach/`, `/contributors/` and `/newsletter/` are included automatically. `/teach/[id]/` pages come from `generateStaticParams`; add them to the sitemap by listing `[...g.kind("cancer"), ...g.kind("section")].map((e) => \`/teach/${e.id}/\`)` alongside the entity routes if wanted.

## 10. Data validation

Batch H added no new entity arrays to `src/data/index.ts`; `reviews.ts`, `i18n/reviewed.ts` and `adoptions.ts` are side data validated by `src/lib/review-queue.test.ts` (ids resolve in the graph, dates are ISO, sources are URLs).
