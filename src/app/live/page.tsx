import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { GroupLanding } from "@/components/GroupLanding";
export const metadata: Metadata = pageMeta({ title: "Living with cancer", description: "Practical help for patients, families and carers: what to ask, what to watch for, what it costs and who can help.", path: "/live/" });
export default function Page() { return <GroupLanding groupId="live" />; }
