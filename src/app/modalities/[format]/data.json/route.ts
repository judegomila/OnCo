import { modalityHub, modalityJson } from "@/lib/modalities";
import { FORMATS } from "@/lib/modular-formats";

/** Required under `output: "export"`: one file per format is written to disk at build time. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return FORMATS.map((f) => ({ format: f.id }));
}

/** JSON companion of /modalities/<format>/: every section the page shows, with the records each came from. */
export async function GET(_request: Request, { params }: { params: Promise<{ format: string }> }) {
  const { format } = await params;
  const h = modalityHub(format);
  if (!h) return new Response("No such format", { status: 404 });
  return Response.json(modalityJson(h), { headers: { "Cache-Control": "public, max-age=3600" } });
}
