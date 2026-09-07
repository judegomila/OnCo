import type { Metadata } from "next";
import { GroupLanding } from "@/components/GroupLanding";
export const metadata: Metadata = { title: "Find", description: "Start from your question: a cancer, a biomarker, two products to compare, or the whole graph." };
export default function Page() { return <GroupLanding groupId="find" />; }
