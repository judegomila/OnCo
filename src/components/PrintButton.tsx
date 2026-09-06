"use client";

/** Opens the browser print dialog; print styles in globals.css strip site chrome. */
export function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={`underline ${className}`} aria-label="Print or save this page as PDF">
      Print / save PDF
    </button>
  );
}
