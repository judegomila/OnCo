"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { qrEncode, qrPath } from "@/lib/qr";
import { readLayer, writeLayer } from "@/lib/layer";

type Mode = "section" | "full" | "pack";

const MODES: Array<{ id: Mode; label: string; hint: string }> = [
  { id: "full", label: "Full page", hint: "Every section, as on screen" },
  { id: "section", label: "This section", hint: "Only the section you are reading" },
  { id: "pack", label: "Patient pack", hint: "Every section in plain language, with the date, a QR code back to this page and the disclaimer" },
];

const DISCLAIMER = "OnCo is a public, cited, work-in-progress map of oncology. Facts may be incomplete, out of date or wrong; verify anything here at its primary source. Nothing on this page is medical advice; decisions belong with you and your clinicians.";

/** The section the reader is looking at: the sticky bar's active pill, else the URL hash, else the first section. */
function activeSection(): HTMLElement | null {
  const fromBar = document.querySelector<HTMLElement>("[data-tabbar]")?.dataset.active;
  const hash = window.location.hash.replace(/^#/, "");
  for (const id of [fromBar, hash]) if (id) { const el = document.getElementById(`sec-${id}`); if (el) return el; }
  return document.querySelector<HTMLElement>('section[id^="sec-"]');
}

/** Entity id from `/kind/id/` paths, so the header can show the record's "facts checked" date without any props. */
const entityIdFromPath = () => /^\/[a-z-]+\/([a-z0-9-]+)\/$/.exec(window.location.pathname)?.[1];

/** Mark the document for the print stylesheet: `data-print` on <html>, and `.print-active` on the chosen section. */
function setPrintMode(m: Mode) {
  document.documentElement.setAttribute("data-print", m);
  if (m === "section") activeSection()?.classList.add("print-active");
}
function clearPrintMode() {
  document.documentElement.removeAttribute("data-print");
  document.querySelectorAll(".print-active").forEach((el) => el.classList.remove("print-active"));
}

/**
 * Print or save as PDF, in three modes. All sections of an object page are always rendered, so "full page" is the
 * browser's own print; "this section" hides every other section; "patient pack" switches the reading layer to
 * Plain for the duration of the print. In every mode a print-only header (mounted into <main> so the print
 * stylesheet can place it first) carries the title, URL, print date, the record's asOf date when known, a QR
 * code back to the page and the disclaimer. Print styles live in the `@media print` block of globals.css.
 */
export function PrintButton({ className = "", asOf: asOfProp, title: titleProp }: { className?: string; asOf?: string; title?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [asOf, setAsOf] = useState<string | undefined>(asOfProp);
  const [printedOn, setPrintedOn] = useState("");
  const [mode, setMode] = useState<Mode>("full");
  const box = useRef<HTMLDivElement>(null);
  const restoreLevel = useRef<"technical" | "plain" | "simple" | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => { setMounted(true); setUrl(window.location.origin + window.location.pathname); setPrintedOn(new Date().toISOString().slice(0, 10)); });
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const after = () => {
      clearPrintMode();
      if (restoreLevel.current) { writeLayer({ ...readLayer(), level: restoreLevel.current }); restoreLevel.current = null; }
    };
    document.addEventListener("mousedown", onDoc); document.addEventListener("keydown", onKey); window.addEventListener("afterprint", after);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); window.removeEventListener("afterprint", after); };
  }, []);

  const print = async (m: Mode) => {
    setOpen(false); setMode(m);
    setPrintMode(m);
    if (m === "pack") { const cur = readLayer(); if (cur.level === "technical") { restoreLevel.current = cur.level; writeLayer({ ...cur, level: "plain" }); } }
    if (!asOf) {
      const id = entityIdFromPath();
      if (id) { try { const r = await fetch(`/api/v1/entities/${id}.json`); if (r.ok) { const j = (await r.json()) as { entity?: { asOf?: string } }; if (j.entity?.asOf) setAsOf(j.entity.asOf); } } catch { /* offline: print without the date */ } }
    }
    // Let React flush the header and the layer switch before the print dialog opens.
    setTimeout(() => window.print(), 80);
  };

  const qr = url ? qrEncode(url, "M") : null;
  const header = mounted && document.getElementById("main") ? createPortal(
    <div className="print-header" aria-hidden data-mode={mode}>
      <div className="print-header-row">
        <div className="print-header-text">
          <div className="print-header-brand">OnCo <span>onco.cc</span></div>
          <div className="print-header-title">{titleProp ?? (typeof document !== "undefined" ? document.title.replace(/ · OnCo$/, "") : "")}</div>
          <div className="print-header-meta">
            <span>{url}</span>
            <span>Printed {printedOn}</span>
            {asOf && <span>Facts last checked {asOf}</span>}
            {mode === "pack" && <span>Patient pack, plain language</span>}
          </div>
          <p className="print-header-disclaimer">{DISCLAIMER}</p>
        </div>
        {qr && <svg className="print-header-qr" viewBox={`0 0 ${qr.size + 8} ${qr.size + 8}`} shapeRendering="crispEdges"><rect width={qr.size + 8} height={qr.size + 8} fill="#fff" /><path d={qrPath(qr, 4)} fill="#000" /></svg>}
      </div>
    </div>,
    document.getElementById("main") as HTMLElement,
  ) : null;

  return (
    <span ref={box} className={`relative inline-block ${className.replace("underline", "")}`}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} className="underline" aria-label="Print or save this page as PDF">
        Print / save PDF
      </button>
      {open && (
        <div role="menu" aria-label="Print options" className="absolute right-0 z-30 mt-1.5 w-72 card shadow-pop p-1.5 text-sm no-print">
          {MODES.map((m) => (
            <button key={m.id} type="button" role="menuitem" onClick={() => print(m.id)} className="w-full text-left rounded-lg px-2.5 py-2 hover:bg-surface focus-visible:bg-surface">
              <div className="font-medium">{m.label}</div>
              <div className="text-xs text-muted">{m.hint}</div>
            </button>
          ))}
        </div>
      )}
      {header}
    </span>
  );
}
