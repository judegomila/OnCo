import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { allTags, NO_DESCRIPTION, relatedTags, tagFile } from "@/lib/tags";
import { KIND_META, type Kind } from "@/lib/kinds";
import { KIND_PAGE } from "@/lib/static-tables";
import { pageTagRows, TAG_COLUMNS, TAG_FACETS, TAG_SORT, tagBrowser, tagTableId } from "@/lib/tables/tagged";
import { tableFile } from "@/lib/static-tables";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { TaggedBrowser, TagGlyph, type TagKindCount } from "@/components/TaggedBrowser";
import { Tip } from "@/components/Tip";

export function generateStaticParams() {
  return allTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const b = tagBrowser(tag);
  if (!b) return {};
  const { entry } = b;
  return pageMeta({ title: `Tagged ${entry.tag}`, description: `${entry.count.toLocaleString("en-GB")} OnCo records tagged ${entry.tag}: ${kindSummary(entry.kinds)}. ${entry.description === NO_DESCRIPTION ? "" : entry.description + " "}Filter by kind, cancer, phase and year.`.trim(), path: `/tagged/${entry.slug}/` });
}

function kindSummary(kinds: Partial<Record<Kind, number>>): string {
  return (Object.entries(kinds) as Array<[Kind, number]>).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n.toLocaleString("en-GB")} ${n === 1 ? KIND_META[k].label.toLowerCase() : KIND_META[k].plural}`).join(", ");
}

/**
 * One tag as a power search: every record carrying it, whatever its kind, in one paged EntityBrowser with header
 * filters. The kind pills above the table filter it in place and are deep links; related tags are the ones that
 * share records with this one. A long tag carries its first KIND_PAGE rows and fetches the rest from
 * /api/v1/tables/tag-<slug>.json; the JSON companion at /api/v1/tagged/<slug>.json holds the whole set for agents.
 */
export default async function TaggedPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const b = tagBrowser(tag);
  if (!b) notFound();
  const { entry, rows, counts } = b;
  const paged = pageTagRows(entry.slug, rows);
  const kinds: TagKindCount[] = (Object.entries(entry.kinds) as Array<[Kind, number]>).sort((a, b) => b[1] - a[1]).map(([k, n]) => ({ kind: k, label: KIND_META[k].label, count: n }));
  const related = relatedTags(entry.slug);
  const variants = entry.variants.slice(1);
  const lede = `${entry.description === NO_DESCRIPTION ? "No description yet: the sentence for this tag has not been written." : entry.description} ${entry.count.toLocaleString("en-GB")} ${entry.count === 1 ? "record carries" : "records carry"} it: ${kindSummary(entry.kinds)}.${variants.length ? ` Also written ${variants.map((v) => `“${v}”`).join(", ")}; the spellings share this page.` : ""}`;

  return (
    <>
      <PageHeader
        kicker={<GroupKicker id="find"><Link href="/tagged/" className="kicker hover:underline">Tags</Link><span className="chip border bg-accent-soft text-accent border-accent/30 inline-flex items-center gap-1" data-tag-pill><TagGlyph />{entry.tag}</span></GroupKicker>}
        title={entry.tag} seed={entry.slug} lede={lede}
        right={<Link href="/tagged/" className="chip border bg-card border-border hover:bg-foreground/5 text-sm" title="Every tag with its count">All tags →</Link>} />
      <Container className="pb-16">
        {related.length > 0 && (
          <div className="mb-6">
            <div className="kicker mb-1.5">Related tags</div>
            <ul className="flex flex-wrap gap-1.5" data-related-tags>
              {related.map(({ entry: r, shared }) => (
                <li key={r.slug}>
                  <Tip title={r.tag} text={`${r.description === NO_DESCRIPTION ? "No description yet." : r.description} Shares ${shared.toLocaleString("en-GB")} ${shared === 1 ? "record" : "records"} with ${entry.tag}; ${r.count.toLocaleString("en-GB")} in all.`}>
                    <Link href={`/tagged/${r.slug}/`} className="chip border bg-card border-border hover:bg-accent-soft hover:text-accent hover:border-accent/40 inline-flex items-center gap-1.5"><TagGlyph className="h-3 w-3 text-muted" />{r.tag}<span className="tabular-nums text-muted">{shared.toLocaleString("en-GB")}</span></Link>
                  </Tip>
                </li>
              ))}
            </ul>
          </div>
        )}
        <TaggedBrowser rows={paged.rows} more={paged.more} counts={paged.more ? counts : undefined} kinds={kinds} facets={TAG_FACETS} columns={TAG_COLUMNS} defaultSort={TAG_SORT} noun="records" />
        <p className="text-xs text-muted mt-3" data-tag-export>
          {paged.more ? `The table above loads ${Math.min(KIND_PAGE, entry.count)} of ${entry.count.toLocaleString("en-GB")} records first and fetches the rest as you scroll, search or filter. ` : ""}
          <a href={tagFile(entry.slug)} className="underline hover:text-foreground">This tag as JSON</a>
          {paged.more && <>{" · "}<a href={tableFile(tagTableId(entry.slug))} className="underline hover:text-foreground">table rows</a></>}
          {" · "}
          <Link href="/api/" className="underline hover:text-foreground">API</Link>
        </p>
      </Container>
    </>
  );
}
