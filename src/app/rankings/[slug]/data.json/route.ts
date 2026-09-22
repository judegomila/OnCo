import { ranking, rankingJson, rankings } from "@/lib/rankings";

/** Required under `output: "export"`: one JSON file per ranking is written to disk at build time. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return rankings().map((r) => ({ slug: r.slug }));
}

/** JSON companion of /rankings/<slug>/: the same rows, basis and coverage the page shows. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = ranking(slug);
  if (!r) return new Response("Not found", { status: 404 });
  return Response.json(rankingJson(r), { headers: { "Cache-Control": "public, max-age=3600" } });
}
