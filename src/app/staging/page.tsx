import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor, type Cancer } from "@/lib/schema";
import { withTermHovers } from "@/lib/term-hover";
import { riskScores, stagingSystems, type StageGroup } from "@/data/staging";
import { Container, GroupKicker, PageHeader, Section } from "@/components/ui";
import { RiskScore, type GroupLink } from "@/components/RiskScore";
import { CancerIcon } from "@/components/CancerIcon";
import { Tip } from "@/components/Tip";

export const metadata: Metadata = pageMeta({ title: "Staging and risk scores", description: "Stage groupings (TNM 8, FIGO, Lugano, BCLC, R-ISS, NCCN prostate risk) and interactive prognostic scores (IPI, FLIPI, IMDC, CLL-IPI, MIPI, R-ISS, Child-Pugh, Khorana) per cancer, sourced and linked to the matching standard of care.", path: "/staging/" });

function validate(): void {
  const g = graph();
  const errors: string[] = [];
  for (const s of stagingSystems) {
    for (const id of s.cancerIds) if (g.get(id)?.kind !== "cancer") errors.push(`${s.id}: "${id}" is not a cancer`);
    for (const id of s.terms ?? []) if (g.get(id)?.kind !== "term") errors.push(`${s.id}: "${id}" is not a term`);
  }
  for (const r of riskScores) {
    for (const id of r.cancerIds) if (g.get(id)?.kind !== "cancer") errors.push(`${r.id}: "${id}" is not a cancer`);
    for (const id of r.terms ?? []) if (g.get(id)?.kind !== "term") errors.push(`${r.id}: "${id}" is not a term`);
    const sorted = r.groups.slice().sort((a, b) => a.min - b.min);
    for (let i = 1; i < sorted.length; i++) if (sorted[i].min !== sorted[i - 1].max + 1) errors.push(`${r.id}: group ranges are not contiguous (${sorted[i - 1].label} → ${sorted[i].label})`);
  }
  if (errors.length) throw new Error(`Invalid staging data:\n${errors.join("\n")}`);
}

/** Standard-of-care settings on the cancer page whose text contains any of the fragments. */
function socLinks(c: Cancer, match?: string[]): GroupLink[] {
  if (!match?.length) return [];
  const seen = new Set<string>();
  return c.standardOfCare.filter((s) => { const t = s.setting.toLowerCase(); return match.some((m) => t.includes(m)); }).filter((s) => !seen.has(s.setting) && seen.add(s.setting)).slice(0, 3).map((s) => ({ label: s.setting, href: `${routeFor(c)}#care` }));
}

function StageTable({ groups, cancer }: { groups: StageGroup[]; cancer: Cancer }) {
  return (
    <div className="card overflow-x-auto">
      <table className="onco">
        <thead><tr><th className="min-w-[140px]">Stage</th><th>Definition</th><th className="hidden md:table-cell min-w-[200px]">Standard of care on the cancer page</th></tr></thead>
        <tbody>
          {groups.map((g) => {
            const links = socLinks(cancer, g.settingMatch);
            return (
              <tr key={g.stage}>
                <td className="font-medium whitespace-nowrap">{g.stage}</td>
                <td className="text-sm text-foreground/85">{withTermHovers(g.definition, { skipId: cancer.id, max: 4 })}{g.note && <div className="text-xs text-muted mt-1">{g.note}</div>}</td>
                <td className="hidden md:table-cell text-xs">{links.length ? links.map((l, i) => <span key={i}>{i > 0 && ", "}<Link href={l.href} className="underline">{l.label}</Link></span>) : <span className="text-muted">—</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function StagingPage() {
  validate();
  const g = graph();
  const cancerIds = [...new Set([...stagingSystems.flatMap((s) => s.cancerIds), ...riskScores.flatMap((r) => r.cancerIds)])];
  const cancers = cancerIds.map((id) => g.must(id) as Cancer).sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  // The Khorana score spans many cancers; show it once in a general section rather than under each.
  const general = riskScores.filter((r) => r.cancerIds.length > 4);
  const perCancer = (id: string) => ({ systems: stagingSystems.filter((s) => s.cancerIds.includes(id)), scores: riskScores.filter((r) => r.cancerIds.includes(id) && r.cancerIds.length <= 4) });
  const shown = cancers.filter((c) => { const p = perCancer(c.id); return p.systems.length || p.scores.length; });

  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Staging and risk scores"
        lede={`${stagingSystems.length} staging systems and ${riskScores.length} prognostic scores across ${shown.length} cancers: the groupings quoted at every tumour board, each with its source and a link to the matching standard of care. Scores are interactive: tick the factors and read the published outcome for the group. Nothing you enter leaves the page.`} />
      <Container className="pb-16">
        <nav aria-label="Cancers" className="mb-6 flex flex-wrap gap-1.5 text-sm">
          {shown.map((c) => <a key={c.id} href={`#${c.id}`} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5"><CancerIcon cancerId={c.id} className="h-3.5 w-3.5" />{c.name.replace(/\s*\(.*?\)\s*$/, "")}</a>)}
          <a href="#general" className="chip border bg-card border-border hover:bg-foreground/5">All cancers: thrombosis risk</a>
        </nav>

        {shown.map((c) => {
          const { systems, scores } = perCancer(c.id);
          return (
            <section key={c.id} id={c.id} className="mt-10 scroll-mt-24">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-6 w-6" /></span>
                <h2 className="text-lg font-semibold tracking-tight"><Link href={routeFor(c)} className="hover:underline">{c.name}</Link></h2>
                <Link href={`/sequencing/${c.id}/`} className="text-xs underline text-muted ml-auto">Lines of therapy →</Link>
              </div>
              <div className="space-y-6">
                {systems.map((s) => (
                  <div key={s.id} id={s.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <h3 className="font-medium">{s.name}</h3>
                      <a href={s.source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted underline">{s.source.label}</a>
                    </div>
                    {s.note && <p className="text-sm text-muted mb-2 max-w-3xl">{withTermHovers(s.note, { skipId: c.id, max: 4 })}</p>}
                    <StageTable groups={s.groups} cancer={c} />
                  </div>
                ))}
                {scores.map((r) => {
                  const links: Record<string, GroupLink[]> = {};
                  for (const grp of r.groups) links[grp.label] = socLinks(c, grp.settingMatch);
                  return <RiskScore key={r.id} def={r} links={links} cancerName={c.name} />;
                })}
              </div>
            </section>
          );
        })}

        <Section title="All cancers: thrombosis risk" id="general">
          <div className="space-y-6">{general.map((r) => <RiskScore key={r.id} def={r} />)}</div>
        </Section>

        <div className="mt-10 grid gap-4 md:grid-cols-2 text-sm">
          <div className="card p-4 space-y-1.5">
            <h3 className="font-semibold">About the numbers</h3>
            <p className="text-muted">Outcomes are quoted from the derivation or validation cohort named in each source and reflect the treatments of that era: R-IPI and CLL-IPI predate CAR-T and BTK inhibitors, IMDC predates immunotherapy doublets. They rank risk; they do not predict an individual. <Tip title="Stage" text="Where the cancer has reached: size, nodes, spread. Stage groups bundle TNM combinations with similar prognosis."><span className="underline decoration-dotted cursor-help">Stage</span></Tip> tables are summarised to the level quoted in clinic; consult the AJCC/UICC manual for the full T, N and M definitions.</p>
          </div>
          <div className="card p-4 space-y-1.5">
            <h3 className="font-semibold">Related tools</h3>
            <p className="text-muted"><Link href="/sequencing/" className="underline">Lines of therapy</Link> lays out what is done at each stage; the <Link href="/calculators/" className="underline">calculators</Link> cover body surface area, renal function and RECIST; the glossary explains <Link href="/terms/tnm-staging/" className="underline">TNM staging</Link>, <Link href="/terms/lugano-classification/" className="underline">Lugano</Link> and <Link href="/terms/r-iss/" className="underline">R-ISS</Link>. Not medical advice.</p>
          </div>
        </div>
      </Container>
    </>
  );
}
