import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor, type Entity } from "@/lib/schema";
import { Container, GroupKicker, KindChip, PageHeader, StatusChip } from "@/components/ui";
import { paragraphs } from "@/lib/text";

export const metadata: Metadata = { title: "Failure museum", description: "Drugs, targets, and trials that did not work, and what each taught. Failures are data." };

const LESSONS: Array<{ key: string; title: string; blurb: string }> = [
  { key: "lesson:phase-2-mirage", title: "The phase 2 mirage", blurb: "Encouraging early data, often single-arm response rates on a checkpoint-inhibitor backbone, that phase 3 could not reproduce." },
  { key: "lesson:wrong-drug", title: "Right idea, wrong molecule", blurb: "The target or concept survived; the specific drug did not do what was claimed, or carried the wrong payload." },
  { key: "lesson:wrong-target", title: "The biology did not hold", blurb: "The mechanism looked sound in cells and mice but did not translate to patients." },
  { key: "lesson:toxicity", title: "Efficacy without a window", blurb: "Activity was real but toxicity, or a safer competitor, made it unusable." },
  { key: "lesson:partner-and-biomarker", title: "Partner and assay decided it", blurb: "The chemotherapy partner or the companion diagnostic, not the drug, determined the result." },
  { key: "lesson:regulatory", title: "Approved, then withdrawn", blurb: "Accelerated approvals whose confirmatory trials disappointed or showed harm." },
  { key: "other", title: "Other setbacks", blurb: "Negative or withdrawn items without a single dominant lesson." },
];

function isFailure(e: Entity): boolean {
  return e.status === "negative" || e.status === "withdrawn" || e.tags.includes("failure") || e.tags.includes("failed-so-far");
}

export default function FailuresPage() {
  const g = graph();
  const items = g.entities.filter(isFailure).sort((a, b) => a.name.localeCompare(b.name));
  const byLesson = new Map<string, Entity[]>();
  for (const e of items) {
    const key = e.tags.find((t) => t.startsWith("lesson:")) ?? "other";
    byLesson.set(key, [...(byLesson.get(key) ?? []), e]);
  }
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Failure museum"
        lede="Oncology learns more from what did not work than from what did, but failures vanish from pipelines and press releases. This room keeps them: drugs stopped, targets abandoned, approvals withdrawn, each with the lesson it left. Nothing here is a verdict on the idea; several of these targets later worked with a different weapon." />
      <Container className="pb-16">
        <div className="text-sm text-muted mb-8">{items.length} exhibits. Anything in the corpus with status negative or withdrawn, or tagged failure, appears here automatically.</div>
        {LESSONS.map((L) => {
          const list = byLesson.get(L.key);
          if (!list?.length) return null;
          return (
            <section key={L.key} className="mt-10">
              <h2 className="text-xl font-semibold">{L.title}</h2>
              <p className="text-sm text-muted mt-1 mb-4 max-w-3xl">{L.blurb}</p>
              <div className="grid gap-3 md:grid-cols-2">
                {list.map((e) => (
                  <Link key={e.id} href={routeFor(e)} className="card p-4 hover:shadow-md transition">
                    <div className="flex items-center gap-2 mb-1.5"><KindChip kind={e.kind} /><StatusChip status={e.status} /></div>
                    <div className="font-semibold">{e.name}</div>
                    <p className="text-sm text-muted mt-1">{e.tldr}</p>
                    {paragraphs(e.summary).find((p) => p.startsWith("Lesson:")) && (
                      <p className="text-sm mt-2 border-l-2 border-accent/60 pl-2 italic">{paragraphs(e.summary).find((p) => p.startsWith("Lesson:"))}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </Container>
    </>
  );
}
