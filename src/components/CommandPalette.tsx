"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSearch } from "./SearchBox";
import type { SearchDoc } from "@/lib/search-index";
import { KIND_META } from "@/lib/schema";
import { KIND_COLOR, STATUS_LABEL, statusClass } from "@/lib/text";

type Item = { id: string; kind?: SearchDoc["kind"]; name: string; tldr: string; route: string; status?: string; action?: true };

const PAGES: Item[] = [
  { id: "p-explore", name: "Explore: ranked power view", tldr: "Pick a cancer, switch kind, sort and filter", route: "/explore/", action: true },
  { id: "p-for-me", name: "For me: pick your cancer type", tldr: "What works and what could work for your cancer(s)", route: "/for-me/", action: true },
  { id: "p-tumor-board", name: "Tumour board mode", tldr: "Enter biomarkers, get matched options", route: "/tumor-board/", action: true },
  { id: "p-graph", name: "Graph explorer", tldr: "Navigate the knowledge graph visually", route: "/graph/", action: true },
  { id: "p-compare", name: "Compare products, technologies, targets, trials, or cancers", tldr: "Up to five side by side, differences highlighted", route: "/compare/", action: true },
  { id: "p-calendar", name: "Readout calendar", tldr: "Upcoming decisions, readouts, congresses", route: "/calendar/", action: true },
  { id: "p-digests", name: "Congress digests", tldr: "ASCO, ESMO, AACR, ASCO GU", route: "/digests/", action: true },
  { id: "p-failures", name: "Failure museum", tldr: "What did not work and why", route: "/failures/", action: true },
  { id: "p-resistance", name: "Resistance atlas", tldr: "Escape routes per drug class", route: "/resistance/", action: true },
  { id: "p-paths", name: "Reading paths", tldr: "Curated sequences of pages", route: "/paths/", action: true },
  { id: "p-institutions", name: "Institutions map and ranking", tldr: "Who matters, where", route: "/institutions/", action: true },
  { id: "p-report", name: "State of the war on cancer, 2026", tldr: "Annual report from the corpus", route: "/report/2026/", action: true },
  { id: "p-hub", name: "Roadmap", tldr: "What OnCo is building next, in waves, with status", route: "/hub/", action: true },
  { id: "p-api", name: "Open API", tldr: "The corpus as JSON", route: "/api/", action: true },
  { id: "p-about", name: "About and methodology", tldr: "Rules for facts, ranking formula, licence", route: "/about/", action: true },
];

/** ⌘K / Ctrl+K command palette: search every object and jump to any page. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [items, setItems] = useState<Item[]>(PAGES);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [indexed, setIndexed] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === "Escape") setOpen(false);
      else if (e.key === "/" && !open && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener("onco:open-palette", onOpen);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("onco:open-palette", onOpen); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => input.current?.focus(), 0);
    loadSearch().then(({ docs }) => { setIndexed(docs.length); setReady(true); });
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, [open]);

  const run = useCallback((value: string) => {
    setActive(0);
    const needle = value.trim().toLowerCase();
    if (!needle) { setItems(PAGES); return; }
    const pages = PAGES.filter((p) => `${p.name} ${p.tldr}`.toLowerCase().includes(needle)).slice(0, 3);
    loadSearch().then(({ ms }) => {
      const hits = (ms.search(value).slice(0, 14) as unknown as SearchDoc[]).map((h) => ({ id: h.id, kind: h.kind, name: h.name, tldr: h.tldr, route: h.route, status: h.status }));
      setItems([...pages, ...hits]);
    });
  }, []);

  const go = (item: Item) => { setOpen(false); setQ(""); setItems(PAGES); router.push(item.route); };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, items.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && items[active]) { e.preventDefault(); go(items[active]); }
  };
  useEffect(() => { list.current?.children[active]?.scrollIntoView({ block: "nearest" }); }, [active]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 backdrop-blur-sm p-4 pt-[12vh]" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false); }} role="dialog" aria-modal="true" aria-label="Search OnCo">
      <div className="w-full max-w-2xl card shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <span className="text-muted" aria-hidden>⌕</span>
          <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); run(e.target.value); }} onKeyDown={onKeyDown} placeholder="Search products, targets, cancers, trials, companies, pages…" className="flex-1 bg-transparent py-3.5 text-base outline-none" aria-label="Search" />
          <kbd className="hidden sm:inline text-[10px] text-muted border border-border rounded px-1.5 py-0.5">esc</kbd>
        </div>
        <ul ref={list} className="max-h-[60vh] overflow-auto py-1" role="listbox">
          {!ready && q && <li className="px-4 py-3 text-sm text-muted">Loading index…</li>}
          {items.length === 0 && ready && <li className="px-4 py-3 text-sm text-muted">No matches.</li>}
          {items.map((it, i) => (
            <li key={it.id} role="option" aria-selected={i === active} onMouseEnter={() => setActive(i)} onMouseDown={(e) => { e.preventDefault(); go(it); }}
              className={`flex items-start gap-3 px-4 py-2 cursor-pointer ${i === active ? "bg-foreground/5" : ""}`}>
              <span className={`chip mt-0.5 border shrink-0 ${it.kind ? KIND_COLOR[it.kind] : "bg-foreground/5 border-border"}`}>{it.kind ? KIND_META[it.kind].label : "Page"}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium truncate">{it.name}</span>
                <span className="block text-xs text-muted line-clamp-1">{it.tldr}</span>
              </span>
              {it.status && <span className={`chip shrink-0 ${statusClass(it.status)}`}>{STATUS_LABEL[it.status] ?? it.status}</span>}
              {i === active && <kbd className="hidden sm:inline text-[10px] text-muted border border-border rounded px-1.5 py-0.5 self-center">↵</kbd>}
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-[11px] text-muted">
          <span><kbd className="border border-border rounded px-1">↑</kbd> <kbd className="border border-border rounded px-1">↓</kbd> navigate</span>
          <span><kbd className="border border-border rounded px-1">↵</kbd> open</span>
          <span><kbd className="border border-border rounded px-1">⌘K</kbd> toggle</span>
          <span className="ml-auto">{ready ? `${indexed.toLocaleString("en-GB")} objects indexed` : ""}</span>
        </div>
      </div>
    </div>
  );
}

/** A button that opens the palette; used in the header. */
export function PaletteTrigger({ className = "" }: { className?: string }) {
  const [mac, setMac] = useState(true);
  useEffect(() => { const id = requestAnimationFrame(() => setMac(/Mac|iPhone|iPad/.test(navigator.platform))); return () => cancelAnimationFrame(id); }, []);
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("onco:open-palette"))} className={`flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted hover:bg-foreground/5 ${className}`} aria-label="Open search (Command K)">
      <span aria-hidden>⌕</span>
      <span>Search</span>
      <kbd className="ml-auto hidden sm:inline text-[10px] border border-border rounded px-1.5 py-0.5">{mac ? "⌘" : "Ctrl"} K</kbd>
    </button>
  );
}
