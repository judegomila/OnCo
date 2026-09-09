import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Container, GroupKicker, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMeta({ title: "Changelog", description: "What changed in OnCo, release by release.", path: "/changelog/" });

type Block = { type: "h2" | "h3" | "p" | "ul"; text?: string; items?: string[] };

/** Minimal Markdown: ##/### headings, paragraphs, "- " bullets, [text](url) links, `code`, *emphasis*. */
function parse(md: string): Block[] {
  const blocks: Block[] = [];
  let ul: string[] | null = null;
  const flush = () => { if (ul) { blocks.push({ type: "ul", items: ul }); ul = null; } };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (line.startsWith("# ")) continue; // page title handled by header
    if (line.startsWith("## ")) { flush(); blocks.push({ type: "h2", text: line.slice(3) }); continue; }
    if (line.startsWith("### ")) { flush(); blocks.push({ type: "h3", text: line.slice(4) }); continue; }
    if (line.startsWith("- ")) { (ul ??= []).push(line.slice(2)); continue; }
    if (!line.trim()) { flush(); continue; }
    flush(); blocks.push({ type: "p", text: line });
  }
  flush();
  return blocks;
}

function Inline({ text }: { text: string }) {
  // Tokenise links, code, emphasis.
  const parts: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*([^*]+)\*/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<a key={k++} className="underline" href={m[2]} rel="noopener">{m[1]}</a>);
    else if (m[3]) parts.push(<code key={k++} className="text-[0.9em] bg-foreground/5 px-1 rounded">{m[3]}</code>);
    else if (m[4]) parts.push(<em key={k++}>{m[4]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export default function Changelog() {
  const md = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf8");
  const blocks = parse(md);
  return (
    <>
      <PageHeader kicker={<GroupKicker id="intel" />} title="Changelog" lede="What changed, release by release. The corpus is kept current continuously; this records the shape of the site and the major content additions. Also the source of the weekly digest." />
      <Container className="pb-16 max-w-3xl">
        <div className="prose-onco text-[15px] leading-relaxed">
          {blocks.map((b, i) => {
            if (b.type === "h2") return <h2 key={i} className="text-xl font-semibold mt-10 mb-2 first:mt-0"><Inline text={b.text!} /></h2>;
            if (b.type === "h3") return <h3 key={i} className="kicker mt-5 mb-1.5"><Inline text={b.text!} /></h3>;
            if (b.type === "ul") return <ul key={i} className="list-disc pl-5 space-y-1.5">{b.items!.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>;
            return <p key={i} className="text-muted"><Inline text={b.text!} /></p>;
          })}
        </div>
        <p className="text-sm text-muted mt-10">Source: <a className="underline" href="https://github.com/judegomila/OnCo/blob/main/CHANGELOG.md" rel="noopener">CHANGELOG.md</a> · commit history on <a className="underline" href="https://github.com/judegomila/OnCo/commits/main" rel="noopener">GitHub</a>.</p>
      </Container>
    </>
  );
}
