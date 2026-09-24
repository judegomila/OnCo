import { familiesJson } from "@/lib/checkpoints";

/** Required under `output: "export"`: the file is written to disk at build time. */
export const dynamic = "force-static";

/** JSON companion of /checkpoints/: both families with their classes and member ids, and the URL of each hub's own data.json. */
export function GET() {
  return Response.json(familiesJson(), { headers: { "Cache-Control": "public, max-age=3600" } });
}
