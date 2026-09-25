import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/kinds";
import { pageMeta, entityCrumbs } from "@/lib/seo";
import { SECTION_BY_ID, SECTION_IDS, pagedSectionParams, planFor, type SectionId } from "@/lib/record-sections";
import { CancerSection, cancerStripTabs } from "@/components/CancerRecord";
import { RecordAside } from "@/components/EntityDetail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, PageHeader } from "@/components/ui";
import { CancerIcon } from "@/components/CancerIcon";
import { SectionGlyph } from "@/components/SectionGlyph";
import { Tabs } from "@/components/Tabs";
import { PrintButton } from "@/components/PrintButton";
import { MachineLinks } from "@/components/MachineLinks";

/**
 * One section of a cancer record on its own page (/cancers/<id>/<section>/), for the sections whose estimate passes
 * the inline threshold (src/lib/record-sections.ts). The page carries the same section navigator as the hub with this
 * section highlighted, the section in full, and the record's aside, so a reader never loses their place. Sections
 * that stay inline on the hub have no page here: only the paged ones are generated, and any other address is a 404.
 * The static siblings decisions/, uk/, compared/ and changes/ win over this segment, so their URLs are unchanged.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return pagedSectionParams(graph());
}

const isSection = (s: string): s is SectionId => (SECTION_IDS as readonly string[]).includes(s);

export async function generateMetadata({ params }: { params: Promise<{ id: string; section: string }> }): Promise<Metadata> {
  const { id, section } = await params;
  const c = graph().get(id);
  if (!c || c.kind !== "cancer" || !isSection(section)) return {};
  const def = SECTION_BY_ID[section];
  return pageMeta({ title: `${c.name} · ${def.title}`, description: def.purpose, path: `${routeFor(c)}${section}/` });
}

export default async function CancerSectionPage({ params }: { params: Promise<{ id: string; section: string }> }) {
  const { id, section } = await params;
  const g = graph();
  const c = g.get(id);
  if (!c || c.kind !== "cancer" || !isSection(section)) notFound();
  const plan = planFor(c, section, g);
  if (plan.placement !== "page") notFound();
  const def = plan.def;
  const hub = routeFor(c);
  const tabs = cancerStripTabs(c, section, <CancerSection c={c} id={section} plan={plan} />);
  return (
    <>
      <Breadcrumbs items={[...entityCrumbs(c), { label: def.title, href: plan.route }]} />
      <PageHeader
        kicker={<><Link href="/cancers/" className="kicker hover:underline">Cancers</Link><span className="kicker">·</span><Link href={hub} className="kicker hover:underline">{c.name}</Link></>}
        title={<><span className="inline-flex items-center gap-2"><SectionGlyph name={def.glyph} className="h-7 w-7 text-accent" />{def.title}</span><span className="block text-xl sm:text-2xl font-medium text-foreground/70 mt-1">{c.name}</span></>}
        seed={`${c.id}-${section}`}
        lede={def.purpose}
        logo={<span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-accent/30 bg-accent-soft text-accent"><CancerIcon cancerId={c.id} className="h-10 w-10" /></span>}
        right={<div className="flex flex-col items-end gap-2 text-xs text-muted"><PrintButton /><Link href={`${hub}#${section}`} className="underline">Back to the {c.name.replace(/\s*\(.*?\)\s*$/, "")} hub →</Link>{plan.counts.length > 0 && <span className="tabular-nums">{plan.counts.map((x) => `${x.n.toLocaleString("en-GB")} ${x.label}`).join(" · ")}</span>}</div>}
      />
      <Container className="pb-16">
        <Tabs tabs={tabs} ariaLabel={`${c.name} sections`} current={section} aside={<RecordAside e={c} />} />
      </Container>
      <MachineLinks e={c} />
    </>
  );
}
