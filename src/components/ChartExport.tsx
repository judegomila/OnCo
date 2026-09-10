"use client";

import { useRef, useState, type ReactNode } from "react";

const SITE = "onco-umber.vercel.app";
const LICENCE = "CC BY-NC 4.0, attribute \"Data from OnCo (onco.cc)\"; commercial use needs a licence";
/** Presentation properties copied from computed styles so the file looks the same outside the page's CSS (theme variables, Tailwind classes, currentColor). */
const PROPS = ["fill", "fill-opacity", "stroke", "stroke-width", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-opacity", "opacity", "font-family", "font-size", "font-weight", "font-style", "text-anchor", "dominant-baseline", "letter-spacing", "color", "visibility"];

function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

/** Clone the first SVG inside `root` with styles inlined, then wrap it with a background and a source + licence footer. */
function exportableSvg(root: HTMLElement, footer: string): { svg: SVGSVGElement; width: number; height: number } | null {
  const src = root.querySelector("svg");
  if (!src) return null;
  const clone = src.cloneNode(true) as SVGSVGElement;
  const from = [src, ...Array.from(src.querySelectorAll("*"))];
  const to = [clone, ...Array.from(clone.querySelectorAll("*"))];
  for (let i = 0; i < from.length && i < to.length; i++) {
    const cs = getComputedStyle(from[i]);
    const style = PROPS.map((p) => { const v = cs.getPropertyValue(p); return v ? `${p}:${v}` : ""; }).filter(Boolean).join(";");
    if (style) to[i].setAttribute("style", style);
    to[i].removeAttribute("class");
  }
  const box = src.getBoundingClientRect();
  const vb = src.viewBox.baseVal;
  const width = Math.max(320, Math.round(box.width || vb.width || 640));
  const height = Math.round(box.height || (vb.height && vb.width ? (width * vb.height) / vb.width : 360));
  clone.setAttribute("width", String(width));
  clone.setAttribute("height", String(height));
  if (!clone.getAttribute("viewBox")) clone.setAttribute("viewBox", `0 0 ${width} ${height}`);
  clone.setAttribute("x", "0"); clone.setAttribute("y", "0");

  const F = 28, PAD = 10;
  const ns = "http://www.w3.org/2000/svg";
  const outer = document.createElementNS(ns, "svg");
  outer.setAttribute("xmlns", ns);
  outer.setAttribute("width", String(width + 2 * PAD));
  outer.setAttribute("height", String(height + F + 2 * PAD));
  outer.setAttribute("viewBox", `0 0 ${width + 2 * PAD} ${height + F + 2 * PAD}`);
  const bg = document.createElementNS(ns, "rect");
  bg.setAttribute("width", "100%"); bg.setAttribute("height", "100%"); bg.setAttribute("fill", cssVar("--card", "#ffffff"));
  outer.appendChild(bg);
  const g = document.createElementNS(ns, "g");
  g.setAttribute("transform", `translate(${PAD} ${PAD})`);
  g.appendChild(clone);
  outer.appendChild(g);
  const rule = document.createElementNS(ns, "line");
  rule.setAttribute("x1", String(PAD)); rule.setAttribute("x2", String(width + PAD)); rule.setAttribute("y1", String(height + PAD + 8)); rule.setAttribute("y2", String(height + PAD + 8));
  rule.setAttribute("stroke", cssVar("--border", "#e5e5e5")); rule.setAttribute("stroke-width", "1");
  outer.appendChild(rule);
  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", String(PAD)); text.setAttribute("y", String(height + PAD + 22));
  text.setAttribute("font-family", "ui-sans-serif, system-ui, sans-serif"); text.setAttribute("font-size", "10"); text.setAttribute("fill", cssVar("--muted", "#666666"));
  const maxChars = Math.floor(width / 5.2);
  text.textContent = footer.length > maxChars ? footer.slice(0, maxChars - 1).trimEnd() + "…" : footer;
  outer.appendChild(text);
  return { svg: outer, width: width + 2 * PAD, height: height + F + 2 * PAD };
}

function download(blob: Blob, name: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}

const safeName = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "chart";

/**
 * Wraps any chart that renders an SVG and adds "SVG" and "PNG" download buttons. The export inlines the
 * computed styles (so theme colours survive), adds a card background and a footer line with the title,
 * the data source and the site licence. PNG is rasterised at 2x through a canvas. No external libraries.
 */
export function ChartExport({ children, title, source, filename, className = "", align = "end" }: { children: ReactNode; title: string; source?: string; filename?: string; className?: string; align?: "start" | "end" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<"svg" | "png" | null>(null);
  const footer = `${title} · Source: ${source ?? "OnCo corpus"} · ${SITE} · ${LICENCE} · ${new Date().toISOString().slice(0, 10)}`;
  const name = safeName(filename ?? title);

  const asSvgBlob = () => {
    if (!ref.current) return null;
    const r = exportableSvg(ref.current, footer);
    if (!r) return null;
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(r.svg)}`;
    return { blob: new Blob([xml], { type: "image/svg+xml;charset=utf-8" }), width: r.width, height: r.height };
  };
  const onSvg = () => { setBusy("svg"); try { const r = asSvgBlob(); if (r) download(r.blob, `${name}.svg`); } finally { setBusy(null); } };
  const onPng = () => {
    const r = asSvgBlob();
    if (!r) return;
    setBusy("png");
    const url = URL.createObjectURL(r.blob);
    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = r.width * scale; canvas.height = r.height * scale;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.scale(scale, scale); ctx.drawImage(img, 0, 0); canvas.toBlob((b) => { if (b) download(b, `${name}.png`); setBusy(null); }, "image/png"); } else setBusy(null);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => { URL.revokeObjectURL(url); setBusy(null); };
    img.src = url;
  };

  return (
    <div className={className}>
      <div ref={ref}>{children}</div>
      <div className={`mt-1.5 flex items-center gap-1 text-[11px] text-muted ${align === "end" ? "justify-end" : "justify-start"}`}>
        <span className="mr-1">Download</span>
        <button type="button" onClick={onSvg} disabled={busy !== null} className="rounded border border-border px-1.5 py-0.5 hover:bg-foreground/5 disabled:opacity-50" aria-label={`Download ${title} as SVG`}>SVG</button>
        <button type="button" onClick={onPng} disabled={busy !== null} className="rounded border border-border px-1.5 py-0.5 hover:bg-foreground/5 disabled:opacity-50" aria-label={`Download ${title} as PNG`}>{busy === "png" ? "…" : "PNG"}</button>
      </div>
    </div>
  );
}
