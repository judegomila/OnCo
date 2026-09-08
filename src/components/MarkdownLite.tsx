import type { ReactNode } from "react";

type Block = { type: "h2" | "h3" | "p" | "ul" | "table"; text?: string; items?: string[]; rows?: string[][] };

/** Minimal Markdown: ##/### headings, paragraphs, "- " bullets, pipe tables, [text](url) links, `code`, *emphasis*, **strong**. */
export function parseMarkdown(md: string): Block[] {
  const blocks: Block[] = [];
  let ul: string[] | null = null;
  let table: string[][] | null = null;
  const flush = () => {
    if (ul) { blocks.push({ type: "ul", items: ul }); ul = null; }
    if (table) { blocks.push({ type: "table", rows: table }); table = null; }
  };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (line.startsWith("# ")) continue;
    if (line.startsWith("## ")) { flush(); blocks.push({ type: "h2", text: line.slice(3) }); continue; }
    if (line.startsWith("### ")) { flush(); blocks.push({ type: "h3", text: line.slice(4) }); continue; }
    if (line.startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => /^:?-{2,}:?$/.test(c))) continue; // separator row
      if (ul) { blocks.push({ type: "ul", items: ul }); ul = null; }
      (table ??= []).push(cells);
      continue;
    }
    if (line.startsWith("- ")) { if (table) { blocks.push({ type: "table", rows: table }); table = null; } (ul ??= []).push(line.slice(2)); continue; }
    if (!line.trim()) { flush(); continue; }
    flush(); blocks.push({ type: "p", text: line });
  }
  flush();
  return blocks;
}

export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) parts.push(<a key={k++} className="underline" href={m[2]} rel="noopener">{m[1]}</a>);
    else if (m[3]) parts.push(<code key={k++} className="text-[0.9em] bg-foreground/5 px-1 rounded">{m[3]}</code>);
    else if (m[4]) parts.push(<strong key={k++}>{m[4]}</strong>);
    else if (m[5]) parts.push(<em key={k++}>{m[5]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function MarkdownLite({ md }: { md: string }) {
  const blocks = parseMarkdown(md);
  return (
    <div className="prose-onco text-[15px] leading-relaxed">
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i} className="text-xl font-semibold mt-10 mb-2 first:mt-0"><Inline text={b.text!} /></h2>;
        if (b.type === "h3") return <h3 key={i} className="kicker mt-5 mb-1.5"><Inline text={b.text!} /></h3>;
        if (b.type === "ul") return <ul key={i} className="list-disc pl-5 space-y-1.5">{b.items!.map((it, j) => <li key={j}><Inline text={it} /></li>)}</ul>;
        if (b.type === "table") {
          const [head, ...body] = b.rows!;
          return (
            <div key={i} className="overflow-x-auto my-4"><table className="onco">
              <thead><tr>{head.map((c, j) => <th key={j}><Inline text={c} /></th>)}</tr></thead>
              <tbody>{body.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}><Inline text={c} /></td>)}</tr>)}</tbody>
            </table></div>
          );
        }
        return <p key={i} className="text-muted"><Inline text={b.text!} /></p>;
      })}
    </div>
  );
}
