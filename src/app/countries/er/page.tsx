import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { ER_DIVE } from "@/data/country-er";

export const metadata: Metadata = pageMeta({ title: ER_DIVE.title, description: ER_DIVE.description, path: "/countries/er/" });

export default function EritreaPage() {
  return <CountryDeepDive dive={ER_DIVE} />;
}
