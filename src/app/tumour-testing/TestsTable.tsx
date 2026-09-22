"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { KindIcon } from "@/components/KindIcon";
import { RowAvatar } from "@/components/RowAvatar";
import type { Kind } from "@/lib/kinds";
import { REG_LABEL, REG_ORDER, SCOPE_LABEL, SCOPE_PLAIN } from "@/data/tumour-tests";
import { FilterGlyph, REG_CLASS, SAMPLE_CLASS, SAMPLE_LABEL, SAMPLE_ORDER, SCOPE_CLASS, SCOPE_ORDER, SampleIcon, ScopeIcon, StatusIcon } from "./glyphs";
import { FACETS, filterQuery, isEmpty, matches, parseFilter, type Facet, type Filter, type TestRow } from "./filter";

/**
 * The tumour tests table with client-side filters. Every row is rendered on the server and stays in the HTML;
 * this component only sets `hidden` on the rows a filter excludes, so crawlers and readers without JavaScript
 * see the whole table. The filter lives in the URL query (`?sample=blood&scope=exome`), read on mount and on
 * back/forward, and written with `history.replaceState` so a filtered view can be shared. Links elsewhere on the
 * page that point at this page with a filter query are intercepted and applied in place.
 */
type Option = { value: string; label: string; icon: ReactNode; className?: string; title?: string };

const FACET_LABEL: Record<Facet, string> = { sample: "Sample", scope: "Scope", company: "Company", status: "Regulatory status" };

export function TestsTable({ rows, initialFilter = {} }: { rows: TestRow[]; initialFilter?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const [open, setOpen] = useState<Facet | null>(null);
  const headerButtons = useRef<Partial<Record<Facet, HTMLButtonElement | null>>>({});
  const popover = useRef<HTMLDivElement>(null);

  const options = useMemo<Record<Facet, Option[]>>(() => {
    const companies = new Map<string, TestRow>();
    for (const r of rows) if (!companies.has(r.companyId)) companies.set(r.companyId, r);
    return {
      sample: SAMPLE_ORDER.filter((s) => rows.some((r) => r.sample === s)).map((s) => ({ value: s, label: SAMPLE_LABEL[s], icon: <SampleIcon sample={s} />, className: SAMPLE_CLASS[s] })),
      scope: SCOPE_ORDER.filter((s) => rows.some((r) => r.scope === s)).map((s) => ({ value: s, label: SCOPE_LABEL[s], icon: <ScopeIcon scope={s} />, className: SCOPE_CLASS[s], title: SCOPE_PLAIN[s] })),
      company: [...companies.values()].sort((a, b) => a.companyName.localeCompare(b.companyName)).map((r) => ({ value: r.companyId, label: r.companyName, icon: <RowAvatar src={r.companyLogo} name={r.companyName} size="sm" /> })),
      status: REG_ORDER.filter((s) => rows.some((r) => r.statuses.includes(s))).map((s) => ({ value: s, label: REG_LABEL[s], icon: <StatusIcon status={s} />, className: REG_CLASS[s] })),
    };
  }, [rows]);

  const apply = useCallback((next: Filter, write = true) => {
    setFilter(next);
    if (!write || typeof window === "undefined") return;
    const q = filterQuery(next);
    const url = `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`;
    if (url !== window.location.pathname + window.location.search + window.location.hash) window.history.replaceState(window.history.state, "", url);
  }, []);

  // Read the query on mount and on back/forward; apply same-page filter links in place.
  useEffect(() => {
    const read = () => setFilter(parseFilter(window.location.search));
    read();
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const u = new URL(a.href, window.location.href);
      if (u.origin !== window.location.origin || u.pathname !== window.location.pathname || !u.search) return;
      const next = parseFilter(u.search);
      if (isEmpty(next) && !FACETS.some((k) => u.searchParams.has(k))) return;
      e.preventDefault();
      window.history.pushState(window.history.state, "", `${u.pathname}${u.search}${u.hash}`);
      setFilter(next);
      if (u.hash) document.getElementById(u.hash.slice(1))?.scrollIntoView({ block: "start" });
    };
    window.addEventListener("popstate", read);
    document.addEventListener("click", onClick);
    return () => { window.removeEventListener("popstate", read); document.removeEventListener("click", onClick); };
  }, []);

  // Escape closes the header popover and returns focus to its button; clicking outside closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.preventDefault(); const b = headerButtons.current[open]; setOpen(null); b?.focus(); } };
    const onDoc = (e: MouseEvent) => { const t = e.target as Node; if (popover.current && !popover.current.contains(t) && !headerButtons.current[open]?.contains(t)) setOpen(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDoc); };
  }, [open]);

  const toggle = (k: Facet, v: string) => apply(filter[k] === v ? { ...filter, [k]: undefined } : { ...filter, [k]: v });
  const visible = rows.filter((r) => matches(r, filter));
  const active = !isEmpty(filter);

  const pill = (k: Facet, o: Option, extra = "") => {
    const on = filter[k] === o.value;
    return (
      <button key={o.value} type="button" onClick={() => toggle(k, o.value)} aria-pressed={on} title={o.title ?? (on ? `Remove the ${o.label} filter` : `Show only ${o.label}`)}
        className={`chip text-xs border transition-colors ${on ? "border-accent bg-accent-soft text-accent font-medium" : o.className ? `${o.className} border-transparent hover:border-border-strong` : "border-border bg-card hover:bg-foreground/5"} ${extra}`}>
        {o.icon}<span>{o.label}</span>
      </button>
    );
  };

  const header = (k: Facet, label: string, extra = "") => {
    const on = !!filter[k];
    const isOpen = open === k;
    return (
      <th className={`py-2 pr-3 font-medium relative ${extra}`}>
        <button type="button" ref={(el) => { headerButtons.current[k] = el; }} onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen} aria-haspopup="dialog" aria-controls={`filter-${k}`}
          title={on ? `Filtered by ${label.toLowerCase()}: change or clear` : `Filter by ${label.toLowerCase()}`}
          className={`inline-flex items-center gap-1 uppercase tracking-wide rounded-md px-1 -mx-1 hover:text-foreground ${on ? "text-accent" : ""}`}>
          {label}<FilterGlyph filled={on} />
        </button>
        {isOpen && (
          <div ref={popover} id={`filter-${k}`} role="dialog" aria-label={`Filter by ${FACET_LABEL[k].toLowerCase()}`} className="absolute start-0 top-full z-40 mt-1 w-max max-w-[85vw] card shadow-pop p-2 normal-case tracking-normal">
            <div className="flex flex-wrap gap-1">
              {options[k].map((o) => pill(k, o))}
              {filter[k] && <button type="button" onClick={() => apply({ ...filter, [k]: undefined })} className="chip text-xs border border-border bg-card hover:bg-foreground/5"><svg viewBox="0 0 24 24" aria-hidden className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg><span>Clear</span></button>}
            </div>
          </div>
        )}
      </th>
    );
  };

  return (
    <div id="tests" className="scroll-mt-20">
      <div className="card p-3 sm:p-4">
        <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:gap-x-4 sm:gap-y-2 items-baseline text-sm">
          {FACETS.map((k) => (
            <div key={k} className="contents">
              <div className="kicker sm:pt-0.5">{FACET_LABEL[k]}</div>
              <div className="flex flex-wrap gap-1">{options[k].map((o) => pill(k, o))}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm" aria-live="polite">
          <span className="font-medium" data-testid="count">{visible.length} of {rows.length} tests</span>
          {active && (
            <button type="button" onClick={() => apply({})} className="chip text-xs border border-accent bg-accent-soft text-accent hover:bg-accent/15" title="Show every test">
              <svg viewBox="0 0 24 24" aria-hidden className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg><span>Clear</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-[15px]">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="py-2 pr-3 font-medium">Test</th>
              {header("company", "Company")}
              {header("sample", "Sample")}
              {header("scope", "Scope")}
              <th className="py-2 pr-3 font-medium">What it returns</th>
              {header("status", "US status", "hidden lg:table-cell")}
              <th className="py-2 pr-3 font-medium hidden lg:table-cell">EU status</th>
              <th className="py-2 font-medium hidden md:table-cell">Technologies</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const shown = matches(r, filter);
              return (
                <tr key={r.id} id={r.id} hidden={!shown} className="align-top border-t border-border">
                  <td className="py-3 pr-3">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{r.name}</a>
                    {r.recordRoute && <div className="text-xs mt-0.5"><Link href={r.recordRoute} className="text-muted hover:underline inline-flex items-center gap-1"><KindIcon kind={(r.recordKind ?? "drug") as Kind} className="h-3 w-3" />OnCo record</Link></div>}
                    {r.note && <div className="text-xs text-muted mt-1 max-w-xs">{r.note}</div>}
                  </td>
                  <td className="py-3 pr-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <RowAvatar src={r.companyLogo} name={r.companyName} />
                      {r.companyRoute ? <Link href={r.companyRoute} className="hover:underline" title={`${r.companyName} on OnCo`}>{r.companyName}</Link> : <span>{r.companyName}</span>}
                      <button type="button" onClick={() => toggle("company", r.companyId)} aria-pressed={filter.company === r.companyId} title={filter.company === r.companyId ? "Show every laboratory" : `Only ${r.companyName} tests`} className={`rounded p-0.5 hover:text-accent ${filter.company === r.companyId ? "text-accent" : "text-muted"}`}><FilterGlyph filled={filter.company === r.companyId} /></button>
                    </span>
                  </td>
                  <td className="py-3 pr-3">
                    <button type="button" onClick={() => toggle("sample", r.sample)} aria-pressed={filter.sample === r.sample} title={filter.sample === r.sample ? "Show every sample type" : `Only ${SAMPLE_LABEL[r.sample].toLowerCase()} tests`} className={`chip text-xs border ${filter.sample === r.sample ? "border-accent" : "border-transparent"} ${SAMPLE_CLASS[r.sample]}`}><SampleIcon sample={r.sample} /><span>{SAMPLE_LABEL[r.sample]}</span></button>
                  </td>
                  <td className="py-3 pr-3">
                    <button type="button" onClick={() => toggle("scope", r.scope)} aria-pressed={filter.scope === r.scope} title={SCOPE_PLAIN[r.scope]} className={`chip text-xs border ${filter.scope === r.scope ? "border-accent" : "border-transparent"} ${SCOPE_CLASS[r.scope]}`}><ScopeIcon scope={r.scope} /><span>{SCOPE_LABEL[r.scope]}</span></button>
                  </td>
                  <td className="py-3 pr-3 text-sm leading-relaxed min-w-[16rem]">{r.returns}</td>
                  <td className="py-3 pr-3 text-sm hidden lg:table-cell">
                    {r.statuses.length > 0 && <div className="flex flex-wrap gap-1 mb-1">{r.statuses.map((s) => <button key={s} type="button" onClick={() => toggle("status", s)} aria-pressed={filter.status === s} title={filter.status === s ? "Show every status" : `Only ${REG_LABEL[s]} tests`} className={`chip text-[11px] border ${filter.status === s ? "border-accent" : "border-transparent"} ${REG_CLASS[s]}`}><StatusIcon status={s} /><span>{REG_LABEL[s]}</span></button>)}</div>}
                    {r.us}
                  </td>
                  <td className="py-3 pr-3 text-sm hidden lg:table-cell">{r.eu}</td>
                  <td className="py-3 text-xs hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {r.technologies.map((e) => <Link key={e.id} href={e.route} className="chip border border-border bg-card hover:bg-foreground/5 inline-flex items-center gap-1"><KindIcon kind={e.kind as Kind} className="h-3 w-3" />{e.name}</Link>)}
                    </div>
                  </td>
                </tr>
              );
            })}
            {visible.length === 0 && (
              <tr className="border-t border-border"><td colSpan={8} className="py-6 text-sm text-muted">No test matches every filter. <button type="button" onClick={() => apply({})} className="underline hover:text-accent">Clear the filters</button> to see all {rows.length}.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

