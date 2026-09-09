import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GroupLanding } from "@/components/GroupLanding";
export const metadata: Metadata = pageMeta({ title: "Learn & contribute", description: "Reading paths, methodology, roadmap, gaps, and the open API.", path: "/learn/" });
export default function Page() { return <GroupLanding groupId="learn" />; }
