import type { Metadata } from "next";
import { GroupLanding } from "@/components/GroupLanding";
export const metadata: Metadata = { title: "Intelligence", description: "Dates, congress readouts, failures, resistance, and the supply chain behind the drugs." };
export default function Page() { return <GroupLanding groupId="intel" />; }
