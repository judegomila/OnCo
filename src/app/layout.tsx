import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SearchBox } from "@/components/SearchBox";
import { KIND_META, KINDS } from "@/lib/schema";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "OnCo — the open map of oncology", template: "%s · OnCo" },
  description: "Every technology, target, drug, company, institution, pathway, trial, and idea in the war on cancer. One page per object, linked, with plain-English TL;DRs.",
  metadataBase: new URL("https://onco-umber.vercel.app"),
  openGraph: { title: "OnCo — the open map of oncology", description: "The current state of the art, the history, and what is coming, for every cancer.", type: "website" },
};

const NAV: Array<{ href: string; label: string }> = [
  { href: "/cancers/", label: "Cancers" },
  { href: "/sections/", label: "Sections" },
  { href: "/technologies/", label: "Technologies" },
  { href: "/drugs/", label: "Products" },
  { href: "/roadmaps/", label: "Roadmaps" },
  { href: "/institutions/", label: "Institutions" },
  { href: "/for-me/", label: "For me" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="inline-block h-6 w-6 rounded-md bg-accent" aria-hidden />
              <span>OnCo</span>
              <span className="hidden sm:inline text-muted font-normal text-sm">the open map of oncology</span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1 text-sm ml-4">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="px-2.5 py-1.5 rounded-md hover:bg-foreground/5 text-foreground/80 hover:text-foreground">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto w-full max-w-xs sm:max-w-sm">
              <SearchBox />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-border mt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
            <div className="md:col-span-2">
              <div className="font-semibold mb-2">OnCo</div>
              <p className="text-muted max-w-md">
                A public, cited, editable map of oncology: technologies, targets, products, companies, institutions, pathways, trials, pairings, roadmaps, and ideas. One page per object, with a plain-English TL;DR on every page.
              </p>
              <p className="text-muted mt-3">
                Not medical advice. Facts carry an “as of” date and change. Check with a clinician and the primary sources linked on each page.
              </p>
            </div>
            <div>
              <div className="kicker mb-2">Browse</div>
              <ul className="space-y-1">
                {KINDS.map((k) => (
                  <li key={k}>
                    <Link className="hover:underline" href={`/${KIND_META[k].route}/`}>{KIND_META[k].plural[0].toUpperCase() + KIND_META[k].plural.slice(1)}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="kicker mb-2">Project</div>
              <ul className="space-y-1">
                <li><Link className="hover:underline" href="/about/">About & methodology</Link></li>
                <li><Link className="hover:underline" href="/hub/">50 ideas for the hub</Link></li>
                <li><Link className="hover:underline" href="/universities/">University ranking</Link></li>
                <li><Link className="hover:underline" href="/api/">Open API</Link></li>
                <li><a className="hover:underline" href="https://github.com/judegomila/OnCo" rel="noopener">GitHub</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
