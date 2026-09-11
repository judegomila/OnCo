import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo";
import RoadmapPage, { metadata as roadmapMeta } from "../roadmap/page";

/** /hub/ is the old address of the roadmap; it renders the same page so existing links keep working, and points crawlers at /roadmap/. */
export const metadata: Metadata = { ...roadmapMeta, alternates: { canonical: absoluteUrl("/roadmap/") }, robots: { index: false, follow: true } };

export default RoadmapPage;
