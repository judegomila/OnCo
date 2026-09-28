import type { Metadata } from "next";
import Link from "next/link";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { Container } from "@/components/ui";
import { SearchBox } from "@/components/SearchBox";
import { GardenBackdrop } from "@/components/Garden";
import { MoleculeThumb } from "@/components/MoleculeThumb";
import { FrontSchematicLazy } from "@/components/FrontSchematicLazy";
import { FrontIcon } from "@/components/FrontIcon";
import { pageMeta } from "@/lib/seo";
import { STRUCTURES } from "@/lib/structures";
import { FIRST_60_DAYS_CHECKLISTS } from "@/data/first-60-days-checklists";
import { redFlagsForCancerId } from "@/data/red-flags";
import { nameAttrs } from "@/lib/translate";
import { KIND_META, KINDS } from "@/lib/kinds";

/**
 * A second front page, for review, at /v2/.
 *
 * The page at / links to 140 distinct sections and shows almost none of them. That is the fault, not the
 * achievement: it names the whole site and renders none of it. `/molecules/` draws 611 products from their real
 * atomic coordinates, `/fronts/` animates nineteen schematics of how each line of attack works, and on the front
 * page each of those is a word in a list. So this version of /v2/ tests the other thesis: show two of the best
 * things at the size they deserve and let a reader fall into them, rather than offering a directory of
 * destinations.
 *
 * Two are shown, and they are the two the owner named. The molecules, because nothing else on the open web draws
 * oncology chemistry like this and because the thing being drawn is the thing a reader has been handed a letter
 * about. The fronts, because nineteen wireframes are the only map of how cancer is attacked that is neither a
 * table nor a stock photograph. `/drugs/` is not a third section: its drawings are these same molecules at 28
 * pixels inside a table, so showing them large is `/drugs/` done properly, and every card links into it.
 *
 * What is kept from the previous /v2/: the search box framed as the words you were given, the block for someone
 * told this week, the cancers a reader is likeliest to need, and the inventory at the bottom where it belongs.
 * What is cut: the two blocks that were lists of links to other lists.
 *
 * The weight rule, which is the whole craft here. The live front page is 939 KB with three quarters of it
 * hydration payload, and `/molecules/` is 1.2 MB. Showing real chemistry must not cost that, so:
 *   - the molecule cards pass a drug id and nothing else, and each canvas fetches its own structure file only
 *     once it has been scrolled into view (src/components/Molecule3D.tsx);
 *   - the front schematics are built in the browser rather than serialised as meshes, which is 9.6 to 34.6 KB a
 *     front saved (src/components/FrontSchematicLazy.tsx);
 *   - eight molecules and two fronts are shown, not 611 and nineteen. The links carry the rest.
 * Measured with `npm run audit:weight` before and after.
 */

const V2_DESCRIPTION = "The medicines drawn from their real atomic coordinates, the nineteen fronts of cancer research drawn as the processes they are, and the page for the cancer you were told about.";

export const metadata: Metadata = pageMeta({ title: "Start here", description: V2_DESCRIPTION, path: "/v2/" });

/**
 * Eight products, chosen for what a reader would get from seeing them rather than for prettiness: two protein
 * backbones from the PDB beside six small molecules from PubChem, so the difference between an antibody and a
 * pill is visible and not just asserted; an ADC payload, because the payload is the part that does the killing;
 * the 1957 chemotherapy that is still a backbone today; and the pill that started the targeted era in 2001.
 * Every one is approved and every one is a name a reader may have been given this week.
 */
const SHOWN_MOLECULES = [
  "pembrolizumab",
  "trastuzumab",
  "trastuzumab-deruxtecan",
  "osimertinib",
  "olaparib",
  "imatinib",
  "paclitaxel",
  "fluorouracil",
];

/**
 * Two fronts drawn in full: the oldest way of treating cancer and the newest, and the two a person is likeliest
 * to have had explained badly. Two rather than three because the schematic draws its step captions inside the
 * canvas and truncates them: at three across on a 1440 px screen the sentence is cut off, which is the same fault
 * as the front page it replaces, only smaller. The other seventeen are named with their icons underneath.
 */
const SHOWN_FRONTS = ["chemotherapy", "immunotherapy"];

/** Cancers deep enough to lead with, in the order a reader is likeliest to need them. */
const LEAD = ["breast-cancer", "prostate", "lung-cancer", "colorectal", "skin-cancer", "pancreatic"];

const ROUTING = /^Which page is mine[^.?]*[.?]/i;

function Heading({ title, sub, href, label }: { title: string; sub?: string; href?: string; label?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1 mb-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {sub && <p className="text-sm text-muted mt-1 max-w-3xl leading-relaxed">{sub}</p>}
      </div>
      {href && label && (
        <Link href={href} className="text-sm font-medium text-foreground/80 hover:text-foreground underline decoration-foreground/25 underline-offset-[3px]">{label}</Link>
      )}
    </div>
  );
}

export default function V2() {
  const g = graph();
  const cancers = g.kind("cancer");
  const byId = new Map(cancers.map((c) => [c.id, c]));

  const drugs = new Map(g.kind("drug").map((d) => [d.id, d]));
  const molecules = SHOWN_MOLECULES
    .map((id) => ({ d: drugs.get(id), entry: STRUCTURES[id]?.[0] }))
    .filter((x): x is { d: NonNullable<ReturnType<typeof drugs.get>>; entry: NonNullable<typeof x.entry> } => !!x.d && !!x.entry);
  const drawable = g.kind("drug").filter((d) => STRUCTURES[d.id]?.length).length;

  const allFronts = g.kind("section").slice().sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const frontById = new Map(allFronts.map((f) => [f.id, f]));
  const fronts = SHOWN_FRONTS.map((id) => frontById.get(id)).filter((f): f is NonNullable<typeof f> => !!f);
  const otherFronts = allFronts.filter((f) => !SHOWN_FRONTS.includes(f.id));

  const lead = LEAD.map((id) => byId.get(id)).filter((c): c is NonNullable<typeof c> => !!c).map((c) => {
    const children = cancers.filter((x) => x.parent === c.id).length;
    const hook = c.notes.find((n) => ROUTING.test(n))?.match(ROUTING)?.[0];
    return { c, children, hook, checklist: !!FIRST_60_DAYS_CHECKLISTS[c.id], cards: redFlagsForCancerId(c.id).length };
  });

  const justTold = Object.keys(FIRST_60_DAYS_CHECKLISTS)
    .map((id) => byId.get(id))
    .filter((c): c is NonNullable<typeof c> => !!c && !c.parent)
    .sort((a, b) => a.name.localeCompare(b.name));

  const counts = KINDS.map((k) => ({ k, n: g.kind(k).length })).filter((x) => x.n > 0).sort((a, b) => b.n - a.n);
  const total = counts.reduce((n, x) => n + x.n, 0);

  return (
    <>
      <section className="hero relative border-b border-border">
        <GardenBackdrop variant="hero" />
        <Container className="relative pt-14 pb-10 sm:pt-18 sm:pb-12">
          <div className="max-w-3xl">
            <h1 className="display">Start from what you were told.</h1>
            <p className="mt-6 text-[17px] sm:text-xl text-foreground/85 leading-relaxed max-w-2xl">
              Type the words you were given: the cancer, the drug, the gene, or the phrase from the report you did not
              understand. Every page is in plain English first, with the technical layer one click below and a source
              under every number.
            </p>
            <div className="mt-8 max-w-2xl"><SearchBox large /></div>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <Link href="/body/" className="btn">Find it by where it is</Link>
              <Link href="/tools/" className="btn">Decisions you are being asked to make</Link>
              <Link href="/for-me/" className="btn">Follow one cancer</Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 1. The chemistry, at the size it deserves. */}
      <Container className="pt-14">
        <Heading
          title="The medicine they named, drawn from its real coordinates"
          sub={`Eight of the ${drawable.toLocaleString("en-GB")} products OnCo can draw. Nothing here is an illustration: every atom sits where a public measurement put it, small molecules from PubChem's 3D conformers and antibodies from the Protein Data Bank. Each one turns on its own and opens the product page: what it is, who it is for, what it costs you to take it.`}
          href="/molecules/"
          label="The whole gallery"
        />
        <ul className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {molecules.map(({ d, entry }) => (
            <li key={d.id}>
              <Link href={routeFor(d)} className="card block overflow-hidden hover:shadow-md transition group h-full">
                <div className="bg-gradient-to-b from-foreground/[0.03] to-transparent">
                  <MoleculeThumb drugId={d.id} className="h-40 sm:h-48" />
                </div>
                <div className="p-3 border-t border-border">
                  <div {...nameAttrs(d.kind, "font-semibold leading-snug group-hover:underline decoration-foreground/25 underline-offset-[3px]")}>{d.name}</div>
                  {d.brand && <div {...nameAttrs(d.kind, "text-xs text-muted mt-0.5")}>{d.brand}</div>}
                  <div className="text-xs text-muted mt-1.5 leading-snug">{d.modality}</div>
                  <div className="text-[11px] text-muted mt-1 leading-snug">{entry.source === "pdb" ? "Protein Data Bank" : "PubChem"} · {entry.label}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* 2. The person told this week. */}
      <Container className="pt-14">
        <Heading
          title="Told this week"
          sub="Three things worth reading before the next appointment. None of them asks you to understand the biology first."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <section className="card relative p-5">
            <GardenBackdrop variant="card" seed={11} />
            <h3 className="relative text-lg font-semibold tracking-tight">The first sixty days</h3>
            <p className="text-sm text-muted mt-1 leading-relaxed">What happens, in what order, and what to sort out while you wait. Written for {justTold.length} cancers so far.</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {justTold.map((c) => (
                <li key={c.id}><Link href={`/first-60-days/${c.id}/`} className="chip border bg-card border-border hover:bg-foreground/5 text-xs">{c.name}</Link></li>
              ))}
            </ul>
          </section>
          <section className="card relative p-5">
            <GardenBackdrop variant="card" seed={23} />
            <h3 className="relative text-lg font-semibold tracking-tight">What is worth a phone call</h3>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              The symptoms that mean ring tonight rather than wait, on the page for the cancer you have. Spinal cord
              compression, infection during chemotherapy, and the ones that are easy to miss because they do not feel like an emergency.
            </p>
            <p className="mt-3 text-sm"><Link href="/cancers/" className="underline decoration-foreground/25 underline-offset-[3px]">Open your cancer&apos;s page</Link>, then the section called When to call.</p>
          </section>
          <section className="card relative p-5">
            <GardenBackdrop variant="card" seed={37} />
            <h3 className="relative text-lg font-semibold tracking-tight">What to ask</h3>
            <p className="text-sm text-muted mt-1 leading-relaxed">
              Questions grouped by who you are seeing, each with the reason it is worth asking and the guideline or
              trial behind it. Take them in on a phone.
            </p>
            <p className="mt-3 text-sm"><Link href="/prep/" className="underline decoration-foreground/25 underline-offset-[3px]">Build an appointment pack</Link></p>
          </section>
        </div>
      </Container>

      {/* 3. Which page is mine. */}
      <Container className="pt-14">
        <Heading
          title="Which page is mine?"
          sub="The commonest cancers, each with the sentence that tells you which of its pages you are on. Everything below a family page is one click down."
          href="/cancers/"
          label="All cancers"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lead.map(({ c, children, hook, checklist, cards }) => (
            <article key={c.id} className="card relative p-5 flex flex-col">
              <GardenBackdrop variant="card" seed={c.id.length * 5} />
              <h3 className="relative text-lg font-semibold tracking-tight">
                <Link href={routeFor(c)} className="hover:underline decoration-foreground/25 underline-offset-[3px]">{c.name}</Link>
              </h3>
              <p className="text-sm text-muted mt-1 leading-relaxed grow">{hook ?? c.tldr}</p>
              <p className="mt-3 flex flex-wrap gap-1.5 text-xs">
                {children > 0 && <Link href={routeFor(c)} className="chip border bg-card border-border hover:bg-foreground/5">{children} types</Link>}
                {checklist && <Link href={`/first-60-days/${c.id}/`} className="chip border bg-card border-border hover:bg-foreground/5">First 60 days</Link>}
                {cards > 0 && <Link href={`${routeFor(c)}living-with-it/`} className="chip border bg-card border-border hover:bg-foreground/5">{cards} when-to-call sets</Link>}
              </p>
            </article>
          ))}
        </div>
      </Container>

      {/* 4. How the treatment works, drawn as the process it is. */}
      <Container className="pt-14">
        <Heading
          title="What the treatment actually does"
          sub={`Two of the ${allFronts.length} fronts, drawn as the processes they are: the oldest way of treating cancer and the newest. The drawing turns, plays the steps in order and names each one as it happens. Two rather than a row of three, because the step captions are drawn inside the canvas and a third column cuts them off.`}
          href="/fronts/"
          label={`All ${allFronts.length} fronts`}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {fronts.map((f) => (
            <article key={f.id} className="card overflow-hidden flex flex-col">
              <div className="px-4 pt-4 pb-3">
                <h3 className="text-lg font-semibold tracking-tight">
                  <Link href={routeFor(f)} className="hover:underline decoration-foreground/25 underline-offset-[3px]">{f.name}</Link>
                </h3>
                <p className="text-sm text-muted mt-1 leading-relaxed">{f.tldr}</p>
              </div>
              <FrontSchematicLazy sectionId={f.id} caption="The steps in order, animated. Schematic, not to scale." height="h-72 sm:h-80" />
            </article>
          ))}
        </div>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {otherFronts.map((f) => (
            <li key={f.id}>
              <Link href={routeFor(f)} className="chip border bg-card border-border hover:bg-foreground/5 text-sm inline-flex items-center gap-1.5">
                <FrontIcon id={f.id} className="h-4 w-4 text-accent" />
                {f.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      {/* 5. The inventory, last. */}
      <Container className="pt-14 pb-16">
        <Heading
          title="What is in here"
          sub={`${total.toLocaleString("en-GB")} records, every fact dated and linked to a primary source. This is the scale of the thing, not the way in.`}
          href="/?view=graph"
          label="As a graph"
        />
        <ul className="flex flex-wrap gap-1.5">
          {counts.map(({ k, n }) => (
            <li key={k}>
              <Link href={`/${KIND_META[k].route}/`} className="chip border bg-card border-border hover:bg-foreground/5 text-sm">
                {n.toLocaleString("en-GB")} {n === 1 ? KIND_META[k].label.toLowerCase() : KIND_META[k].plural}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
