import type { Metadata } from "next";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { Container, PageHeader } from "@/components/ui";
import { MarkdownLite } from "@/components/MarkdownLite";

export const metadata: Metadata = { title: "Corrections", description: "Every factual correction made to OnCo: what was wrong, how it was found, and the fix." };

export default function Corrections() {
  const md = readFileSync(join(process.cwd(), "CORRECTIONS.md"), "utf8");
  return (
    <>
      <PageHeader kicker={<span className="kicker">Trust</span>} title="Corrections log"
        lede="A public record of every factual correction: what the record said, why it was wrong, how the error was found, and the commit that fixed it. Errors are expected in a corpus this size; hiding them would be the failure." />
      <Container className="pb-16 max-w-3xl">
        <MarkdownLite md={md} />
        <p className="text-sm text-muted mt-10">Found an error? Open an issue or a pull request on <a className="underline" href="https://github.com/judegomila/OnCo" rel="noopener">GitHub</a>; the fix gets logged here. Source: <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/CORRECTIONS.md" rel="noopener">CORRECTIONS.md</a>. See also the automated <Link className="underline" href="/audit/">audit</Link>.</p>
      </Container>
    </>
  );
}
