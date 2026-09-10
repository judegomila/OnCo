import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { questionsFor } from "@/lib/questions";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { PrepPack, type PrepCancer, type PrepData } from "@/components/PrepPack";

export const metadata: Metadata = pageMeta({
  title: "Appointment prep pack",
  description: "Pick the questions to ask your oncology team for your cancer type, add your own, list the treatments so far, and print or download one page to bring to the appointment.",
  path: "/prep/",
});

export default function PrepPage() {
  const g = graph();
  const cancers: PrepCancer[] = g.kind("cancer").map((c) => {
    const q = questionsFor(c);
    return { id: c.id, name: c.name, group: c.group, route: routeFor(c), source: q.source, questions: q.items.map((x) => ({ setting: x.setting, question: x.question, why: x.why })) };
  });
  const lines: PrepData["lines"] = {};
  for (const e of g.entities) if (e.kind === "drug" || e.kind === "technology") lines[e.id] = { name: e.name, route: routeFor(e) };
  const data: PrepData = { cancers, lines };
  return (
    <>
      <PageHeader kicker={<GroupKicker id="live" />} title="Appointment prep pack"
        lede="Appointments are short and the questions scatter. Choose your cancer type, tick the questions that matter to you, add your own, and print or download one page with space for the answers. Treatments already recorded in your browser profile are listed at the top. Everything stays in this browser. This is orientation, not medical advice." />
      <Container className="pb-16">
        <PrepPack data={data} />
      </Container>
    </>
  );
}
