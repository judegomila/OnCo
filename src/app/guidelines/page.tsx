import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { guidelineMap, BODY_META } from "@/data/guideline-map";
import { guidelineVersions } from "@/data/guideline-versions";
import { concordanceSummary, guidelineCancerIds, validateGuidelines, versionsFor } from "@/lib/guidelines";
import { Container, GroupKicker, PageHeader, Section } from "@/components/ui";
import { GuidelineConcordance, type ConcordanceRow } from "@/components/GuidelineConcordance";
import { CancerIcon } from "@/components/CancerIcon";

export const metadata: Metadata = pageMeta({ title: "Guidelines", description: "Where NCCN, ESMO, NICE and ASCO agree and disagree on the same setting, and what changed between guideline versions for each cancer.", path: "/guidelines/" });

export default function GuidelinesPage() {
  validateGuidelines();
  const g = graph();
  const rows: ConcordanceRow[] = guidelineMap.map((e) => {
    const c = g.must(e.cancerId);
    return { ...e, cancerName: c.name, cancerRoute: routeFor(c), refs: e.refs.map((id) => { const x = g.must(id); return { id, name: x.name, route: routeFor(x) }; }) };
  });
  const summary = concordanceSummary();
  const cancers = guidelineCancerIds().map((id) => g.must(id)).sort((a, b) => a.name.localeCompare(b.name));
  const changeCount = guidelineVersions.reduce((n, v) => n + v.changes.length, 0);

  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Guidelines"
        lede={`${guidelineMap.length} clinically important settings compared across NCCN, ESMO, NICE and ASCO: ${summary.concordant} where every body agrees, ${summary.discordant} where at least one restricts or rejects what another prefers. Below, ${guidelineVersions.length} dated guideline versions across ${cancers.length} cancers list ${changeCount} changes: what was added, removed or moved.`} />
      <Container className="pb-16">
        <Section title="Concordance" id="concordance">
          <GuidelineConcordance rows={rows} />
          <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm">
            <div className="card p-4 space-y-1.5">
              <h3 className="font-semibold">Why bodies disagree</h3>
              <p className="text-muted">NCCN and ESMO judge efficacy and safety; NICE also judges cost-effectiveness for the NHS, so a drug can be category 1 in the US and unfunded in England. ESMO and NICE follow the EMA licence, which is sometimes narrower than the FDA label (PD-L1 thresholds are the usual example). ASCO issues rapid updates after pivotal trials and rarely restricts.</p>
            </div>
            <div className="card p-4 space-y-1.5">
              <h3 className="font-semibold">Bodies covered</h3>
              <ul className="text-muted space-y-1">{(["NCCN", "ESMO", "NICE", "ASCO"] as const).map((b) => <li key={b}><a href={BODY_META[b].url} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:underline">{BODY_META[b].label}</a> ({BODY_META[b].region}): {BODY_META[b].what.split(". ")[0]}.</li>)}</ul>
              <p className="text-xs text-muted">CSCO (China) and JSMO (Japan) slots exist in the data and are open for contributions.</p>
            </div>
          </div>
        </Section>

        <Section title="Version history by cancer" id="versions">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cancers.map((c) => {
              const vs = versionsFor(c.id);
              const n = vs.reduce((k, v) => k + v.changes.length, 0);
              const first = vs[0]?.date.slice(0, 4), last = vs[vs.length - 1]?.date.slice(0, 4);
              const rowsHere = guidelineMap.filter((e) => e.cancerId === c.id).length;
              return (
                <Link key={c.id} href={`/guidelines/${c.id}/`} className="card block p-4">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-6 w-6" /></span>
                    <div className="min-w-0">
                      <div className="font-semibold leading-snug text-balance">{c.name}</div>
                      <div className="text-xs text-muted mt-1 tabular-nums">{vs.length ? `${vs.length} versions, ${n} changes, ${first === last ? first : `${first}-${last}`}` : "No version history yet"}{rowsHere ? ` · ${rowsHere} concordance row${rowsHere === 1 ? "" : "s"}` : ""}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-muted max-w-3xl">Each version entry is anchored to a dated public event (approval, trial publication or guideline publication) and lists the rows added, removed or recategorised. NCCN version numbers are not reproduced unless verified; entries are dated to the month the change entered practice. The per-cancer page lets you pick two versions and see everything that changed between them.</p>
        </Section>
      </Container>
    </>
  );
}
