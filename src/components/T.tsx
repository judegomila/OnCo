"use client";

import { Fragment, type ReactNode } from "react";
import { useT, type UiKey, type Vars } from "@/lib/i18n/ui";

/**
 * Chrome text that follows the site language. Server components render these; the first client render is
 * English (useLayer starts at the default), so there is no hydration mismatch, and the text swaps after mount.
 *
 *   <T k="home" />                                  a dictionary key, with optional {placeholder} vars
 *   <TL text="Open problems" />                     a heading or label looked up by its English text
 *   <KindName kind="drug" form="plural" />          KIND_META names
 *   <StatusName status="phase-3" />                 STATUS labels
 */
export function T({ k, vars, fallback }: { k: UiKey | string; vars?: Vars; fallback?: string }) {
  const { tOpt } = useT();
  return <>{tOpt(k, vars) ?? fallback ?? k}</>;
}

/** Heading, field label, facet or column label translated by its English text; unknown text passes through. */
export function TL({ text }: { text: string }) {
  const { tl } = useT();
  return <>{tl(text)}</>;
}

export function KindName({ kind, form = "plural", fallback }: { kind: string; form?: "label" | "plural" | "title"; fallback?: string }) {
  const { kind: k } = useT();
  return <>{k(kind, form) ?? fallback ?? kind}</>;
}

export function StatusName({ status }: { status: string }) {
  const { status: s } = useT();
  return <>{s(status)}</>;
}

/**
 * Split a template on {placeholders} and interleave React nodes, so a translated sentence can contain a link or
 * a bold number in the position the language needs.
 */
export function fillNodes(template: string, vars: Record<string, ReactNode>): ReactNode {
  const parts = template.split(/(\{\w+\})/g);
  return parts.map((p, i) => {
    const m = /^\{(\w+)\}$/.exec(p);
    if (!m) return <Fragment key={i}>{p}</Fragment>;
    return <Fragment key={i}>{m[1] in vars ? vars[m[1]] : p}</Fragment>;
  });
}

/** Like <T> but placeholders may be React nodes (links, bold counts). */
export function TN({ k, vars }: { k: UiKey; vars: Record<string, ReactNode> }) {
  const { t } = useT();
  return <>{fillNodes(t(k), vars)}</>;
}
