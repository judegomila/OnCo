import { modalitiesIndexJson } from "@/lib/modalities";

/** Required under `output: "export"`: the file is written to disk at build time. */
export const dynamic = "force-static";

/** JSON companion of /modalities/: every format with its counts and the route and file of its hub. */
export function GET() {
  return Response.json(modalitiesIndexJson(), { headers: { "Cache-Control": "public, max-age=3600" } });
}
