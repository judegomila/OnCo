import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { EntityBrowser, type BrowserRow, type ColDef, type FacetDef } from "@/components/EntityBrowser";
import { openQuestions } from "@/data/open-questions";

export const metadata: Metadata = pageMeta({ title: "Open questions", description: "The unresolved questions for every target and technology: why each is open, what evidence would answer it, who has to act, and the trials and ideas that bear on it.", path: "/open-questions/" });

const STAGE_TIPS: Record<string, string> = { Basic: "The answer needs mechanism: lab and animal work.", Translational: "The answer needs biomarkers, models or early-phase trials.", Clinical: "The answer needs randomised evidence in people.", Implementation: "The answer needs delivery, regulation, payment or standards, not more biology." };
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

export default function OpenQuestionsPage() {
  const g = graph();
  const rows: BrowserRow[] = openQuestions.flatMap((q) => {
    const s = g.get(q.subject);
    if (!s) return [];
    const subjectRoute = s.kind === "target" ? `/dossiers/${s.id}/` : routeFor(s);
    const refs = q.refs.map((id) => g.get(id)).filter((x): x is NonNullable<typeof x> => !!x);
    return [{
      id: q.id, name: q.question, tldr: q.why, route: `${subjectRoute}#q-${q.id}`,
      sub: `${s.kind === "target" ? "Target" : "Technology"}: ${s.name}`,
      facets: { stage: [cap(q.stage)], actor: [cap(q.actor)], kind: [s.kind === "target" ? "Target" : "Technology"], subject: [s.name] },
      cols: {
        subject: [{ label: s.name, href: subjectRoute, tip: s.tldr }],
        stage: { facet: "stage", value: cap(q.stage) },
        actor: { facet: "actor", value: cap(q.actor) },
        answer: q.wouldAnswer,
        refs: refs.slice(0, 6).map((r) => ({ label: r.name.length > 40 ? r.name.slice(0, 38) + "…" : r.name, href: routeFor(r), tip: r.tldr })),
        source: [{ label: q.source.label, href: q.source.url }],
      },
    }];
  });
  const facets: FacetDef[] = [
    { key: "stage", label: "Stage", searchable: false, width: "w-44", order: ["Basic", "Translational", "Clinical", "Implementation"] },
    { key: "actor", label: "Who acts", searchable: false, width: "w-44" },
    { key: "kind", label: "About a", searchable: false, width: "w-36" },
    { key: "subject", label: "Subject", width: "w-60" },
  ];
  const columns: ColDef[] = [
    { key: "subject", label: "Subject", sortable: true },
    { key: "stage", label: "Stage", sortable: true, valueTips: STAGE_TIPS, tip: "Where the answer has to come from." },
    { key: "actor", label: "Who acts", sortable: true, hide: "hidden sm:table-cell" },
    { key: "answer", label: "What would answer it", hide: "hidden lg:table-cell" },
    { key: "refs", label: "Bears on it", hide: "hidden md:table-cell", tip: "Trials, products, papers and ideas in the corpus connected to the question." },
    { key: "source", label: "Source", hide: "hidden xl:table-cell" },
  ];
  const targets = new Set(openQuestions.filter((q) => g.get(q.subject)?.kind === "target").map((q) => q.subject)).size;
  const techs = new Set(openQuestions.filter((q) => g.get(q.subject)?.kind === "technology").map((q) => q.subject)).size;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Open questions"
        lede={`${openQuestions.length} unresolved questions across ${targets} targets and ${techs} technologies. Each says why it is still open, what evidence would settle it, who has to act, and which trials, products and ideas in the corpus bear on it. Cancers carry their own open problems on their pages; this index covers the molecules and the methods.`} />
      <Container className="pb-16">
        <EntityBrowser rows={rows} facets={facets} columns={columns} noun="questions" hideStatus defaultSort={{ key: "subject", dir: 1 }} />
        <p className="text-xs text-muted mt-6 max-w-3xl">Framing sources are papers or registry records, not proof that the question is unanswered everywhere; if you know a trial or paper that settles one, <Link className="underline" href="/suggest/">suggest an edit</Link>. Questions appear on the target <Link className="underline" href="/dossiers/">dossiers</Link>. Stage and actor use the same vocabulary as <Link className="underline" href="/ideas/">ideas</Link>, so a funder can filter both by who has to move.</p>
      </Container>
    </>
  );
}
