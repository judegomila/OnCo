import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { LB_DIVE } from "@/data/country-lb";

export const metadata: Metadata = pageMeta({ title: LB_DIVE.title, description: LB_DIVE.description, path: "/countries/lb/" });

export default function LebanonPage() {
  return <CountryDeepDive dive={LB_DIVE} />;
}
