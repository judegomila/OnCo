import type { Metadata } from "next";
import Link from "next/link";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pageMeta } from "@/lib/seo";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { graph } from "@/lib/graph";
import { KIND_META, routeFor, type Kind } from "@/lib/schema";
import { reviewerRoster, translationCoverage } from "@/lib/review-queue";
import { reviewed } from "@/data/i18n/reviewed";
import { issueUrl, REPO } from "@/lib/issue-links";

export const metadata: Metadata = pageMeta({ title: "Contributors", description: "Everyone who has written or reviewed OnCo records: commits, records touched, kinds, first and last contribution, and review sign-offs, computed from the repository history.", path: "/contributors/" });

type Contributor = { name: string; commits: number; records: number; kinds: Record<string, number>; first: string; last: string; files: number };
type ContributorsFile = { generated: string; method: string; contributors: Contributor[] };
type Prov = Record<string, { commit: string; date: string; author: string; message: string; file: string }>;

/** Prefer the richer file written by scripts/provenance.ts; fall back to aggregating provenance.json. */
function readContributors(): { list: Contributor[]; generated?: string; method: string } {
  const pub = join(process.cwd(), "public");
  const full = join(pub, "contributors.json");
  if (existsSync(full)) {
    try { const f = JSON.parse(readFileSync(full, "utf8")) as ContributorsFile; return { list: f.contributors, generated: f.generated, method: f.method }; } catch { /* fall through */ }
  }
  const provPath = join(pub, "provenance.json");
  if (!existsSync(provPath)) return { list: [], method: "none" };
  const prov = JSON.parse(readFileSync(provPath, "utf8")) as Prov;
  const g = graph();
  const map = new Map<string, Contributor & { commitSet: Set<string>; fileSet: Set<string> }>();
  for (const [id, p] of Object.entries(prov)) {
    const c = map.get(p.author) ?? { name: p.author, commits: 0, records: 0, kinds: {}, first: p.date, last: p.date, files: 0, commitSet: new Set(), fileSet: new Set() };
    c.records++; c.commitSet.add(p.commit); c.fileSet.add(p.file);
    const k = g.get(id)?.kind ?? "other"; c.kinds[k] = (c.kinds[k] ?? 0) + 1;
    if (p.date < c.first) c.first = p.date; if (p.date > c.last) c.last = p.date;
    map.set(p.author, c);
  }
  return { list: [...map.values()].map((c) => ({ name: c.name, commits: c.commitSet.size, records: c.records, kinds: c.kinds, first: c.first, last: c.last, files: c.fileSet.size })).sort((a, b) => b.records - a.records), method: "last-commit-per-record" };
}

const KEY_LABEL = { data: "Data", review: "Review", translation: "Translation" } as const;

export default function ContributorsPage() {
  const { list, generated, method } = readContributors();
  const g = graph();
  const roster = reviewerRoster();
  const translators = new Map<string, { name: string; langs: Set<string>; n: number }>();
  for (const rs of Object.values(reviewed)) for (const r of rs) { const t = translators.get(r.reviewer.toLowerCase()) ?? { name: r.reviewer, langs: new Set<string>(), n: 0 }; t.langs.add(r.lang); t.n++; translators.set(r.reviewer.toLowerCase(), t); }
  const people = g.kind("person");
  const personFor = (name: string) => people.find((p) => p.name.toLowerCase() === name.toLowerCase());
  const keysFor = (name: string) => {
    const k: Array<keyof typeof KEY_LABEL> = [];
    if (list.some((c) => c.name === name && c.records > 0)) k.push("data");
    if (roster.some((r) => r.reviewer.toLowerCase() === name.toLowerCase())) k.push("review");
    if (translators.has(name.toLowerCase())) k.push("translation");
    return k;
  };
  const totalRecords = list.reduce((a, c) => a + c.records, 0);
  const langCov = translationCoverage();

  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Contributors"
        lede={`${list.length} ${list.length === 1 ? "person has" : "people have"} written the ${totalRecords.toLocaleString("en-GB")} records the repository history attributes, ${roster.length} ${roster.length === 1 ? "has" : "have"} signed off pages as reviewers, and ${translators.size} ${translators.size === 1 ? "has" : "have"} reviewed translations. Provenance credits editors record by record; this page thanks them in one place.`} />
      <Container className="pb-16">
        <div className="grid gap-3 sm:grid-cols-3 mb-8 max-w-3xl">
          <div className="card p-4"><div className="kicker mb-1">Data contributors</div><div className="text-2xl font-semibold tabular-nums">{list.length}</div></div>
          <div className="card p-4"><div className="kicker mb-1">Reviewers</div><div className="text-2xl font-semibold tabular-nums">{roster.length}</div><div className="text-xs text-muted"><Link className="underline" href="/reviewers/">roster</Link></div></div>
          <div className="card p-4"><div className="kicker mb-1">Translation reviewers</div><div className="text-2xl font-semibold tabular-nums">{translators.size}</div><div className="text-xs text-muted">{langCov.reduce((a, l) => a + l.reviewed, 0)} TL;DRs reviewed</div></div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Who wrote the records</h2>
          <p className="text-sm text-muted mb-4 max-w-3xl">
            {method === "blame-lines"
              ? "From git blame over every data file: a record counts for an author when any surviving line of it is theirs. Commits are distinct commits with surviving lines; first and last are the dates of those lines, so a contributor whose early lines were later rewritten shows a later first date."
              : "From the last commit that touched each record (public/provenance.json). Run npm run provenance to compute the fuller blame-based view."}
            {generated ? ` Generated ${generated.slice(0, 10)}.` : ""}
          </p>
          {list.length ? (
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted"><tr><th className="p-3">Contributor</th><th className="p-3">Keys</th><th className="p-3 text-right">Records</th><th className="p-3 text-right">Commits</th><th className="p-3">Kinds</th><th className="p-3">Active</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {list.map((c) => {
                    const person = personFor(c.name);
                    const kinds = Object.entries(c.kinds).sort((a, b) => b[1] - a[1]).slice(0, 6);
                    return (
                      <tr key={c.name} className="align-top">
                        <td className="p-3 font-medium">{person ? <Link className="underline" href={routeFor(person)}>{c.name}</Link> : c.name}</td>
                        <td className="p-3">{keysFor(c.name).map((k) => <span key={k} className="chip bg-foreground/5 mr-1">{KEY_LABEL[k]}</span>)}</td>
                        <td className="p-3 text-right tabular-nums">{c.records.toLocaleString("en-GB")}</td>
                        <td className="p-3 text-right tabular-nums">{c.commits.toLocaleString("en-GB")}</td>
                        <td className="p-3 text-xs text-muted">{kinds.map(([k, n]) => `${n.toLocaleString("en-GB")} ${(KIND_META as Record<string, { plural: string }>)[k as Kind]?.plural ?? k}`).join(", ")}</td>
                        <td className="p-3 text-xs text-muted whitespace-nowrap">{c.first === c.last ? c.first : `${c.first} to ${c.last}`}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card p-4 text-sm text-muted">No provenance file is present in this build. Run <code>npm run provenance</code> (needs the full git history) to generate it.</div>
          )}
        </section>

        {(roster.length > 0 || translators.size > 0) && (
          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight mb-2">Who reviewed</h2>
            <ul className="card divide-y divide-border text-sm">
              {roster.map((r) => <li key={`r-${r.reviewer}`} className="p-3 flex flex-wrap items-baseline gap-x-3"><span className="chip bg-foreground/5">Review</span><span className="font-medium">{r.reviewer}</span><span className="text-muted">{r.role}</span><span className="ml-auto text-xs text-muted">{r.count} page{r.count === 1 ? "" : "s"}, {r.level.label.toLowerCase()}</span></li>)}
              {[...translators.values()].map((t) => <li key={`t-${t.name}`} className="p-3 flex flex-wrap items-baseline gap-x-3"><span className="chip bg-foreground/5">Translation</span><span className="font-medium">{t.name}</span><span className="ml-auto text-xs text-muted">{t.n} TL;DR{t.n === 1 ? "" : "s"} in {[...t.langs].join(", ")}</span></li>)}
            </ul>
          </section>
        )}

        <section className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">How to be listed</h2>
          <p className="text-[15px] leading-relaxed">Every merged change is attributed by the repository history, so contributing is being listed. Start with an issue: <Link className="underline" href="/suggest/">Suggest an edit</Link> for a correction, <a className="underline" href={issueUrl("new-object", {}, { title: "add: " })} rel="noopener">New object</a> for something missing, <Link className="underline" href="/review/">Review this page</Link> to sign off a page, or <a className="underline" href={issueUrl("translation-review", {}, { title: "translation review: " })} rel="noopener">Translation review</a> for a language you speak. Contributors who can code say so in the issue and are pointed at the file; pull requests reference the triaged issue. If you would rather not be named, say so in the issue and the record&apos;s provenance names the organisation or &ldquo;a contributor&rdquo; instead.</p>
          <p className="text-sm text-muted mt-3">Keys: <strong>Data</strong> wrote or edited records; <strong>Review</strong> signed off pages on a review track; <strong>Translation</strong> reviewed translated TL;DRs. Names link to a person record where one exists. Source: <a className="underline" href={`${REPO}/blob/main/scripts/provenance.ts`} rel="noopener">scripts/provenance.ts</a>.</p>
        </section>
      </Container>
    </>
  );
}
