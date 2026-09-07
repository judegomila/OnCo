import type { Metadata } from "next";
import { GroupLanding } from "@/components/GroupLanding";
export const metadata: Metadata = { title: "Learn & contribute", description: "Reading paths, methodology, roadmap, gaps, and the open API." };
export default function Page() { return <GroupLanding groupId="learn" />; }
