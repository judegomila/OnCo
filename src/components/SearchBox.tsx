"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import MiniSearch from "minisearch";
import type { SearchDoc } from "@/lib/search-index";
import { KIND_META } from "@/lib/schema";
import { KIND_COLOR } from "@/lib/text";

let cache: Promise<{ ms: MiniSearch<SearchDoc>; docs: SearchDoc[] }> | null = null;

function load() {
  if (!cache) {
    cache = fetch("/api/v1/search.json")
      .then((r) => r.json())
      .then((docs: SearchDoc[]) => {
        const ms = new MiniSearch<SearchDoc>({
          fields: ["name", "aka", "tldr", "tags", "id"],
          storeFields: ["id", "kind", "name", "tldr", "route", "status"],
          searchOptions: { boost: { name: 4, aka: 3, id: 2 }, prefix: true, fuzzy: 0.2 },
        });
        ms.addAll(docs);
        return { ms, docs };
      });
  }
  return cache;
}

export function SearchBox({ large = false, autoFocus = false }: { large?: boolean; autoFocus?: boolean }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [ready, setReady] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    load().then(() => setReady(true));
  }, [open]);

  const latest = useRef("");
  const runSearch = (value: string) => {
    latest.current = value;
    if (!value.trim()) { setResults([]); return; }
    load().then(({ ms }) => {
      if (latest.current !== value) return;
      setResults(ms.search(value).slice(0, 12) as unknown as SearchDoc[]);
    });
  };

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const placeholder = useMemo(() => "Search TROP2, Enhertu, PSMA PET, TNBC, Gustave Roussy…", []);

  return (
    <div ref={box} className="relative">
      <input
        type="search"
        value={q}
        autoFocus={autoFocus}
        onChange={(e) => { setQ(e.target.value); setOpen(true); runSearch(e.target.value); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        aria-label="Search OnCo"
        className={`w-full rounded-lg border border-border bg-card px-3 ${large ? "py-3 text-base" : "py-1.5 text-sm"} outline-none focus:ring-2 focus:ring-accent/40`}
      />
      {open && q.trim() && (
        <div className="absolute z-50 mt-1 w-full card shadow-xl max-h-96 overflow-auto">
          {!ready && <div className="p-3 text-sm text-muted">Loading index…</div>}
          {ready && results.length === 0 && <div className="p-3 text-sm text-muted">No matches.</div>}
          <ul>
            {results.map((r) => (
              <li key={r.id}>
                <Link href={r.route} onClick={() => { setOpen(false); setQ(""); setResults([]); }} className="flex items-start gap-3 px-3 py-2 hover:bg-foreground/5">
                  <span className={`chip mt-0.5 border ${KIND_COLOR[r.kind]}`}>{KIND_META[r.kind].label}</span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium truncate">{r.name}</span>
                    <span className="block text-xs text-muted line-clamp-2">{r.tldr}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
