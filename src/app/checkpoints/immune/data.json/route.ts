import { hubJson } from "@/lib/checkpoints";

/** Required under `output: "export"`: the file is written to disk at build time. */
export const dynamic = "force-static";

/** JSON companion of /checkpoints/immune/: every class and member row the page shows, with sources. */
export function GET() {
  return Response.json(hubJson("immune"), { headers: { "Cache-Control": "public, max-age=3600" } });
}
