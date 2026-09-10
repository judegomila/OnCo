import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { SymptomPath, type PathRef, type SymptomView } from "@/components/SymptomPath";
import { SYMPTOM_PATHS } from "@/data/symptom-paths";

export const metadata: Metadata = pageMeta({ title: "Symptom to test: what comes next", description: "Start from a worrying symptom. See what it usually means, which test a doctor would order first and what it rules out, the referral thresholds NICE and US guidelines actually state, and the cancers to read about.", path: "/symptoms/" });

export default function SymptomsPage() {
  const g = graph();
  // graph().must() throws at build if a pathway references an unknown cancer, technology or term.
  const ref = (id: string): PathRef => { const e = g.must(id); return { id: e.id, name: e.name, tldr: e.tldr, route: routeFor(e), status: e.status }; };
  const symptoms: SymptomView[] = SYMPTOM_PATHS.map((s) => ({
    id: s.id, label: s.label, aka: s.aka, group: s.group, plain: s.plain, redFlags: s.redFlags, firstTest: s.firstTest,
    cancers: s.cancers.map(ref), tests: s.tests.map(ref), terms: (s.terms ?? []).map(ref), referral: s.referral,
  }));
  return (
    <>
      <PageHeader kicker={<GroupKicker id="live" />} title="Symptom to test: what comes next"
        lede={`${symptoms.length} presenting symptoms, each walked through in four steps: what it can mean (most causes are not cancer), which test comes first and what it rules in or out, the exact referral thresholds from NICE NG12 and US guidance for your region, and the cancer pages to read. Nothing you choose leaves your browser. This is orientation, not a diagnosis.`} />
      <Container className="pb-16">
        <SymptomPath symptoms={symptoms} />
      </Container>
    </>
  );
}
