# What a page says twice

A survey of the furniture on OnCo pages: the labels, counters, headings and entry points that are on a page
without earning their place. Written 8 October 2026 after the owner asked for one, with the trial record
`/trials/quartz/` as the worked example because it is an ordinary page rather than a flagship.

The measurements are of the rendered page with the hydration payload stripped out, so they count what a reader
actually sees.

## The measurement

`/trials/quartz/` carries **11,940 characters of visible text** and **44 headings or kickers**: one label for
every 271 characters. Six of the 44 are the site navigation. The other 38 are the page labelling itself.

Fifteen of those 38 name the same seven kinds twice:

| In "Connected" | In the sidebar quick links |
|---|---|
| cancers, technologies, drugs, companies, institutions, terms, trials, key papers | Cancers, Technologies, **Products**, Companies, Institutions, Terms, Trials |

Every target in the sidebar is also in Connected: ten of ten on this page. The two lists disagree on casing and
on one word, so the same records are called "drugs" in one column and "Products" in the other. The sidebar list
is capped at eight per kind and then says "and N more →", which links to the full list a screen below.

## What this costs, and the fix

**1. The sidebar quick links repeat the Connected section.** This is the largest single piece of duplication on
every record page. A code comment already records the symptom from a different angle: "a roadmap with fourteen
eras carried 19 KB of duplicate sidebar links". The honest options are to drop the sidebar list, or to make it a
jump list of kind names with counts that scrolls to Connected rather than reprinting the names. The second keeps
the navigation value and removes the repetition. *Done 19 October 2026, approved by the owner as quality idea 7: the card is
now kind names with counts, each a link to Connected.*

**2. Kind labels are written twice in two registers.** Whichever list survives should use one vocabulary. The
corpus calls the kind `drug` and the route `/drugs/`; the sidebar calling it "Products" is a third name for the
same thing. *Done 19 October 2026: the sidebar now takes its kind names from the labels Connected uses.*

**3. A section label that counts to one.** The Sources block prints "isrctn.com · 1" and "Papers and guidelines,
by DOI · 1". A count beside a list of one is noise; below three it tells the reader nothing the list does not.
Print the count from four up. *Proposed.*

**4. Step counters over an ordered list.** The roadmap story printed "step 3 of 7" above each step, beside an
aside that already lists every step and marks the one in view. *Removed 8 October 2026.*

**5. Cards that render empty.** The sidebar's Wikipedia-and-tags card drew an empty box on every roadmap, which
has neither. *Fixed 8 October 2026: it renders only when it has contents.*

**6. Several doors to one room.** A record page carried four separate GitHub entry points: suggest an edit, "Out
of date?", "Report a readout" and "Review this page", plus the standing `/suggest/` and `/review/` pages. The
owner's rule is one: "i only want a single entry point to improve the page". *"Out of date?" removed 8 October
2026, and the card is now a single "Make correction" button with no heading over it.* Two kind-specific
reporting links remain, on trials and on products; folding them into the correction issue as a first question
("what are you telling us: a correction, a result, an approval?") would leave exactly one door. *Proposed.*

**7. A heading that repeats the thing under it.** "Follow this page" sat above a button that says "Watch", and
"Improve the information" above a paragraph explaining the review gate and then a button. Both are gone: a
button whose label is a verb does not need a heading, and the paragraph was the page explaining itself.
*Removed 8 October 2026.*

**8. Site-wide controls on a record.** "Follow by feed" linked the whole-site Atom feed from beside a
page-specific star. The feeds are listed at `/feeds/` and declared in the head of every page, which is where a
feed reader looks. *Removed 8 October 2026.*

## The pattern underneath

Three habits produce nearly all of it.

- **Labelling a thing that already says what it is.** A kicker over a button, a count over a list of one, a step
  number over an ordered list. The test: cover the label; is the page less clear? If not, it is furniture.
- **Showing the same records in two places on one screen.** Usually a sidebar summary plus a full section. One
  of them should be a link to the other.
- **Adding a door per use case.** Every new kind of contribution got its own link rather than a branch inside
  the existing one. Doors are cheap to add and the cost lands on every reader who only wanted one.

## Still to look at

- The tab strip and the page's own sections overlap on some kinds: Overview, Outcomes and Key papers are tabs,
  while Connected, Similar pages, Sources and the machine-readable list are sections. A reader has no way to
  know which of the seven landmarks is a tab and which is a scroll.
- Provenance now sits at the foot, which is right, but a page can still state up to four dates (`asOf`, last
  edited, review due, and a retrieval date inside a block). They answer different questions and should say
  which.
- The "and N more →" link exists because the sidebar list is capped. If the sidebar stops repeating Connected,
  the cap and the link go with it.
