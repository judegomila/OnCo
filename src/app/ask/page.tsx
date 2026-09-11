import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMeta } from "@/lib/seo";
import { benchmark } from "@/data/benchmark";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { AskOnco, type AskExample } from "@/components/AskOnco";

export const metadata: Metadata = { robots: { index: false, follow: true }, ...pageMeta({ title: "Ask OnCo", description: "Ask a question in plain words. OnCo reads what you are asking and which records you named, then answers from those records' fields, every sentence cited and linked to its page. No language model, nothing invented.", path: "/ask/" }) };

export default function AskPage() {
  // A spread of benchmark questions as starting points: two per audience, easiest first.
  const examples: AskExample[] = (["patient", "clinician", "analyst"] as const).flatMap((aud) =>
    benchmark.filter((q) => q.audience === aud).sort((a, b) => a.difficulty - b.difficulty).slice(0, 2).map((q) => ({ question: q.question, audience: aud }))
  );
  return (
    <>
      <PageHeader kicker={<GroupKicker id="find" />} title="Ask OnCo" lede="Ask in plain words. OnCo works out what you are asking and which records you named, then builds the answer from those records, plain English first, each sentence numbered and linked so you can check it at its source. Nothing is generated and nothing leaves your browser." />
      <Container className="pb-16">
        <Suspense><AskOnco examples={examples} /></Suspense>
      </Container>
    </>
  );
}
