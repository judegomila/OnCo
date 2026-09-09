import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { ReportReader, type TermRef } from "@/components/ReportReader";
import { REPORT_FIELDS, REPORT_FORMS } from "@/data/report-fields";

export const metadata: Metadata = pageMeta({ title: "Pathology report reader", description: "Type the values from a breast, prostate, bowel, lung, lymphoma or myeloma report (Ki-67, margins, HER2, Gleason grade group, MSI, PD-L1, Deauville, R-ISS and more) and read what each means and what it changes, with glossary links. Nothing is stored.", path: "/report-reader/" });

export default function ReportReaderPage() {
  const g = graph();
  // graph().must() throws at build if a field references an unknown term or a form an unknown cancer.
  const ref = (id: string): TermRef => { const e = g.must(id); return { id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e) }; };
  const terms: Record<string, TermRef> = {};
  for (const f of REPORT_FIELDS) if (!terms[f.termId]) terms[f.termId] = ref(f.termId);
  const cancers: Record<string, TermRef> = {};
  for (const f of REPORT_FORMS) for (const id of f.cancers) if (!cancers[id]) cancers[id] = ref(id);
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Pathology report reader"
        lede={`${REPORT_FIELDS.length} report fields across ${REPORT_FORMS.length} cancer groups. Choose the report type, copy in the values as printed (Ki-67, margins, receptor scores, grade group, MSI, PD-L1, Deauville, R-ISS and the rest), and each becomes a plain-language reading with what it changes and a glossary link. Values stay on this page and are never stored or sent. This decodes vocabulary; your team interprets the case.`} />
      <Container className="pb-16">
        <ReportReader terms={terms} cancers={cancers} />
      </Container>
    </>
  );
}
