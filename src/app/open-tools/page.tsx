import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { sections } from "@/data/sections";
import { openmedical, OPENMEDICAL_GENERATED, OPENMEDICAL_SITE } from "@/data/openmedical";
import { openMedicalBySection } from "@/lib/openmedical";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { FrontIcon } from "@/components/FrontIcon";
import { OpenMedicalFooter, OpenMedicalList } from "@/components/OpenMedicalPanel";

export const metadata: Metadata = pageMeta({ title: "Open tools", description: "Open-source software, hardware and data projects you can use or build on for each front of cancer care, from the Open Medical Registry (openmedical.sh).", path: "/open-tools/" });

export default function OpenToolsPage() {
  const g = graph();
  const ordered = [...sections].sort((a, b) => a.order - b.order);
  const groups = openMedicalBySection(ordered.map((s) => s.id));
  const verified = openmedical.filter((e) => e.verified).length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="learn" />} title="Open tools you can use or build"
        lede={`${openmedical.length} open-source projects relevant to oncology, ${verified} of them with records verified by a person at the registry, grouped by the front they serve. Viewers and archives for imaging, slide and cytometry tools for diagnostics, somatic variant callers, treatment planning and QA code for radiotherapy, data standards, and patient tools. Catalogued by the Open Medical Registry, a third party; OnCo maps each record to its fronts, technologies and cancers.`} />
      <Container className="pb-16">
        <nav aria-label="Fronts with open tools" className="flex flex-wrap gap-1.5 mb-8">
          {groups.map(({ sectionId, entries }) => { const s = g.get(sectionId); return s ? <a key={sectionId} href={`#${sectionId}`} className="chip border bg-card border-border hover:bg-foreground/5 inline-flex items-center gap-1.5"><FrontIcon id={sectionId} className="h-3.5 w-3.5" />{s.name} <span className="text-muted tabular-nums">{entries.length}</span></a> : null; })}
        </nav>
        <div className="space-y-12">
          {groups.map(({ sectionId, entries }) => {
            const s = g.get(sectionId);
            if (!s) return null;
            return (
              <section key={sectionId} id={sectionId} aria-labelledby={`h-${sectionId}`}>
                <div className="flex items-center gap-3 mb-1">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent"><FrontIcon id={sectionId} className="h-6 w-6" /></span>
                  <div>
                    <h2 id={`h-${sectionId}`} className="text-xl font-semibold tracking-tight"><Link className="hover:underline" href={routeFor(s)}>{s.name}</Link> <span className="text-muted text-base font-normal tabular-nums">{entries.length}</span></h2>
                    <p className="text-sm text-muted">{s.tldr}</p>
                  </div>
                </div>
                <div className="mt-4"><OpenMedicalList entries={entries} /></div>
              </section>
            );
          })}
        </div>
        <div className="mt-12 max-w-3xl text-sm text-muted space-y-2">
          <OpenMedicalFooter />
          <p className="text-xs">Snapshot taken {OPENMEDICAL_GENERATED}; refresh with <code>npm run fetch:openmedical</code>. The mapping to fronts is OnCo&apos;s and lives in <code>scripts/fetch-openmedical.ts</code>; a project appears only after its record was read and judged relevant. Several well-known oncology tools are not yet in the registry (for example MONAI core, TotalSegmentator, matRad, OpenTPS, cBioPortal core, CanReg5 and mCODE); add them at <a className="underline" href={`${OPENMEDICAL_SITE}contribute/`} rel="noopener">openmedical.sh/contribute</a> and they will be picked up on the next refresh. Missing a mapping? <Link className="underline" href="/suggest/">Suggest an edit</Link>.</p>
        </div>
      </Container>
    </>
  );
}
