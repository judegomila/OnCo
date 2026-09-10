"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { currentViewUrl, describeQuery, findView, removeView, saveView, type SavedView } from "@/lib/saved-views";

/**
 * "Save view" for any table whose state lives in the URL. Saves the current URL under a name in localStorage
 * (src/lib/saved-views.ts); the /saved/ page lists them. `stateKey` should change whenever the table's state
 * changes so the button can re-check whether the current URL is already saved.
 */
export function SaveViewButton({ noun, count, stateKey, className = "" }: { noun: string; count?: number; stateKey: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [existing, setExisting] = useState<SavedView | undefined>(undefined);
  const [flash, setFlash] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // The parent writes the URL in its own effect, which runs after ours, so defer the check a frame.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setExisting(findView(currentViewUrl())));
    const onChange = () => setExisting(findView(currentViewUrl()));
    window.addEventListener("onco:saved-views", onChange);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("onco:saved-views", onChange); };
  }, [stateKey]);

  useEffect(() => { if (open) setTimeout(() => input.current?.focus(), 0); }, [open]);

  const defaultName = () => {
    const d = describeQuery(currentViewUrl());
    return d ? `${noun[0].toUpperCase()}${noun.slice(1)}: ${d}` : `All ${noun}`;
  };
  const submit = () => {
    saveView({ name: name.trim() || defaultName(), noun, count });
    setOpen(false); setName(""); setFlash(true);
    setTimeout(() => setFlash(false), 2500);
  };
  const btn = "rounded-md border border-border bg-card px-2 py-1 text-xs text-muted hover:bg-surface hover:text-foreground";

  if (existing) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs no-print ${className}`}>
        <Link href="/saved/" className="rounded-md border border-accent bg-accent-soft px-2 py-1 text-accent hover:brightness-95" title={`Saved as "${existing.name}". Open your saved views.`}>{flash ? "Saved" : "View saved"}</Link>
        <button type="button" onClick={() => removeView(existing.id)} className={btn} aria-label="Remove this saved view" title="Remove this saved view">Remove</button>
      </span>
    );
  }
  if (!open) {
    return <button type="button" onClick={() => setOpen(true)} className={`${btn} no-print ${className}`} title="Save these filters, search and sort under a name (stored in this browser only)">Save view</button>;
  }
  return (
    <form className={`inline-flex items-center gap-1 no-print ${className}`} onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <input ref={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={defaultName()} aria-label="Name for this view"
        onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); setOpen(false); } }}
        className="w-56 rounded-md border border-border bg-card px-2 py-1 text-xs outline-none focus:ring-2 focus:ring-accent/40" />
      <button type="submit" className="rounded-md bg-foreground text-background px-2 py-1 text-xs font-medium hover:brightness-110">Save</button>
      <button type="button" onClick={() => setOpen(false)} className={btn}>Cancel</button>
    </form>
  );
}
