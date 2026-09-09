"use client";

import { useState } from "react";

const SITE = "https://onco.cc";

/** Copyable iframe snippet for embedding an entity card anywhere. */
export function EmbedSnippet({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const code = `<iframe src="${SITE}/embed/${id}/" title="${name.replace(/"/g, "&quot;")} — OnCo" width="360" height="190" style="border:0;border-radius:12px" loading="lazy"></iframe>`;
  return (
    <div>
      <button onClick={() => setOpen((o) => !o)} className="underline">Embed this card</button>
      {open && (
        <div className="mt-2">
          <textarea readOnly value={code} rows={4} className="w-full rounded-md border border-border bg-background p-2 text-[11px] font-mono" onFocus={(e) => e.currentTarget.select()} />
          <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="text-xs underline text-muted">{copied ? "Copied" : "Copy"}</button>
          <a href={`/embed/${id}/`} className="text-xs underline text-muted ml-3" target="_blank" rel="noopener">Preview</a>
        </div>
      )}
    </div>
  );
}
