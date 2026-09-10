"use client";

import { download, exportFilename, toCsv, toJsonExport, type CsvRow } from "@/lib/csv";
import { useT } from "@/lib/i18n/ui";

/**
 * CSV and JSON download of whatever a table is currently showing (the filtered rows, not the whole corpus).
 * Rows are plain records; the caller flattens links and chips to text first. The CSV opens with the CC BY 4.0
 * attribution as a `#` comment line and the JSON carries it as a field, so exports stay attributable.
 */
export function DownloadTable({ rows, name, columns, className = "" }: {
  rows: () => CsvRow[];
  /** Used in the filename and the JSON envelope, e.g. "products" or "landscape grid". */
  name: string;
  /** Column order for the CSV; defaults to the union of keys. */
  columns?: string[];
  className?: string;
}) {
  const csv = () => download(exportFilename(name, "csv"), toCsv(rows(), columns), "text/csv");
  const json = () => download(exportFilename(name, "json"), toJsonExport(rows(), { name }), "application/json");
  const btn = "rounded-md border border-border bg-card px-2 py-1 text-xs text-muted hover:bg-surface hover:text-foreground";
  const { t } = useT();
  return (
    <span className={`inline-flex items-center gap-1 no-print ${className}`} role="group" aria-label={`${t("download")}: ${name}`}>
      <span className="text-xs text-muted hidden sm:inline">{t("download")}</span>
      <button type="button" onClick={csv} className={btn} title={`Download the ${name} shown as CSV (filtered rows, CC BY 4.0)`}>CSV</button>
      <button type="button" onClick={json} className={btn} title={`Download the ${name} shown as JSON (filtered rows, CC BY 4.0)`}>JSON</button>
    </span>
  );
}
