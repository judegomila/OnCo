# Distribution plan

How OnCo reaches the people it is for, channel by channel, with the asset each channel needs, the first action, the measure, and the steps only the owner can take. The site is live at https://onco.cc; the corpus ships as a static JSON API, Markdown context files, Atom feeds, an MCP server and a CLI. Everything below assumes that build and points at it.

Companion files: `docs/press-kit.md` (copy blocks, attribution, licence summary, pages that show the range), `docs/launch-copy.md` (Show HN, Product Hunt, LinkedIn, short lines), `docs/dataset-card.md` (Hugging Face card), `CITATION.cff` (how to cite), `.github/workflows/release-dataset.yml` (the release bundle), `public/llms.txt` and `public/llms-full.txt` (for language models), `public/api/v1/openapi.json` (the API description, generated at build time).

## Rules that apply to every channel

- Nothing OnCo publishes or posts is medical advice. Every outward message about a treatment or a cancer ends with, or links to, that line and to the primary sources on the page.
- No survival figures in posts, previews or images. They live behind a click on the site and stay there.
- No invented or rounded-up numbers. Counts come from https://onco.cc/api/v1/meta.json at the time of posting (`curl -s https://onco.cc/api/v1/meta.json | jq .total,.counts`). "More than 6,000 records in 18 kinds" is the safe floor for copy that will not be refreshed.
- Say what the site is: a cited, linked reference that is being built in the open and may be incomplete or wrong. Never "the most complete", never "trusted by", never a claim about outcomes.
- Every post links a page that answers the question the reader had, not the home page.
- Attribution line for anyone reusing the data: "Data from OnCo (onco.cc)". Licence line: "Free for individual and educational use with attribution (CC BY-NC 4.0); commercial use must contact us to pay for the data."
- Plain English, UK spelling, no em-dashes, no "as of".
- Post as the owner, under the owner's name. Agents draft; the owner sends. Nothing in this plan posts anywhere on its own.

## By audience

| Audience | What they come for | Pages that hook | Asset | First action | Measure |
|---|---|---|---|---|---|
| Patients and carers | Plain words for a diagnosis, what the options are, what a trial result means, what treatment costs and who pays | /live/, /explained/, /journeys/, /for-me/, /terms/, /coverage/us/, /coverage/uk/, /staging/, /paths/ | Ten organisation approaches (below), forum wording, teaching packs at /teach/ | Send the first two organisation notes | Referrals from organisation domains in Search Console and Vercel analytics; pages per visit on /live/ |
| Clinicians | Standard of care by line and biomarker, toxicity and irAE handling, regimens, calculators, guidelines side by side | /sequencing/, /irae/, /regimens/, /calculators/, /interactions/, /guidelines/, /tumor-board/, /biomarker-matrix/, /assays/ | Monthly "what changed" digest, the Atom feeds, the irAE guide printable | Post the digest in one member forum; pin the irAE guide | Newsletter subscribers; returning visitors on clinical tools |
| Scientists | Targets, pathways, resistance, preclinical models, open questions, key papers, preprints | /dossiers/, /resistance/, /resistance/gaps/, /open-questions/, /preclinical-models/, /key-papers/, /preprints/, /pathway-drugs/ | Zenodo DOI, Hugging Face and Kaggle datasets, CITATION.cff, the RDF triples | Link the repository to Zenodo and tag a release | DOI citations; dataset downloads; GitHub stars and forks |
| Investors and builders | Who is building what, deals, exclusivity expiry, catalysts, pipeline crowding, addressable population; a clean API and MCP server | /startups/, /investors/, /deals/, /exclusivity/, /catalysts/, /pipeline/, /market/, /build/, /api/ | LinkedIn post, Show HN, Product Hunt, npm packages, MCP registry entry, OpenAPI description | Publish `onco` and `onco-mcp` to npm; post Show HN | npm downloads; MCP registry installs; API calls in Vercel logs |
| Journalists | A fact they can check in one click: approvals by region, HTA verdicts, deals, failures, corrections | /regulatory/, /regulatory/regions/, /hta/, /deals/, /failures/, /corrections/, /completeness/ | Press kit, counts from meta.json, the corrections log as a trust signal | Send the press kit to five reporters who cover oncology data | Mentions and links; referrals from news domains |
| Policy | Coverage and cost, bottlenecks and the ideas that address them, access by country, isotope supply | /costs/, /coverage/rankings/, /bottlenecks/, /countries/, /isotopes/, /survival/, /report/ | The annual report page, the bottlenecks pages, one-page summaries printed from /report/ | Send /bottlenecks/ and /costs/ to two policy researchers for comment | Inbound issues and suggestions; citations in reports |

## By channel

Each channel: asset, first action, measure, owner-only step. Owner-only steps need an account, a token, a payment or the owner's name; nobody else should take them.

### 1. Search

What exists: `/sitemap.xml` (every page, with `lastModified` from each record's `asOf`), `/robots.txt` (everything crawlable except the raw JSON under `/api/v1/`, with the Markdown context files allowed), an explicit title, description, Open Graph and Twitter image on every page, and JSON-LD: `WebSite` with a `SearchAction` on the home page, `Drug`, `MedicalCondition`, `MedicalTrial`, `Organization` and `Thing` on entity pages, `BreadcrumbList` on pages with a trail. The IndexNow key file is live in `public/` (the file named after the key) and every deploy can ping `api.indexnow.org` with the changed URLs.

- Asset: the sitemap, robots, structured data and IndexNow key above; a query list per kind (below).
- First action: verify the property in Google Search Console and submit `https://onco.cc/sitemap.xml`. Then import the same property into Bing Webmaster Tools (it offers a one-click import from Search Console), which also confirms IndexNow submissions.
- Measure: Search Console clicks and impressions per page group (set up URL filters for `/cancers/`, `/drugs/`, `/live/`, `/coverage/`); IndexNow acceptance (a 200 or 202 from `api.indexnow.org` per ping; a 4xx means the key file or host is wrong); coverage report errors.
- Owner-only: Search Console verification (DNS TXT record on onco.cc, or the HTML-file method: drop the file Google gives you into `public/` and deploy); Bing Webmaster import; confirm `www.onco.cc` is attached in Vercel so the redirect applies.

Ping IndexNow by hand after a large deploy (replace the key with the file name in `public/`):

```sh
curl -s -o /dev/null -w "%{http_code}\n" \
  "https://api.indexnow.org/indexnow?url=https://onco.cc/&key=<key-file-name-without-.txt>"
```

Structured data to add next (small, high value): a `Dataset` node on `/api/` and `/data-sources/` (name, description, licence URL, `distribution` entries for `all.json`, `all.ndjson` and the CSV files, `creator` OnCo, `isAccessibleForFree: true`) so the corpus appears in Google Dataset Search; `FAQPage` on `/live/` subpages that already use question headings; `ItemList` on kind indexes.

Target queries by kind, the phrasing readers use, to check in Search Console and to make sure the page title and first paragraph answer them:

| Kind | Queries to watch |
|---|---|
| Cancers | "<cancer> standard of care", "<cancer> new treatments 2026", "<cancer> stage 3 treatment options", "<cancer> trials recruiting" |
| Treatments and tests | "<drug> side effects", "<drug> approved for", "<drug> vs <drug>", "<brand> mechanism of action", "<drug> NICE decision" |
| Targets | "<target> inhibitors list", "<target> expression <cancer>", "<target> ADC" |
| Technologies and fronts | "what is an antibody drug conjugate", "radioligand therapy explained", "how CAR-T works", "circulating tumour DNA test" |
| Trials | "<trial name> results", "<trial name> hazard ratio", "<NCT id>" |
| Companies and startups | "<company> oncology pipeline", "oncology startups 2026", "Y Combinator cancer companies" |
| Institutions | "best cancer hospital <country>", "NCI designated cancer centres list" |
| Terms | "<term> meaning cancer", "what does <term> mean oncology" |
| Living with cancer | "scalp cooling chemotherapy", "chemotherapy hair loss when does it grow back", "second opinion cancer how to get one", "who pays for cancer drugs UK" |
| Coverage and cost | "Medicare Part B cancer drugs", "cancer drugs fund list", "<drug> list price", "prior authorisation oncology" |
| Investors | "oncology deals 2026", "<drug> patent expiry", "<drug> biosimilar launch date", "PDUFA dates oncology" |

### 2. AI assistants

What exists: `/llms.txt` (what the site is, the licence, the best entry points, every section), `/llms-full.txt` (every record on one line with its TL;DR and the URL of its Markdown context file, regenerated each build), `/api/v1/context/<id>.md` (one clean Markdown document per record, allowed in robots.txt), `/api/v1/openapi.json` (OpenAPI 3.1, generated from the same layout that writes the files), the `onco-mcp` package (`packages/onco-mcp`, tools `search`, `get_entity`, `list_kind`, `ask`, `context`, `compare`) with a registry manifest at `packages/onco-mcp/server.json`, and the `onco` CLI (`packages/onco-cli`).

- Asset: the files above; the description block in `docs/press-kit.md` for directory forms.
- First action: publish both packages to npm (below), then publish the MCP server to the official registry, then submit it to the Claude and Cursor directories.
- Measure: npm weekly downloads for `onco` and `onco-mcp`; requests to `/api/v1/context/`, `/llms.txt` and `/api/v1/search.json` in Vercel logs (assistants fetch these); registry page views.
- Owner-only: every publish step below.

npm publish (from the repository root, after `npm ci`; the `prepublishOnly` step builds the bundle):

```sh
npm run cli:build && (cd packages/onco-cli && npm publish)
npm run mcp:build && (cd packages/onco-mcp && npm publish)
```

Before publishing: the repository root `mcp/package.json` is also named `onco-mcp` (version 0.3.0). Only one package can own that name on npm. Rename the root one (for example `onco-mcp-repo`) or mark it `"private": true`; `packages/onco-mcp` is the zero-install one that the docs point at.

MCP registry (registry.modelcontextprotocol.io): install `mcp-publisher`, run `mcp-publisher login github` as the owner of the `judegomila` account, then `mcp-publisher publish` from `packages/onco-mcp`. The manifest `server.json` names the server `io.github.judegomila/onco-mcp` and the npm package carries the matching `mcpName` field, which the registry checks. If the schema URL in `server.json` has moved on, `mcp-publisher` says so; update the `$schema` line and re-run.

Directories: Anthropic's connector directory for Claude and Cursor's MCP directory both take a submission form with name, one-line description, install command and repository. Use the short description and the install line `npx -y onco-mcp` from the press kit. Community lists worth one pull request each: `punkpeye/awesome-mcp-servers`, Smithery, Glama and mcp.so (they index the npm package once it exists).

Other assistants: the OpenAPI description at `/api/v1/openapi.json` imports into a custom GPT action, into Postman and into SDK generators unchanged; the `/llms.txt` file is what Perplexity, Anthropic and OpenAI crawlers look for first. Nothing else to do for those beyond publishing.

### 3. Developer and data communities

- Asset: `docs/launch-copy.md` (Show HN post, Product Hunt tagline and description, three short lines); the release bundle (`release-dataset.yml`); `CITATION.cff`; `docs/dataset-card.md`.
- First action: Hacker News on a weekday morning US time, Tuesday to Thursday, with the owner online for the first three hours to answer. Product Hunt a week later, not the same day.
- Measure: GitHub stars and forks per day; referrals from news.ycombinator.com and producthunt.com; issues opened; API calls the day after.
- Owner-only: posting under the owner's accounts; linking Zenodo; creating the Hugging Face and Kaggle datasets under the owner's name.

Hacker News: title "Show HN: OnCo, a cited, open knowledge graph of oncology with a JSON API and MCP server" (the copy file has the body). Rules of the room: no marketing language, answer every technical question with a link to the code or the page, say what is wrong or missing before someone else does (the `/completeness/`, `/gaps/` and `/corrections/` pages are the answer to "how do you know it is right"). Do not ask anyone to upvote.

Product Hunt: one maker, the owner. Gallery images are screenshots of `/explore/`, a drug page with the molecule, `/biomarker-matrix/`, `/startups/` and `/build/`. First comment explains the licence and the not-medical-advice rule plainly.

Zenodo DOI: the owner signs in to Zenodo with GitHub, opens https://zenodo.org/account/settings/github/, flips the switch for `judegomila/OnCo`, then tags a release (`git tag v0.5.0 && git push origin v0.5.0`). `release-dataset.yml` validates, tests, builds the API bundle and attaches it to the GitHub release: the JSON tree with context files (tar.gz), CSV per kind with schema and OpenAPI (zip), `all.json`, `all.ndjson`, `schema.json`, `openapi.json`, `meta.json`, `llms.txt`, `llms-full.txt`, `CITATION.cff`, `LICENSE-DATA` and `SHA256SUMS`. Zenodo picks the release up on its own once the repository is linked, reads `.zenodo.json` for the metadata and issues a DOI for the version and a concept DOI for all versions. If a `ZENODO_TOKEN` secret is set, the workflow deposits directly instead. After the first DOI: add it to `CITATION.cff` under `identifiers` and `preferred-citation`, to the README "Cite and reuse" section and to `/about/`.

Hugging Face: create the dataset `judegomila/onco` (or under an `onco` organisation), paste `docs/dataset-card.md` as the README, upload `all.ndjson`, the CSV files and `schema.json` from the release. Choose licence `cc-by-nc-4.0`. Hugging Face's viewer reads the NDJSON directly. Update on each tagged release.

Kaggle: new dataset from the CSV zip of the release; licence CC BY-NC 4.0 if offered, otherwise "Other (specified in description)" with the licence summary from the press kit pasted in; description from the dataset card. Kaggle readers want a starter notebook: one that loads `drugs.csv` and `trials.csv` and plots approvals per year from `regulatory` fields is enough.

Also worth one post each, after HN: r/datasets (dataset with licence and schema link), r/bioinformatics (the RDF triples and OpenAlex links), the Data Is Plural newsletter (submit through its form), and a pull request to `awesome-public-datasets` under Healthcare.

### 4. Patient organisations and forums

Ten organisations to approach, each with the pages most useful to its members. Write to the digital or information team, not the press office. One short message, one page, one offer: "free to link, free to embed, tell us what is wrong."

| Organisation | Pages to offer | Why |
|---|---|---|
| Macmillan Cancer Support (UK) | /live/, /coverage/uk/, /terms/ | Living with cancer and who pays in the NHS, in plain words; Macmillan is already a source in the corpus |
| Cancer Research UK, patient information | /explained/, /terms/, /teach/ | Trial results as people out of 100, a glossary with Wikipedia links, teaching packs |
| Breast Cancer Now (UK) | /cancers/ (breast subtypes), /biomarker-matrix/, /live/hair/ | HER2-low, TNBC and hormone-receptor pages; scalp cooling and regrowth |
| Prostate Cancer UK | /cancers/ (prostate), /isotopes/, /journeys/ | Radioligand therapy explained, the isotope supply picture, the twelve-month journey |
| Bowel Cancer UK | /cancers/ (colorectal), /sequencing/, /staging/ | Lines of therapy by biomarker, staging explained |
| Blood Cancer UK | /cancers/ (lymphoma, myeloma, leukaemia), /staging/ (Lugano, R-ISS, IPI), /regimens/ | Scores and regimens in one place |
| American Cancer Society, Cancer Survivors Network | /live/, /coverage/us/, /assistance/ | Side effects, Medicare Part B or D, assistance programmes |
| Cancer Support Community (US) | /live/, /for-me/, /paths/ | Preparing for appointments, second opinions, reading paths |
| Triple Negative Breast Cancer Foundation | /cancers/tnbc/, /trials/, /explained/ | TNBC is one of the deepest pages; trial results explained |
| Pancreatic Cancer Action Network (PanCAN) | /cancers/ (pancreatic), /trials/, /preprints/ | Trials recruiting now, what is in preprint |

Alex's Lemonade Stand Foundation, St Baldrick's, the Melanoma Research Alliance, the Prostate Cancer Foundation and the Breast Cancer Research Foundation already appear in the corpus as funders; a note to each saying "you are on the map, please check your record" is the easiest first contact of all, and the /suggest/ page lets organisations edit their own records.

Wording that respects the not-medical-advice rule (use as is):

> OnCo is a free reference that explains cancer treatments, tests and trials in plain English, with every fact dated and linked to its source. It is not medical advice and it does not replace a conversation with a clinical team; it is meant to help people understand the words they hear and prepare the questions they want to ask. Pages your members may find useful: [page], [page]. Everything is free to link and to reuse for non-commercial purposes with attribution. If anything on a page is wrong or out of date, the "Suggest an edit" link on that page reaches us directly.

Forum norms:

- Reddit. Most cancer subreddits (r/cancer, r/breastcancer, r/lymphoma, r/coloncancer, r/pancreaticcancer, r/prostatecancer) forbid promotion and fundraising. Do not post about OnCo there. Join as a member, answer questions in your own words, and link an OnCo page only when someone asks for exactly what that page holds (a glossary term, a trial explained, a coverage question), with the not-medical-advice line. r/oncology and r/medicine are for clinicians and also restrict self-promotion; the moderators of r/medicine will remove a launch post, so ask them first or skip it. r/datasets, r/bioinformatics, r/opensource and r/programming welcome a dataset or tool post with the licence stated.
- Facebook groups. Almost all cancer groups are private and admin-approved. Message the admins before posting, offer the page, and accept a no. Never message members directly. Never post survival numbers. If admins allow it, one post, then answer comments; do not re-post.
- Patient forums run by charities (Macmillan Online Community, Cancer Research UK's Cancer Chat, Inspire, Smart Patients). The charity decides; that is the organisation approach above, not a forum post.
- Mumsnet, Reddit and Facebook all rank in search; the value of being a helpful member there is the link people copy later, not the post itself.

### 5. Clinical and scientific

- Asset: the four Atom feeds (`/feeds/changelog.xml`, `/feeds/regulatory.xml`, `/feeds/calendar.xml`, `/feeds/pulse.xml`), the weekly issue and its feed (`/newsletter/feed.xml`), the printable irAE guide, the congress digests, and a monthly "what changed" digest (below).
- First action: post the digest as a discussion in ASCO Connection (member forum) with the regulatory feed link; post the same in ESMO's OncologyPRO member area and AACR's member community if the owner is a member, otherwise skip those two. Pin the irAE guide and the calculators to the owner's Bluesky and X profiles.
- Measure: newsletter subscribers (Buttondown dashboard once connected); feed fetches in Vercel logs; returning visitors to `/irae/`, `/sequencing/`, `/regimens/`.
- Owner-only: society logins; connecting the newsletter form.

The newsletter form on `/newsletter/` posts nowhere until `SIGNUP_ACTION` in `src/app/newsletter/page.tsx` is set to a Buttondown (`https://buttondown.com/api/emails/embed-subscribe/<username>`) or Listmonk endpoint. Until then the page offers the feed and the archive only, and "subscribers" cannot be counted. Buttondown's free tier and its RSS-to-email feature can send the weekly issue from `/newsletter/feed.xml` with no further code.

Monthly "what changed" digest, built from pages that already exist, sent on the first working day of the month:

1. Regulatory: new approvals, CRLs and label changes from `/regulatory/` (the feed lists them with dates).
2. Standard of care: which `/sequencing/` rows changed, from `/history/`.
3. Trials: readouts that landed and readouts due next month from `/calendar/`.
4. Corrections: anything on `/corrections/` this month, stated plainly. This is the section clinicians trust most.
5. New pages and kinds from `/changelog/`.
6. One open question from `/open-questions/` with a request for a reviewer.

Oncology on X and Bluesky: use the disease-community hashtags (#bcsm breast, #lcsm lung, #crcsm colorectal, #gyncsm gynaecological, #btsm brain, #mmsm myeloma, #lymsm lymphoma, #pcsm prostate) and the congress tags in the week of each meeting (the `/digests/` pages already summarise ASCO, ESMO, AACR and ASCO GU). On Bluesky, ask the moderators of the oncology and MedSky starter packs and feeds to include the account. Post one page a day at most: a specific page, one sentence on what it shows, the not-medical-advice line where it concerns a treatment. Reply to clinicians who post about a drug or trial with the OnCo page for it only when it adds something (the forest plot, the toxicity comparison, the regional approvals grid).

Named reviewers: the `/review/` queue and `/reviewers/` roster exist but are empty. Every clinical or scientific contact who says something kind should be asked to review one page on their track and be named for it. That is the single strongest signal for clinicians and for search.

### 6. Investors and builders

- Asset: `/startups/`, `/investors/`, `/deals/`, `/exclusivity/`, `/catalysts/` (with its iCalendar feed), `/pipeline/`, `/market/`; the LinkedIn post and short lines in `docs/launch-copy.md`; the API, CLI and MCP for builders.
- First action: the LinkedIn post from the owner's account, pointing at `/startups/` and `/exclusivity/`, the day after Show HN. Then a note to the Y Combinator community (the corpus lists the YC companies attacking cancer, drawn from the open YC directory and checked one by one) if the owner has access; otherwise to the founders of the listed companies asking them to check their records.
- Measure: visits to `/startups/`, `/deals/` and `/exclusivity/`; `/catalysts/feed.ics` subscriptions in the logs; issues from companies correcting their records; API keys are not a thing here, so count calls to `/api/v1/companies.json` and `/api/v1/drugs.json`.
- Owner-only: LinkedIn and X posts; any conversation about a commercial licence, which is the revenue path for this audience (the footer and `/about/#licence` say commercial use must pay).

The hook for this audience is that the same page answers "what is this drug" for a patient and "when does it lose exclusivity and who owns the biosimilar" for an analyst, with the source for each. The `/build/` page has three pasteable recipes (trial matcher, dashboard, chatbot over MCP) that make the API real in ten minutes.

### 7. Press

- Asset: `docs/press-kit.md`: short, medium and long descriptions, the attribution line, the licence summary, counts computed from `meta.json`, the pages that show the range, the not-medical-advice line, the image files, and a contact.
- First action: send the kit to five reporters who cover oncology data and open science (STAT News, Endpoints News, Fierce Biotech, The Cancer Letter, Nature's news desk are the obvious homes), each with one page that matches their beat (deals, regulatory, coverage and cost, research output by country, the corrections log).
- Measure: mentions and inbound links (Search Console "Links" report); referrals from news domains.
- Owner-only: a contact email in the kit (there is none in the repository; the kit says so and points at GitHub issues and `/about/` until the owner adds one); interviews.

Angles that the site supports: every fact dated and linked; a public corrections log; completeness measured against named external lists; the same corpus for patients, clinicians and investors; free for individuals and education with a paid route for companies; open code. Angles to avoid: anything about accuracy rates, anything about how the site was built that the owner does not want on record, any comparison with named competitors.

### 8. Partnerships and acknowledgements

- Open Medical Registry: cross-linking exists both ways (`/open-tools/` lists its viewers, planners, pipelines and hardware by front; the registry links OnCo). First action: a joint post on both sites' changelogs when the next batch of tools lands. Measure: referrals between the two domains.
- OpenAlex: OnCo uses OpenAlex for institution and country research output (`/universities/`, `/countries/`) and for people's papers. First action: write to the OpenAlex team (they keep a list of projects that use the API and share them in their newsletter) with the `/universities/` page and the acknowledgement on `/data-sources/`. Owner-only: the email.
- ClinicalTrials.gov: OnCo reads the v2 API for trial counts and statuses. Acknowledge it on `/data-sources/` (done) and in the press kit (done); there is no partnership programme, but the NLM does list downstream tools in its documentation on request.
- NCI: the NCI cancer type list and the NCI A to Z drug list are OnCo's completeness denominators, and `/institutions/` marks NCI-designated centres. First action: a note to the NCI Office of Communications pointing at `/completeness/`, asking whether the denominators are read correctly and whether OnCo may be listed among third-party resources. Owner-only: the note.
- Wikidata: OnCo already links records to Wikidata items (`owl:sameAs` in the triples). The next step is a Wikidata property proposal for an "OnCo ID" so that Wikidata, and everything that reads it, links back. Community approval takes weeks; start it in month two.
- Acknowledge every upstream source by name on `/data-sources/`, in `docs/DATA-SOURCES.md`, in the dataset card and in the press kit. PubChem, RCSB PDB, Wikimedia Commons and Wikidata, OpenAlex, GLOBOCAN (IARC), ClinicalTrials.gov, Europe PMC, openFDA and the publishers and institutions linked on each page.

## 30-day calendar

Days are working days from the day the owner starts. Owner-only steps are marked (O). Everything else is drafted or built already.

| Day | Do | Channel |
|---|---|---|
| 1 | (O) Verify Search Console (DNS TXT), submit the sitemap, import into Bing Webmaster. (O) Confirm www redirect in Vercel. | Search |
| 1 | (O) Resolve the `onco-mcp` name clash, bump versions, `npm publish` both packages. Smoke test `npx -y onco-mcp` and `npx onco kinds` from a clean directory. | AI assistants |
| 2 | (O) Link the repository on Zenodo. Move the Unreleased notes in CHANGELOG.md under 0.5.0, bump `package.json` and `CITATION.cff`, tag `v0.5.0`, push the tag. Check the GitHub release assets and the Zenodo record. Add the DOI to `CITATION.cff` and the README. | Data communities |
| 2 | (O) `mcp-publisher publish` from `packages/onco-mcp`. Submit to the Claude and Cursor directories with the press-kit description. | AI assistants |
| 3 | Check `/llms.txt`, `/llms-full.txt`, `/api/v1/openapi.json` and `/sitemap.xml` on the live site after the deploy. Fix anything that 404s. | Search, AI |
| 3 | (O) Set `SIGNUP_ACTION` to a Buttondown endpoint; connect RSS-to-email from `/newsletter/feed.xml`. | Clinical |
| 4 | (O) Create the Hugging Face dataset from the release files with `docs/dataset-card.md`. Create the Kaggle dataset from the CSV zip. | Data communities |
| 5 | Read `docs/launch-copy.md` once more against the live site; update counts from `meta.json`. Prepare five screenshots for Product Hunt. | All |
| 6 | (O) Show HN, 08:00 to 10:00 US Eastern, Tuesday to Thursday. Stay on the thread for three hours. Open issues for every real bug raised. | Developers |
| 7 | (O) LinkedIn post (investors and builders). Short lines on X and Bluesky. | Investors |
| 8 | (O) Send the press kit to five reporters, each with one matching page. | Press |
| 9 | (O) Send the first two organisation notes (Macmillan, Cancer Research UK). Send the "you are on the map" notes to the five funders already in the corpus. | Patient organisations |
| 10 | Review Search Console coverage: fix crawl errors, check that entity pages are indexed and that `/api/v1/` is excluded as intended. | Search |
| 11 | (O) Post in r/datasets and r/bioinformatics; submit to Data Is Plural; open the `awesome-public-datasets` and `awesome-mcp-servers` pull requests. | Data communities |
| 12 | (O) Send three more organisation notes (Breast Cancer Now, Prostate Cancer UK, Blood Cancer UK). | Patient organisations |
| 13 | (O) Product Hunt launch. First comment: licence and not-medical-advice rule. | Developers |
| 14 | Add the `Dataset` JSON-LD node to `/api/` and `/data-sources/`; check it in Google's Rich Results test after deploy. | Search |
| 15 | (O) ASCO Connection discussion with the regulatory feed and the irAE guide. OncologyPRO and AACR if a member. | Clinical |
| 16 | (O) Write to OpenAlex and to the NCI Office of Communications. | Partnerships |
| 17 | (O) Send the last five organisation notes (Bowel Cancer UK, ACS Survivors Network, Cancer Support Community, TNBC Foundation, PanCAN). | Patient organisations |
| 18 | Ask the first three people who gave useful feedback to review one page each and be named on `/reviewers/`. | Clinical, scientific |
| 19 | Check npm downloads, registry listing, MCP directory status; answer any directory review questions. | AI assistants |
| 20 | Draft the first monthly digest from `/regulatory/`, `/history/`, `/calendar/`, `/corrections/`, `/changelog/`, `/open-questions/`. | Clinical |
| 21 | (O) Send the digest by email and post it in the forums that allowed it. | Clinical |
| 22 | Metrics review (below). Decide which two channels get the next month's effort. | All |
| 23 | Start the Wikidata property proposal draft. | Partnerships |
| 24 | Answer every open issue and suggestion from launch week; publish the corrections on `/corrections/`. | Trust |
| 25 | (O) One post a day on X and Bluesky for the remaining days: one page each, disease hashtags, no survival figures. | Clinical, patients |
| 26 | Second Search Console review: which target queries appear, which pages need a better title or first paragraph. | Search |
| 27 | Joint changelog post with the Open Medical Registry when their next batch lands. | Partnerships |
| 28 | Tag `v0.5.1` if corrections warrant it; Zenodo versions it automatically. Update Hugging Face and Kaggle. | Data communities |
| 29 | Write the next 30-day plan from the metrics. | All |
| 30 | Publish the month's numbers on `/status/` or in the changelog: pages indexed, subscribers, downloads, stars, corrections made. | Trust |

## Metrics to watch

| Metric | Where | What good looks like in month one | What it tells you |
|---|---|---|---|
| Search Console clicks and impressions | Search Console, filtered by page group | Impressions rising every week after verification; first clicks on treatment and living-with-cancer pages within two weeks | Whether the pages match the queries people type; which kinds to deepen |
| Pages indexed | Search Console coverage report | Entity pages indexed, `/api/v1/` excluded, no soft 404s | Crawl health |
| IndexNow acceptance | Response codes from `api.indexnow.org`; Bing Webmaster IndexNow report | 200 or 202 on every ping; URLs appearing in Bing within a day | Whether the key file and host are right |
| API calls | Vercel analytics or logs: requests to `/api/v1/*`, split by `all.json`, per-kind files, `entities/`, `context/`, `openapi.json` | Steady daily calls to per-kind files and `context/`; a spike the day after Show HN | Who is building on the corpus, and whether assistants are reading it |
| MCP and CLI use | npm weekly downloads for `onco` and `onco-mcp`; MCP registry page; requests to `/api/v1/ask-index.json` and `/api/v1/search.json` (the packages fetch these) | Downloads in the tens per week after the directories list the server | Whether the assistant channel is working |
| GitHub stars, forks, issues | Repository insights | Stars from HN day; issues that are real corrections | Developer interest and trust |
| Newsletter subscribers | Buttondown dashboard | First hundred from the digest and the clinical forums | Whether clinicians want the monthly digest |
| Dataset downloads and DOI views | Zenodo record stats; Hugging Face and Kaggle dataset pages | Downloads after the r/datasets and Data Is Plural posts | Scientific reuse |
| Referrals | Vercel analytics by referrer | Organisation domains, news domains, producthunt.com, news.ycombinator.com | Which outreach landed |
| Corrections received and made | `/corrections/`, GitHub issues with the correction label | Every launch-week report answered within a day | The trust loop that every other channel depends on |

Read the numbers together. Clicks without API calls means the site is landing but builders are not; API calls without clicks means assistants and scripts are reading the corpus and the pages need better titles. Subscribers and named reviewers are the two numbers that compound; the rest are launch spikes.

## What this plan does not do

It does not buy advertising, hire an agency, run a referral scheme or add tracking to the site. It does not post anything automatically. It does not promise accuracy the corpus cannot show; every channel points readers at `/completeness/`, `/corrections/` and the primary sources, because that is what makes the next month's distribution possible.
