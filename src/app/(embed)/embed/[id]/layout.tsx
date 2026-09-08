import type { Metadata } from "next";

export const metadata: Metadata = { robots: { index: false } };

/**
 * Embeddable cards: no header, footer, or navigation. This layout is nested under the root layout
 * (Next allows only one <html>/<body>), so the site chrome is hidden here rather than omitted.
 */
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`body > header, body > footer { display: none !important; } body { background: transparent; }`}</style>
      {children}
    </>
  );
}
