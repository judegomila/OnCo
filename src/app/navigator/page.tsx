import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { Navigator, type NavigatorData } from "@/components/Navigator";
import type { SupportItem } from "@/components/CaregiverPanel";

export const metadata: Metadata = pageMeta({ title: "Line-of-therapy navigator", description: "Set your cancer, stage, biomarkers, and what has been tried; see the standard of care for that setting, the cautions, and the next options ranked, with recruiting trials near you.", path: "/navigator/" });

const SUPPORT_IDS = ["scalp-cooling", "cardio-oncology", "exercise-oncology", "geriatric-assessment"];

export default function NavigatorPage() {
  const g = graph();
  // The page carries the cancer chooser and the support links. Everything per cancer (standard of care, match rows,
  // caregiver details, questions) is /api/v1/navigator/<id>.json and the "already tried" list is
  // /api/v1/navigator/lines.json (src/lib/navigator-data.ts), fetched once the profile names a cancer.
  const cancers = g.kind("cancer").map((c) => ({ id: c.id, name: c.name, group: c.group }));
  const support: SupportItem[] = SUPPORT_IDS.map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => !!x).map((x) => ({ id: x.id, name: x.name, tldr: x.tldr, route: routeFor(x) }));
  const data: NavigatorData = { cancers, support };

  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Line-of-therapy navigator"
        lede="Set your cancer type, stage, biomarkers, and what has already been tried. The navigator shows the standard of care for that setting, marks what has been used, flags cautions such as one ADC after another, ranks the next options by evidence and biomarker match, and finds recruiting trials near you. Your profile stays in this browser." />
      <Container className="pb-16">
        <Navigator data={data} />
      </Container>
    </>
  );
}
