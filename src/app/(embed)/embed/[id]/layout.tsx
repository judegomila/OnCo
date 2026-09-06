import type { Metadata } from "next";
import "../../../globals.css";

export const metadata: Metadata = { robots: { index: false } };

/** Minimal root layout for embeddable cards: no header, footer, or navigation. */
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-transparent">{children}</body>
    </html>
  );
}
