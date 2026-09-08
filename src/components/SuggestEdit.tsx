"use client";

import { useState } from "react";
import Link from "next/link";
import type { SourceLocation } from "@/lib/source-location";

const REPO = "https://github.com/judegomila/OnCo";

type Props = { id: string; kind: string; name: string; fields: string[]; source: SourceLocation; recordJson?: string };

/**
 * Self-service edit: anyone (an organisation about itself, a clinician, a reader) proposes a change.
 * Submits as a prefilled GitHub issue using the "Suggest an edit" template; developers get a direct
 * "edit this record" link with the line anchor. Nothing is sent anywhere except to GitHub when the
 * user clicks through.
 */
export function SuggestEdit({ id, kind, name, fields, source, recordJson }: Props) {
  const [open, setOpen] = useState(false);
  const [field, setField] = useState(fields[0] ?? "summary");
  const [value, setValue] = useState("");
  const [url, setUrl] = useState("");
  const [who, setWho] = useState("");
  const [verify, setVerify] = useState("");
  const [coi, setCoi] = useState("");
  const [why, setWhy] = useState("");

  const issueUrl = () => {
    const p = new URLSearchParams({
      template: "suggest-edit.yml",
      title: `edit: ${id} · ${field}`,
      labels: "suggested-edit",
      entity: `${id} (${kind}) — ${name}`,
      field,
      proposed: value,
      source: url,
      why,
      contributor: who,
      verification: verify,
      coi: coi || "None declared",
    });
    return `${REPO}/issues/new?${p.toString()}`;
  };
  const ready = value.trim() && url.trim() && who.trim();

  return (
    <div className="card p-4 text-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="kicker">Suggest an edit</div>
        <button type="button" onClick={() => setOpen((o) => !o)} className="text-xs underline">{open ? "Close" : "Open form"}</button>
      </div>
      {!open && <p className="text-muted mt-1">Wrong or missing? Propose a change with a source. Organisations can update their own records. <Link className="underline" href="/suggest/">How it works</Link>.</p>}
      {open && (
        <form className="mt-3 space-y-2" onSubmit={(e) => { e.preventDefault(); window.open(issueUrl(), "_blank", "noopener"); }}>
          <label className="block">
            <span className="kicker">Field</span>
            <select value={field} onChange={(e) => setField(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1">
              {fields.map((f) => <option key={f} value={f}>{f}</option>)}
              <option value="other">other / new field</option>
            </select>
          </label>
          <label className="block"><span className="kicker">Proposed value</span><textarea required value={value} onChange={(e) => setValue(e.target.value)} rows={3} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1" placeholder="Exact text or value you propose" /></label>
          <label className="block"><span className="kicker">Source URL</span><input required type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1" placeholder="https://… (label, publication, press release, registry)" /></label>
          <label className="block"><span className="kicker">Why</span><input value={why} onChange={(e) => setWhy(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1" placeholder="One line: what is wrong or missing" /></label>
          <label className="block"><span className="kicker">You (name, role, organisation)</span><input required value={who} onChange={(e) => setWho(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1" /></label>
          <label className="block"><span className="kicker">Verification</span><input value={verify} onChange={(e) => setVerify(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1" placeholder="Official email domain or profile URL (ORCID, LinkedIn, company page)" /></label>
          <label className="block"><span className="kicker">Conflicts of interest</span><input value={coi} onChange={(e) => setCoi(e.target.value)} className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1" placeholder="Employment, consulting, equity related to this record; or 'none'" /></label>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button type="submit" disabled={!ready} className="rounded-md bg-accent text-white px-3 py-1.5 text-sm font-medium disabled:opacity-40">Open prefilled GitHub issue</button>
            <a className="underline text-muted" href={source.editUrl} rel="noopener" title={`${source.file}:${source.line}`}>Edit the record directly (PR)</a>
          </div>
          <p className="text-xs text-muted">Opens GitHub in a new tab with the form contents prefilled; you need a free GitHub account to submit. Maintainers verify identity via the domain or profile before merging. Record lives at <code>{source.file}:{source.line}</code>.</p>
          {recordJson && <details className="text-xs"><summary className="cursor-pointer text-muted">Current record (JSON)</summary><pre className="mt-1 max-h-48 overflow-auto rounded bg-foreground/5 p-2">{recordJson}</pre></details>}
        </form>
      )}
    </div>
  );
}
